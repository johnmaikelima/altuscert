import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { codigoPedido, tipo, preco, cliente, dataCriacao } = body;

    // Configurar transporter do Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Email do administrador
    const adminEmail = process.env.ADMIN_EMAIL || 'altuscertificados@gmail.com';
    const fromName = process.env.GMAIL_FROM_NAME || 'Altus Certificados';

    // Formatar data
    const dataFormatada = new Date(dataCriacao).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // HTML do email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { padding: 20px; }
            .info-box { background-color: #f9f9f9; border-left: 4px solid #0066cc; padding: 15px; margin: 15px 0; }
            .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .info-row:last-child { border-bottom: none; }
            .label { font-weight: bold; color: #333; }
            .value { color: #666; }
            .cliente-info { background-color: #f0f7ff; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .cliente-info h3 { margin-top: 0; color: #0066cc; }
            .cliente-row { padding: 8px 0; }
            .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; border-top: 1px solid #eee; }
            .status-badge { display: inline-block; background-color: #fff3cd; color: #856404; padding: 8px 12px; border-radius: 4px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Novo Pedido Recebido!</h1>
            </div>
            
            <div class="content">
              <p>Um novo pedido foi criado no sistema. Confira os detalhes abaixo:</p>
              
              <div class="info-box">
                <div class="info-row">
                  <span class="label">Código do Pedido:</span>
                  <span class="value"><strong>${codigoPedido}</strong></span>
                </div>
                <div class="info-row">
                  <span class="label">Tipo de Certificado:</span>
                  <span class="value">${tipo}</span>
                </div>
                <div class="info-row">
                  <span class="label">Valor:</span>
                  <span class="value"><strong>R$ ${preco.toFixed(2)}</strong></span>
                </div>
                <div class="info-row">
                  <span class="label">Data/Hora:</span>
                  <span class="value">${dataFormatada}</span>
                </div>
                <div class="info-row">
                  <span class="label">Status:</span>
                  <span class="status-badge">Aguardando Pagamento</span>
                </div>
              </div>

              <div class="cliente-info">
                <h3>📋 Dados do Cliente</h3>
                <div class="cliente-row">
                  <strong>Nome:</strong> ${cliente.nome}
                </div>
                <div class="cliente-row">
                  <strong>Email:</strong> ${cliente.email}
                </div>
                <div class="cliente-row">
                  <strong>Telefone:</strong> ${cliente.telefone}
                </div>
                <div class="cliente-row">
                  <strong>CPF/CNPJ:</strong> ${cliente.cpf_cnpj || 'Não informado'}
                </div>
              </div>

              <p style="margin-top: 20px;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/pedidos" style="display: inline-block; background-color: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                  Ver Painel de Pedidos
                </a>
              </p>
            </div>

            <div class="footer">
              <p>Este é um email automático do sistema Altus Certificados. Não responda este email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar email
    await transporter.sendMail({
      from: `${fromName} <${process.env.GMAIL_USER}>`,
      to: adminEmail,
      subject: `🎉 Novo Pedido: ${codigoPedido} - ${tipo}`,
      html: htmlContent,
    });

    console.log(`✅ Notificação de pedido enviada para ${adminEmail}`);

    return NextResponse.json({
      success: true,
      message: 'Notificação enviada com sucesso',
    });
  } catch (error) {
    console.error('❌ Erro ao enviar notificação de pedido:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar notificação' },
      { status: 500 }
    );
  }
}
