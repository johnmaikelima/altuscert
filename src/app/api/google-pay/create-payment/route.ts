import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tipo, preco, cliente, codigoPedido } = body;

    // Google Pay Payment Request Object
    const paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA'],
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'mercadopago',
              gatewayMerchantId: process.env.MERCADO_PAGO_PUBLIC_KEY,
            },
          },
        },
      ],
      merchantInfo: {
        merchantName: 'CertDigital',
        merchantId: 'certdigital',
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: preco.toString(),
        currencyCode: 'BRL',
        countryCode: 'BR',
      },
      callbackIntents: ['PAYMENT_AUTHORIZATION'],
    };

    return NextResponse.json({
      success: true,
      paymentRequest,
      clientToken: process.env.MERCADO_PAGO_PUBLIC_KEY,
    });
  } catch (error) {
    console.error('Erro ao criar pagamento Google Pay:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
}
