import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Função para validar assinatura do webhook
function validarAssinatura(request: NextRequest, dataId: string): boolean {
  const signature = request.headers.get('x-signature');
  const requestId = request.headers.get('x-request-id');
  
  // Em desenvolvimento, pular validação
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  if (!signature) {
    console.warn('Webhook sem assinatura');
    return false;
  }

  // Usar a assinatura secreta específica do webhook
  const webhookSecret = process.env.MERCADO_PAGO_WEBHOOK_SECRET || process.env.MERCADO_PAGO_CLIENT_SECRET;
  if (!webhookSecret) {
    console.warn('MERCADO_PAGO_WEBHOOK_SECRET não configurado');
    return false;
  }

  // Formato da assinatura do Mercado Pago: ts=timestamp,v1=hash
  const parts = signature.split(',');
  let timestamp = '';
  let receivedHash = '';

  for (const part of parts) {
    if (part.startsWith('ts=')) {
      timestamp = part.substring(3);
    } else if (part.startsWith('v1=')) {
      receivedHash = part.substring(3);
    }
  }

  if (!timestamp || !receivedHash) {
    console.warn('Assinatura do webhook em formato inválido');
    return false;
  }

  // Formato correto do Mercado Pago: id;request-id;ts
  // Se não tiver request-id, usar apenas: id;ts
  const manifest = requestId 
    ? `id:${dataId};request-id:${requestId};ts:${timestamp};`
    : `id:${dataId};ts:${timestamp};`;
  
  console.log('🔍 Manifest para validação:', manifest);
  
  const hash = crypto
    .createHmac('sha256', webhookSecret)
    .update(manifest)
    .digest('hex');

  // Comparar assinaturas
  const isValid = hash === receivedHash;
  
  if (!isValid) {
    console.warn('❌ Assinatura do webhook inválida');
    console.warn('  Manifest:', manifest);
    console.warn('  Hash esperado:', hash);
    console.warn('  Hash recebido:', receivedHash);
  } else {
    console.log('✅ Assinatura do webhook validada com sucesso');
  }

  return isValid;
}

// Função para ler pedidos
function lerPedidos() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'pedidos.json');
    
    if (!fs.existsSync(filePath)) {
      return [];
    }
    
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler pedidos:', error);
    return [];
  }
}

