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
    const { email, nome, codigoPedido, tipo, preco, status, cliente } = body;

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
    const fromName = process.env.GMAIL_FROM_NAME || 'Altus Certificados';
    const whatsappNumber = '5511992177044';
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    
    // Determinar status e mensagem
    const statusPagamento = status === 'confirmado' ? 'Pagamento Confirmado ✓' : 'Aguardando Pagamento';
    const statusColor = status === 'confirmado' ? '#10b981' : '#f59e0b';
    const statusBgColor = status === 'confirmado' ? '#d1fae5' : '#fef3c7';
    
    const statusMensagem = status === 'confirmado' 
      ? 'Seu pagamento foi confirmado com sucesso! Você pode prosseguir com a emissão do certificado.'
      : 'Seu pedido foi criado, mas o pagamento ainda não foi confirmado. Complete o pagamento para prosseguir com a emissão do certificado.';

    // HTML do email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #1f2937; margin: 0; font-size: 28px; }
            .header p { color: #6b7280; margin: 10px 0 0 0; }
            .status-badge { display: inline-block; background-color: ${statusBgColor}; color: ${statusColor}; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin-top: 15px; font-size: 14px; }
            .content { color: #333333; line-height: 1.6; }
            .code-box { background-color: #f0f0f0; border-left: 4px solid #0066cc; padding: 15px; margin: 20px 0; border-radius: 4px; }
            .code { font-family: monospace; font-size: 18px; font-weight: bold; color: #0066cc; }
            .details { background-color: #f9f9f9; padding: 20px; border-radius: 4px; margin: 20px 0; border: 1px solid #e5e7eb; }
            .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
            .detail-row:last-child { border-bottom: none; }
            .label { color: #666666; font-weight: 600; }
            .value { color: #333333; text-align: right; }
            .section-title { color: #1f2937; font-weight: bold; font-size: 16px; margin-top: 25px; margin-bottom: 12px; }
            .warning-box { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
            .warning-box p { margin: 0; color: #92400e; }
            .success-box { background-color: #d1fae5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px; }
            .success-box p { margin: 0; color: #065f46; }
            .button { display: inline-block; background-color: #0066cc; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin-top: 15px; font-weight: bold; }
            .whatsapp-button { display: inline-block; background-color: #25d366; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin-top: 15px; font-weight: bold; margin-left: 10px; }
            .footer { text-align: center; color: #999999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
            ul { margin: 15px 0; padding-left: 20px; }
            li { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Seu Pedido foi Criado!</h1>
              <p>Código do Pedido: <strong>${codigoPedido}</strong></p>
              <div class="status-badge">${statusPagamento}</div>
            </div>

            <div class="content">
              <p>Olá <strong>${nome}</strong>,</p>
              
              <p>${statusMensagem}</p>

              <div class="code-box">
                <p style="margin: 0 0 10px 0; color: #666666; font-size: 12px; text-transform: uppercase;">CÓDIGO DO PEDIDO</p>
                <div class="code">${codigoPedido}</div>
                <p style="margin: 10px 0 0 0; color: #999999; font-size: 12px;">Guarde este código para acompanhar seu pedido</p>
              </div>

              <div class="section-title">Detalhes do Pedido</div>
              <div class="details">
                <div class="detail-row">
                  <span class="label">Tipo de Certificado:</span>
                  <span class="value">${tipoCertificado}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Valor:</span>
                  <span class="value">R$ ${preco.toFixed(2).replace('.', ',')}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Data do Pedido:</span>
                  <span class="value">${new Date().toLocaleDateString('pt-BR')}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Status:</span>
                  <span class="value" style="color: ${statusColor}; font-weight: bold;">${statusPagamento}</span>
                </div>
              </div>

              <div class="section-title">Seus Dados</div>
              <div class="details">
                <div class="detail-row">
                  <span class="label">Nome:</span>
                  <span class="value">${cliente?.nome || nome}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Email:</span>
                  <span class="value">${email}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Telefone:</span>
                  <span class="value">${cliente?.telefone || 'Não informado'}</span>
                </div>
                <div class="detail-row">
                  <span class="label">CPF/CNPJ:</span>
                  <span class="value">${cliente?.cpf_cnpj || 'Não informado'}</span>
                </div>
              </div>

              ${status !== 'confirmado' ? `
              <div class="warning-box">
                <p><strong>⚠️ Atenção:</strong> Seu pagamento ainda não foi confirmado. Complete o pagamento para que possamos processar sua emissão de certificado.</p>
              </div>
              ` : `
              <div class="success-box">
                <p><strong>✓ Pagamento Confirmado!</strong> Você pode prosseguir com a emissão do seu certificado digital.</p>
              </div>
              `}

              <div class="section-title">Próximos Passos</div>
              <ul>
                <li>Verifique seu email para instruções de emissão do certificado</li>
                <li>Você pode rastrear seu pedido usando o código acima</li>
                <li>Se tiver dúvidas ou problemas, entre em contato conosco via WhatsApp</li>
              </ul>

              <p style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/rastrear" class="button">Rastrear Pedido</a>
                <a href="${whatsappUrl}" class="whatsapp-button">Falar no WhatsApp</a>
              </p>

              <div class="section-title">Precisa de Ajuda?</div>
              <p>Se você tiver qualquer dúvida ou problema para completar o pagamento, entre em contato conosco:</p>
              <ul>
                <li><strong>WhatsApp:</strong> <a href="${whatsappUrl}" style="color: #25d366; text-decoration: none;">Clique aqui para abrir o WhatsApp</a></li>
                <li><strong>Email:</strong> altuscertificados@gmail.com</li>
              </ul>
            </div>

            <div class="footer">
              <p>© 2026 Altus Certificados. Todos os direitos reservados.</p>
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
