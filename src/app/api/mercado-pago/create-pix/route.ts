import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

export async function POST(request: NextRequest) {
  try {
    const { pedidoId, email, amount, nome, cpf_cnpj } = await request.json();

    if (!pedidoId || !email || !amount) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    console.log('🔑 Access Token presente:', accessToken ? `Sim (${accessToken.substring(0, 15)}...)` : 'NÃO');
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Mercado Pago não configurado' },
        { status: 500 }
      );
    }

    const client = new MercadoPagoConfig({ 
      accessToken,
      options: { timeout: 5000 }
    });
    const payment = new Payment(client);

    // Separar nome em first_name e last_name
    const nomeCompleto = nome || 'Cliente';
    const partesNome = nomeCompleto.trim().split(' ');
    const firstName = partesNome[0] || 'Cliente';
    const lastName = partesNome.slice(1).join(' ') || 'Certificado';

    // Limpar e validar CPF/CNPJ
    let identification = undefined;
    if (cpf_cnpj) {
      const cleanCpfCnpj = cpf_cnpj.replace(/\D/g, '');
      
      // Validar se tem pelo menos 11 dígitos (CPF) ou 14 (CNPJ)
      if (cleanCpfCnpj.length >= 11) {
        identification = {
          type: cleanCpfCnpj.length === 11 ? 'CPF' : 'CNPJ',
          number: cleanCpfCnpj,
        };
      } else {
        console.warn('⚠️ CPF/CNPJ inválido (menos de 11 dígitos):', cpf_cnpj);
      }
    }

    const paymentData = {
      transaction_amount: amount,
      description: `Pedido #${pedidoId}`,
      payment_method_id: 'pix',
      payer: {
        email,
        first_name: firstName,
        last_name: lastName,
        identification,
      },
      additional_info: {
        items: [
          {
            id: pedidoId,
            title: `Certificado Digital - Pedido #${pedidoId}`,
            description: 'Certificado Digital A1',
            category_id: 'services',
            quantity: 1,
            unit_price: amount,
          },
        ],
      },
      metadata: {
        pedido_id: pedidoId,
      },
    };

    console.log('📤 Criando PIX com dados:', JSON.stringify({
      ...paymentData,
      payer: {
        ...paymentData.payer,
        email: email.substring(0, 3) + '***',
      }
    }, null, 2));

    const result = await payment.create({ body: paymentData });

    const qrCode = result.point_of_interaction?.transaction_data?.qr_code;
    const qrCodeBase64 = result.point_of_interaction?.transaction_data?.qr_code_base64;

    if (!qrCode || !qrCodeBase64) {
      return NextResponse.json(
        { error: 'Erro ao gerar QR Code PIX' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      qr_code: qrCode,
      qr_code_base64: qrCodeBase64,
      payment_id: result.id,
    });

  } catch (error: any) {
    console.error('❌ Erro ao criar PIX:', {
      message: error.message,
      cause: error.cause,
      status: error.status,
      error: error.error,
    });
    
    return NextResponse.json(
      { 
        error: error.message || 'Erro ao processar PIX',
        details: error.cause || error.error,
      },
      { status: error.status || 500 }
    );
  }
}