// Função para salvar pedidos
function salvarPedidos(pedidos: any[]) {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const filePath = path.join(dataDir, 'pedidos.json');
    fs.writeFileSync(filePath, JSON.stringify(pedidos, null, 2));
  } catch (error) {
    console.error('Erro ao salvar pedidos:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const bodyText = await request.text();
    const body = JSON.parse(bodyText);
    
    console.log('\n========================================');
    console.log('🔔 WEBHOOK MERCADO PAGO RECEBIDO');
    console.log('========================================');
    console.log('📍 URL:', request.url);
    console.log('⏰ Timestamp:', new Date().toISOString());
    console.log('� Headers:');
    console.log('  - x-signature:', request.headers.get('x-signature'));
    console.log('  - x-request-id:', request.headers.get('x-request-id'));
    console.log('  - x-timestamp:', request.headers.get('x-timestamp'));
    console.log('�📦 Body completo:', JSON.stringify(body, null, 2));
    console.log('🔐 CLIENT_SECRET configurado:', process.env.MERCADO_PAGO_CLIENT_SECRET ? 'Sim' : 'Não');
    console.log('🌍 NODE_ENV:', process.env.NODE_ENV);
    console.log('========================================\n');

    // Mercado Pago envia notificações em dois formatos:
    // Formato 1: { type: 'payment', data: { id: '...' } }
    // Formato 2: { topic: 'payment', resource: '...' }
    const { type, data, topic, resource } = body;

    // Determinar o tipo e ID do pagamento
    const notificationType = type || topic;
    const paymentId = data?.id || resource;

    // Processar apenas notificações de pagamento
    if (notificationType === 'payment') {
      if (!paymentId) {
        return NextResponse.json({ success: true });
      }

      // Validar assinatura do webhook (em produção)
      if (!validarAssinatura(request, paymentId)) {
        console.error('Webhook com assinatura inválida - rejeitado');
        return NextResponse.json(
          { error: 'Assinatura inválida' },
          { status: 401 }
        );
      }

      // Buscar detalhes do pagamento no Mercado Pago
      try {
        const mpResponse = await fetch(
          `https://api.mercadopago.com/v1/payments/${paymentId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
            },
          }
        );

        if (!mpResponse.ok) {
          console.error('Erro ao buscar pagamento:', mpResponse.statusText);
          return NextResponse.json({ success: true });
        }

        const payment = await mpResponse.json();

        console.log('Detalhes do pagamento:', payment);

        // Extrair informações do pagamento
        const status = payment.status; // approved, pending, rejected, cancelled
        const pedidoId = payment.metadata?.pedido_id || payment.external_reference;
        const merchantOrderId = payment.order?.id;

        if (!pedidoId) {
          console.warn('Pagamento sem pedido_id no metadata');
          return NextResponse.json({ success: true });
        }

        // Atualizar status do pedido baseado no status do pagamento
        let pedidoStatus = 'pendente';
        
        if (status === 'approved') {
          pedidoStatus = 'confirmado';
        } else if (status === 'pending') {
          pedidoStatus = 'pendente';
        } else if (status === 'rejected' || status === 'cancelled') {
          pedidoStatus = 'cancelado';
        }

        // Buscar e atualizar o pedido
        const pedidos = lerPedidos();
        const pedidoIndex = pedidos.findIndex(
          (p: any) => p.id === pedidoId
        );

        if (pedidoIndex !== -1) {
          pedidos[pedidoIndex].status = pedidoStatus;
          pedidos[pedidoIndex].dataAtualizacao = new Date().toISOString();
          pedidos[pedidoIndex].mercadoPagoId = paymentId;
          pedidos[pedidoIndex].mercadoPagoStatus = status;

          salvarPedidos(pedidos);

          console.log(
            `Pedido ${pedidoId} atualizado para status: ${pedidoStatus}`
          );

          // Se pagamento aprovado, enviar email de confirmação e registrar conversão
          if (status === 'approved') {
            const pedido = pedidos[pedidoIndex];
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
            
            console.log('\n📧 INICIANDO ENVIO DE EMAIL DE CONFIRMAÇÃO');
            console.log('Email destino:', pedido.cliente.email);
            console.log('Pedido:', pedido.id);
            console.log('🌐 Base URL configurada:', baseUrl);
            
            try {
              console.log('📍 URL completa do email:', `${baseUrl}/api/email/confirmacao-pagamento`);
              
              const emailResponse = await fetch(`${baseUrl}/api/email/confirmacao-pagamento`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: pedido.cliente.email,
                  nome: pedido.cliente.nome,
                  codigoPedido: pedido.id,
                  tipo: pedido.tipo,
                  preco: pedido.preco,
                }),
              });

              if (emailResponse.ok) {
                console.log(`✅ Email de confirmação de pagamento enviado para ${pedido.cliente.email}`);
              } else {
                const errorData = await emailResponse.text();
                console.error('❌ Erro ao enviar email - Status:', emailResponse.status);
                console.error('❌ Resposta:', errorData);
              }
            } catch (emailError) {
              console.error('❌ Exceção ao enviar email de confirmação:', emailError);
            }

            // Registrar conversão no Google Ads
            try {
              console.log('\n📊 REGISTRANDO CONVERSÃO NO GOOGLE ADS');
              console.log('Pedido:', pedido.id);
              console.log('Valor:', pedido.preco);
              
              const conversionResponse = await fetch(`${baseUrl}/api/google-ads/conversion`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  orderId: pedido.id,
                  value: pedido.preco,
                  currency: 'BRL',
                  email: pedido.cliente.email,
                }),
              });

              if (conversionResponse.ok) {
                console.log('✅ Conversão registrada no Google Ads');
              } else {
                console.warn('⚠️ Erro ao registrar conversão no Google Ads:', await conversionResponse.text());
              }
            } catch (conversionError) {
              console.warn('⚠️ Exceção ao registrar conversão no Google Ads:', conversionError);
            }
          }
        } else {
          console.warn(`Pedido ${pedidoId} não encontrado`);
        }
      } catch (mpError) {
        console.error('Erro ao buscar detalhes do pagamento:', mpError);
      }
    }

    // Sempre retornar sucesso para o Mercado Pago
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    // Retornar sucesso mesmo em caso de erro para não reenviar
    return NextResponse.json({ success: true });
  }
}
