import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Função para validar assinatura do webhook
function validarAssinatura(request: NextRequest, body: string): boolean {
  const signature = request.headers.get('x-signature');
  const timestamp = request.headers.get('x-timestamp');
  
  // Em desenvolvimento, pular validação
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  if (!signature || !timestamp) {
    console.warn('Webhook sem assinatura ou timestamp');
    return false;
  }

  const clientSecret = process.env.MERCADO_PAGO_CLIENT_SECRET;
  if (!clientSecret) {
    console.warn('MERCADO_PAGO_CLIENT_SECRET não configurado');
    return false;
  }

  // Criar hash da assinatura
  const data = `${timestamp}${body}`;
  const hash = crypto
    .createHmac('sha256', clientSecret)
    .update(data)
    .digest('hex');

  // Comparar assinaturas
  const isValid = hash === signature;
  
  if (!isValid) {
    console.warn('Assinatura do webhook inválida');
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
    
    console.log('Webhook Mercado Pago recebido:', body);

    // Validar assinatura do webhook (em produção)
    if (!validarAssinatura(request, bodyText)) {
      console.error('Webhook com assinatura inválida - rejeitado');
      return NextResponse.json(
        { error: 'Assinatura inválida' },
        { status: 401 }
      );
    }

    // Mercado Pago envia notificações com tipo e ID
    const { type, data } = body;

    // Processar apenas notificações de pagamento
    if (type === 'payment') {
      const paymentId = data?.id;
      
      if (!paymentId) {
        return NextResponse.json({ success: true });
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
        const externalReference = payment.external_reference; // Código do pedido
        const merchantOrderId = payment.order?.id;

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
          (p: any) => p.id === externalReference
        );

        if (pedidoIndex !== -1) {
          pedidos[pedidoIndex].status = pedidoStatus;
          pedidos[pedidoIndex].dataAtualizacao = new Date().toISOString();
          pedidos[pedidoIndex].mercadoPagoId = paymentId;
          pedidos[pedidoIndex].mercadoPagoStatus = status;

          salvarPedidos(pedidos);

          console.log(
            `Pedido ${externalReference} atualizado para status: ${pedidoStatus}`
          );

          // Se pagamento aprovado, enviar email de confirmação
          if (status === 'approved') {
            const pedido = pedidos[pedidoIndex];
            
            try {
              await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email/enviar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: pedido.cliente.email,
                  nome: pedido.cliente.nome,
                  codigoPedido: pedido.id,
                  tipo: pedido.tipo,
                  preco: pedido.preco,
                  status: 'confirmado',
                }),
              });

              console.log(`Email de confirmação enviado para ${pedido.cliente.email}`);
            } catch (emailError) {
              console.error('Erro ao enviar email de confirmação:', emailError);
            }
          }
        } else {
          console.warn(`Pedido ${externalReference} não encontrado`);
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
