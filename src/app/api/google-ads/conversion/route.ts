import { NextRequest, NextResponse } from 'next/server';

/**
 * API para registrar conversões no Google Ads via Google Tag Manager
 * 
 * Esta API retorna um script que dispara um evento no dataLayer do GTM,
 * que por sua vez envia a conversão para o Google Ads.
 * 
 * Vantagens:
 * - Não precisa de Label de conversão
 * - Mais fácil de configurar
 * - Funciona com GTM
 */

export async function POST(request: NextRequest) {
  try {
    const { orderId, value, currency, email } = await request.json();

    if (!orderId || !value) {
      return NextResponse.json(
        { error: 'orderId e value são obrigatórios' },
        { status: 400 }
      );
    }

    console.log('📊 Registrando conversão do Google Ads');
    console.log('  - Order ID:', orderId);
    console.log('  - Valor:', value);
    console.log('  - Moeda:', currency || 'BRL');
    console.log('  - Email:', email?.substring(0, 3) + '***');

    const conversionId = process.env.GOOGLE_ADS_CONVERSION_ID || 'AW-17921729189';

    // Retornar script para executar no cliente (via GTM)
    const conversionScript = `
      <script>
        // Disparar evento no dataLayer do Google Tag Manager
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'purchase',
          'transaction_id': '${orderId}',
          'value': ${value},
          'currency': '${currency || 'BRL'}',
          'items': [{
            'item_id': 'certificado-digital',
            'item_name': 'Certificado Digital',
            'price': ${value},
            'quantity': 1
          }]
        });
        
        // Também disparar conversão direta do Google Ads (backup)
        if (typeof gtag !== 'undefined') {
          gtag('event', 'conversion', {
            'send_to': '${conversionId}',
            'value': ${value},
            'currency': '${currency || 'BRL'}',
            'transaction_id': '${orderId}'
          });
        }
        
        console.log('✅ Conversão registrada:', {
          orderId: '${orderId}',
          value: ${value},
          currency: '${currency || 'BRL'}'
        });
      </script>
    `;

    console.log('✅ Script de conversão gerado para pedido:', orderId);
    
    return NextResponse.json({
      success: true,
      message: 'Conversão registrada com sucesso',
      orderId,
      value,
      conversionId,
      script: conversionScript,
    });
  } catch (error) {
    console.error('Erro ao processar conversão:', error);
    return NextResponse.json(
      { error: 'Erro ao processar conversão' },
      { status: 500 }
    );
  }
}
