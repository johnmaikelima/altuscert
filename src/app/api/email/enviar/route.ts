import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configurar transporter do Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, nome, codigoPedido, tipo, preco } = body;

    // Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
      console.warn('⚠️ Gmail não configurado. Email não será enviado.');
      console.log('📧 Email simulado para:', email);
      console.log('Código do Pedido:', codigoPedido);
      
      return NextResponse.json({
        success: true,
        message: 'Email simulado (Gmail não configurado)',
        codigoPedido,
      });
    }

    const tipoCertificado = tipo === 'a1-pj' ? 'Certificado A1 PJ' : 'Certificado A1 PF';
    const fromName = process.env.GMAIL_FROM_NAME || 'CertDigital';

    // HTML do email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #0066cc; margin: 0; }
            .content { color: #333333; line-height: 1.6; }
            .code-box { background-color: #f0f0f0; border-left: 4px solid #0066cc; padding: 15px; margin: 20px 0; }
            .code { font-family: monospace; font-size: 18px; font-weight: bold; color: #0066cc; }
            .details { background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
            .detail-row:last-child { border-bottom: none; }
            .label { color: #666666; font-weight: bold; }
            .value { color: #333333; }
            .footer { text-align: center; color: #999999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
            .button { display: inline-block; background-color: #0066cc; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✓ Pedido Confirmado!</h1>
              <p style="color: #666666; margin: 10px 0;">Obrigado pela sua compra</p>
            </div>

            <div class="content">
              <p>Olá <strong>${nome}</strong>,</p>
              
              <p>Seu pedido foi confirmado com sucesso! Abaixo estão os detalhes da sua compra:</p>

              <div class="code-box">
                <p style="margin: 0 0 10px 0; color: #666666; font-size: 12px;">CÓDIGO DO PEDIDO</p>
                <div class="code">${codigoPedido}</div>
                <p style="margin: 10px 0 0 0; color: #999999; font-size: 12px;">Guarde este código para acompanhar seu pedido</p>
              </div>

              <div class="details">
                <div class="detail-row">
                  <span class="label">Tipo de Certificado:</span>
                  <span class="value">${tipoCertificado}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Valor:</span>
                  <span class="value">R$ ${preco.toFixed(2)}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Data:</span>
                  <span class="value">${new Date().toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              <p><strong>Próximos passos:</strong></p>
              <ul>
                <li>Verifique seu email para instruções de emissão do certificado</li>
                <li>Você pode rastrear seu pedido usando o código acima</li>
                <li>Dúvidas? Entre em contato conosco via WhatsApp</li>
              </ul>

              <p>Em breve você receberá um email com as instruções completas para emitir seu certificado digital.</p>

              <p style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/rastrear" class="button">Rastrear Pedido</a>
              </p>
            </div>

            <div class="footer">
              <p>© 2026 CertDigital. Todos os direitos reservados.</p>
              <p>Este é um email automático. Não responda diretamente.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar email
    const mailOptions = {
      from: `${fromName} <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Seu Certificado Digital - Código: ${codigoPedido}`,
      html: htmlContent,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('✅ Email enviado com sucesso para:', email);
    } catch (emailError) {
      console.warn('⚠️ Erro ao enviar email, mas continuando:', emailError);
      // Não falha o pedido se o email falhar
    }

    return NextResponse.json({
      success: true,
      message: 'Pedido processado com sucesso',
      codigoPedido,
    });
  } catch (error) {
    console.error('❌ Erro ao processar pedido:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pedido', details: String(error) },
      { status: 500 }
    );
  }
}
