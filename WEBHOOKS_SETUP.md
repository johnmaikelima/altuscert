# Configuração de Webhooks - Mercado Pago

Este guia mostra como configurar webhooks para processar notificações de pagamento automaticamente.

## 🔔 O que são Webhooks?

Webhooks são notificações automáticas que o Mercado Pago envia quando um pagamento é processado. Isso permite que seu sistema:
- ✅ Atualize status do pedido automaticamente
- ✅ Envie email de confirmação
- ✅ Gere certificado automaticamente
- ✅ Registre transações

## 📋 Pré-requisitos

1. Conta no Mercado Pago
2. Access Token do Mercado Pago
3. URL pública da sua aplicação (para produção)

## 🚀 Passo 1: Configurar Webhook no Mercado Pago

### Desenvolvimento (Localhost)

Para testar webhooks em desenvolvimento, você precisa expor sua aplicação local:

**Opção 1: Usar ngrok (Recomendado)**

1. Baixe ngrok: https://ngrok.com/download
2. Execute:
   ```bash
   ngrok http 3000
   ```
3. Copie a URL fornecida (ex: `https://abc123.ngrok.io`)

**Opção 2: Usar Cloudflare Tunnel**

1. Instale Cloudflare Wrangler
2. Execute:
   ```bash
   wrangler tunnel --url http://localhost:3000
   ```

### Produção

Use sua URL de produção (ex: `https://seu-dominio.com`)

## 🔧 Passo 2: Registrar Webhook no Mercado Pago

1. Acesse https://www.mercadopago.com.br/developers/panel
2. Vá para **Configurações > Webhooks**
3. Clique em **Adicionar Webhook**
4. Preencha:
   - **URL**: `https://seu-dominio.com/api/mercado-pago/webhook`
   - **Eventos**: Selecione `payment` (pagamentos)
5. Clique em **Salvar**

## 📊 Fluxo de Webhook

```
1. Cliente faz pagamento no Mercado Pago
   ↓
2. Mercado Pago processa o pagamento
   ↓
3. Mercado Pago envia notificação para seu webhook
   ↓
4. Seu servidor recebe a notificação
   ↓
5. Sistema busca detalhes do pagamento
   ↓
6. Atualiza status do pedido
   ↓
7. Envia email de confirmação
   ↓
8. Retorna sucesso para Mercado Pago
```

## 🔍 O que o Webhook Faz

### Quando um pagamento é aprovado:

1. **Atualiza Status do Pedido**
   - Muda de `pendente` para `confirmado`
   - Registra ID do pagamento
   - Registra timestamp de atualização

2. **Envia Email de Confirmação**
   - Notifica cliente que pagamento foi aprovado
   - Inclui código do pedido
   - Inclui instruções de próximos passos

3. **Registra Informações**
   - ID do pagamento Mercado Pago
   - Status do pagamento
   - Data de atualização

### Quando um pagamento é rejeitado/cancelado:

1. Atualiza status para `cancelado`
2. Registra motivo da rejeição
3. Pode enviar email notificando o cliente

## 📝 Estrutura do Webhook

```typescript
POST /api/mercado-pago/webhook

Body:
{
  "type": "payment",
  "data": {
    "id": 123456789
  }
}

Response:
{
  "success": true
}
```

## 🧪 Testando Webhooks

### Teste Manual

1. Faça uma compra no seu site
2. Selecione Mercado Pago como método
3. Use cartão de teste: `4111 1111 1111 1111`
4. Validade: `12/25`
5. CVV: `123`
6. Clique em "Pagar"

### Verificar Logs

1. Acesse o painel do Mercado Pago
2. Vá para **Webhooks**
3. Clique em **Histórico**
4. Veja notificações enviadas e respostas

### Verificar Status do Pedido

1. Acesse `/admin/pedidos`
2. Procure pelo pedido recém-criado
3. Verifique se status foi atualizado para `confirmado`

## 🔐 Segurança

### Validar Requisições

O webhook atual não valida a origem da requisição. Para produção, adicione:

```typescript
// Validar token do Mercado Pago
const token = request.headers.get('x-signature');
if (!validarAssinatura(token, body)) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### Usar HTTPS

- ✅ Sempre use HTTPS em produção
- ✅ Certificado SSL válido
- ✅ Domínio verificado

## 📊 Monitoramento

### Verificar Webhooks Recebidos

Logs aparecem em:
1. **Console do servidor** (desenvolvimento)
2. **Logs da plataforma** (produção - Vercel, Heroku, etc.)
3. **Painel do Mercado Pago** - Histórico de webhooks

### Exemplo de Log

```
Webhook Mercado Pago recebido: { type: 'payment', data: { id: 123456789 } }
Detalhes do pagamento: { status: 'approved', external_reference: 'ABC123', ... }
Pedido ABC123 atualizado para status: confirmado
Email de confirmação enviado para cliente@email.com
```

## 🐛 Troubleshooting

### "Webhook não está sendo recebido"

- Verifique se URL está correta no Mercado Pago
- Confirme que a URL é acessível publicamente
- Teste com ngrok em desenvolvimento
- Verifique firewall/proxy

### "Pedido não está sendo atualizado"

- Verifique se `external_reference` está correto
- Confirme que arquivo `data/pedidos.json` existe
- Verifique permissões de escrita na pasta `data`
- Veja logs do servidor

### "Email de confirmação não é enviado"

- Verifique configuração do Gmail (`.env.local`)
- Confirme que `GMAIL_USER` e `GMAIL_PASSWORD` estão corretos
- Verifique logs de erro do servidor

## 📞 Suporte

Para dúvidas:
- [Documentação Mercado Pago](https://www.mercadopago.com.br/developers/pt/guides/webhooks/overview)
- [Mercado Pago Support](https://www.mercadopago.com.br/developers/support)

## ✅ Checklist de Configuração

- [ ] Access Token do Mercado Pago configurado
- [ ] Webhook registrado no Mercado Pago
- [ ] URL do webhook está correta
- [ ] Servidor está rodando
- [ ] ngrok/tunnel ativo (desenvolvimento)
- [ ] Email do Gmail configurado
- [ ] Pasta `data/` existe e tem permissão de escrita
- [ ] Testou com cartão de teste
- [ ] Verificou logs do servidor
- [ ] Confirmou que pedido foi atualizado
- [ ] Recebeu email de confirmação

## 🚀 Próximos Passos

1. Configurar webhook em produção
2. Adicionar validação de assinatura
3. Implementar retry logic
4. Adicionar logging mais detalhado
5. Monitorar transações em tempo real
