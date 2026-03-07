import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

export async function POST(request: NextRequest) {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Token Mercado Pago não configurado' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const {
      transaction_amount,
      token,
      description,
      installments,
      payment_method_id,
      payer,
      issuer_id,
      metadata,
      pedidoId,
      tipo,
    } = body;

    if (!transaction_amount || !payment_method_id || !payer?.email) {
      return NextResponse.json(
        { error: 'Dados de pagamento incompletos.' },
        { status: 400 }
      );
    }

    const client = new MercadoPagoConfig({ accessToken });
    const payment = new Payment(client);

    const paymentData: any = {
      transaction_amount: Number(transaction_amount),
      description: description || 'Certificado Digital',
      installments: Number(installments) || 1,
      payment_method_id,
      payer: {
        email: payer.email,
        identification: payer.identification,
        first_name: payer.first_name,
        last_name: payer.last_name,
      },
      additional_info: {
        items: [
          {
            id: pedidoId || 'cert-digital',
            title: `Certificado Digital - Pedido #${pedidoId || 'N/A'}`,
            description: 'Certificado Digital A1',
            category_id: 'services',
            quantity: 1,
            unit_price: Number(transaction_amount),
          },
        ],
      },
      metadata: {
        ...metadata,
        pedidoId,
        tipo,
      },
      statement_descriptor: 'ALTUS CERT',
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://altuscertificados.com.br'}/api/mercado-pago/webhook`,
    };

    if (token) {
      paymentData.token = token;
    }

    if (issuer_id) {
      paymentData.issuer_id = issuer_id;
    }

    const response = await payment.create({ body: paymentData });

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao processar pagamento:', error);
    return NextResponse.json(
      {
        error: 'Erro ao processar pagamento',
        details: error?.message || 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}
