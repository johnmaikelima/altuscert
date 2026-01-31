import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tipo, preco, cliente } = body;

    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Token Mercado Pago não configurado' },
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const preference = {
      items: [
        {
          title: tipo === 'a1-pj' ? 'Certificado A1 PJ' : 'Certificado A1 PF',
          description: tipo === 'a1-pj' ? 'Para Pessoas Jurídicas' : 'Para Pessoas Físicas',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: preco,
        },
      ],
      payer: {
        name: cliente.nome,
        email: cliente.email,
        phone: {
          area_code: cliente.telefone.substring(1, 3),
          number: cliente.telefone.replace(/\D/g, '').substring(2),
        },
      },
      back_urls: {
        success: `${baseUrl}/sucesso`,
        failure: `${baseUrl}/erro`,
        pending: `${baseUrl}/pendente`,
      },
      external_reference: `${tipo}-${Date.now()}`,
      notification_url: `${baseUrl}/api/mercado-pago/webhook`,
    };

    // Fazer requisição direta à API do Mercado Pago
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(preference),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro Mercado Pago:', errorData);
      return NextResponse.json(
        { error: 'Erro ao processar pagamento' },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      init_point: data.init_point,
      id: data.id,
    });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
}
