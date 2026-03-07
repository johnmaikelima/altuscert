import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { email, nome, codigoPedido, tipo, preco } = await request.json();

    if (!email || !nome || !codigoPedido) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Verificar se Gmail está configurado
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
      console.warn('⚠️ Gmail não configurado. Email não será enviado.');
      return NextResponse.json({
        success: true,
        message: 'Email simulado (Gmail não configurado)',
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const whatsappUrl = `https://wa.me/5511987756034?text=${encodeURIComponent(
      `Olá! Meu pagamento do pedido #${codigoPedido} foi confirmado. Gostaria de dar continuidade ao processo do certificado digital.`
    )}`;

    const tipoCertificado = tipo === 'a1-pj' ? 'A1 - Pessoa Jurídica' : 'A1 - Pessoa Física';

    const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pagamento Confirmado</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">✅ Pagamento Confirmado!</h1>
            </td>
          </tr>

          <!-- Conteúdo -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Olá <strong>${nome}</strong>,
              </p>
              
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Ótimas notícias! Seu pagamento foi <strong style="color: #28a745;">confirmado com sucesso</strong>! 🎉
              </p>

              <!-- Box do Pedido -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; margin: 30px 0; border: 2px solid #e9ecef;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="color: #0066cc; margin: 0 0 15px 0; font-size: 18px;">Detalhes do Pedido</h3>
                    <p style="color: #666; margin: 8px 0; font-size: 14px;">
                      <strong>Código do Pedido:</strong> ${codigoPedido}
                    </p>
                    <p style="color: #666; margin: 8px 0; font-size: 14px;">
                      <strong>Certificado:</strong> ${tipoCertificado}
                    </p>
                    <p style="color: #666; margin: 8px 0; font-size: 14px;">
                      <strong>Valor:</strong> R$ ${preco.toFixed(2)}
                    </p>
                    <p style="color: #28a745; margin: 15px 0 0 0; font-size: 16px; font-weight: bold;">
                      ✓ Status: Pagamento Confirmado
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Próximos Passos -->
              <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 18px;">📋 Próximos Passos</h3>
                <p style="color: #856404; margin: 0 0 10px 0; font-size: 14px; line-height: 1.6;">
                  Para dar continuidade ao processo de emissão do seu certificado digital, é necessário entrar em contato conosco pelo WhatsApp.
                </p>
                <p style="color: #856404; margin: 0; font-size: 14px; line-height: 1.6;">
                  <strong>Se você ainda não entrou em contato, clique no botão abaixo:</strong>
                </p>
              </div>

              <!-- Botão WhatsApp -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${whatsappUrl}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);">
                      💬 Falar no WhatsApp
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
                Ou copie e cole este link no seu navegador:<br>
                <a href="${whatsappUrl}" style="color: #0066cc; word-break: break-all;">${whatsappUrl}</a>
              </p>

              <!-- Informações Adicionais -->
              <div style="background-color: #e7f3ff; border-left: 4px solid #0066cc; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h3 style="color: #0066cc; margin: 0 0 10px 0; font-size: 16px;">ℹ️ Informações Importantes</h3>
                <ul style="color: #333; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
                  <li>Nosso horário de atendimento: Segunda a Sexta, das 09h às 18h</li>
                  <li>O processo de emissão será iniciado após o contato pelo WhatsApp</li>
                  <li>Tenha em mãos os documentos necessários para a emissão</li>
                  <li>Qualquer dúvida, estamos à disposição!</li>
                </ul>
              </div>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                Obrigado por escolher a <strong>Altus Certificados</strong>!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #666; font-size: 14px; margin: 0 0 10px 0;">
                <strong>Altus Certificados Digitais</strong>
              </p>
              <p style="color: #999; font-size: 12px; margin: 0;">
                WhatsApp: (11) 98775-6034<br>
                Atendimento: Segunda a Sexta, 09h às 18h
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const fromName = process.env.GMAIL_FROM_NAME || 'Altus Certificados';
    
    await transporter.sendMail({
      from: `"${fromName}" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `✅ Pagamento Confirmado - Pedido #${codigoPedido}`,
      html: htmlEmail,
    });

    console.log(`✅ Email de confirmação de pagamento enviado para: ${email}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar email de confirmação:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar email' },
      { status: 500 }
    );
  }
}
