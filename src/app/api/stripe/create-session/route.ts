import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn('⚠️ STRIPE_SECRET_KEY não configurada. A rota /api/stripe/create-session não funcionará.');
}

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe não configurado' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { tipo, preco, cliente, codigoPedido } = body;

    if (!tipo || !preco || !cliente?.email) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      metadata: {
        tipo,
        codigoPedido: codigoPedido || 'N/A',
      },
      customer_email: cliente.email,
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: tipo === 'a1-pj' ? 'Certificado Digital A1 PJ' : 'Certificado Digital A1 PF',
              description: 'Certificado digital emitido pela Altus Certificados',
            },
            unit_amount: Math.round(Number(preco) * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/erro`,
      allow_promotion_codes: false,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Erro Stripe create-session:', error);
    return NextResponse.json({ error: 'Erro ao criar sessão de pagamento' }, { status: 500 });
  }
}
