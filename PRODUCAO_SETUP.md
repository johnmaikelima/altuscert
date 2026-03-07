# Guia Completo - Deploy em Produção

Este guia mostra como configurar e fazer deploy do CertDigital em produção.

## 📋 Credenciais Necessárias

### 1. Mercado Pago - 4 Credenciais

**Access Token**
- Usado para fazer requisições à API
- Válido por 6 meses
- Pode ser regenerado
- Formato: `APP_USR_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

**Public Key**
- Chave pública para Google Pay
- Pode ser exposta no frontend
- Formato: `APP_USR_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

**Client ID**
- Identificador único da sua aplicação
- Usado para OAuth
- Formato: `xxxxxxxxxxxxxxxx`

**Client Secret**
- Chave secreta para autenticar requisições
- **NUNCA compartilhe ou exponha**
- Usado para validar webhooks
- Formato: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 2. Gmail - 3 Credenciais

**Email (GMAIL_USER)**
- Seu email do Gmail
- Formato: `seu_email@gmail.com`

**Senha de App (GMAIL_PASSWORD)**
- Gerada no Google Account
- **NÃO é sua senha do Gmail**
- Formato: `xxxx xxxx xxxx xxxx` (16 caracteres)

**Nome do Remetente (GMAIL_FROM_NAME)**
- Nome que aparece nos emails
- Exemplo: `CertDigital`

### 3. Admin - 1 Credencial

**Senha Admin (ADMIN_PASSWORD)**
- Senha para acessar `/admin/pedidos`
- Deve ser forte e segura
- Exemplo: `MinhaSenhaForte123!@#`

## 🔑 Passo 1: Obter Credenciais do Mercado Pago

1. Acesse: https://www.mercadopago.com.br/developers/panel
2. Faça login com sua conta
3. Vá para **Credenciais**
4. Você verá duas abas: **Desenvolvimento** e **Produção**
5. Clique em **Produção**
6. Copie:
   - **Access Token**
   - **Public Key**
   - **Client ID**
   - **Client Secret**

## 📧 Passo 2: Configurar Gmail

### 2.1 Ativar Autenticação de Dois Fatores

1. Acesse: https://myaccount.google.com/security
2. Vá para **Segurança**
3. Ative **Autenticação de dois fatores**

### 2.2 Gerar Senha de App

1. Acesse: https://myaccount.google.com/apppasswords
2. Selecione:
   - **App**: Mail
   - **Dispositivo**: Windows/Mac/Linux
3. Clique em **Gerar**
4. Copie a senha (16 caracteres)

## 🚀 Passo 3: Configurar Variáveis de Ambiente

### Desenvolvimento (`.env.local`)

```env
# Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN=APP_USR_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MERCADO_PAGO_PUBLIC_KEY=APP_USR_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MERCADO_PAGO_CLIENT_ID=xxxxxxxxxxxxxxxx
MERCADO_PAGO_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Gmail
GMAIL_USER=seu_email@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
GMAIL_FROM_NAME=CertDigital

# Admin
ADMIN_PASSWORD=sua_senha_admin_aqui
```

### Produção (Variáveis de Ambiente da Plataforma)

Adicione as mesmas variáveis na sua plataforma de hosting:
- Vercel
- Heroku
- AWS
- Google Cloud
- Etc.

## 🔗 Passo 4: Configurar Webhook

1. Acesse: https://www.mercadopago.com.br/developers/panel
2. Vá para **Webhooks**
3. Clique em **Adicionar Webhook**
4. Preencha:
   - **URL**: `https://seu-dominio.com/api/mercado-pago/webhook`
   - **Eventos**: `payment`
5. Clique em **Salvar**

## 📱 Passo 5: Configurar Domínio

### Atualizar Base URL

1. Abra `.env` em produção
2. Mude:
   ```env
   NEXT_PUBLIC_BASE_URL=https://seu-dominio.com
   ```

### Certificado SSL

- Use HTTPS (obrigatório)
- Certificado SSL válido
- Renovação automática (Let's Encrypt)

## 🌐 Passo 6: Deploy

### Opção 1: Vercel (Recomendado)

```bash
# 1. Instale Vercel CLI
npm i -g vercel

# 2. Faça login
vercel login

# 3. Deploy
vercel

# 4. Configure variáveis de ambiente
vercel env add MERCADO_PAGO_ACCESS_TOKEN
vercel env add MERCADO_PAGO_PUBLIC_KEY
vercel env add MERCADO_PAGO_CLIENT_ID
vercel env add MERCADO_PAGO_CLIENT_SECRET
vercel env add GMAIL_USER
vercel env add GMAIL_PASSWORD
vercel env add GMAIL_FROM_NAME
vercel env add ADMIN_PASSWORD
vercel env add NEXT_PUBLIC_BASE_URL

# 5. Deploy em produção
vercel --prod
```

### Opção 2: Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
docker build -t certdigital .
docker run -p 3000:3000 \
  -e MERCADO_PAGO_ACCESS_TOKEN=... \
  -e MERCADO_PAGO_PUBLIC_KEY=... \
  -e MERCADO_PAGO_CLIENT_ID=... \
  -e MERCADO_PAGO_CLIENT_SECRET=... \
  -e GMAIL_USER=... \
  -e GMAIL_PASSWORD=... \
  -e GMAIL_FROM_NAME=... \
  -e ADMIN_PASSWORD=... \
  -e NEXT_PUBLIC_BASE_URL=... \
  certdigital
```

## ✅ Checklist de Produção

- [ ] Credenciais do Mercado Pago obtidas
- [ ] Gmail configurado com autenticação 2FA
- [ ] Senha de app do Gmail gerada
- [ ] Variáveis de ambiente configuradas
- [ ] Webhook registrado no Mercado Pago
- [ ] Domínio configurado
- [ ] Certificado SSL ativo
- [ ] Build local testado (`npm run build`)
- [ ] Variáveis de ambiente em produção
- [ ] Deploy realizado
- [ ] Testado fluxo de pagamento completo
- [ ] Emails funcionando
- [ ] Admin panel acessível
- [ ] Webhooks recebendo notificações

## 🧪 Testar em Produção

### 1. Acessar Site

```
https://seu-dominio.com
```

### 2. Fazer Compra de Teste

- Clique em "Comprar Agora"
- Preencha dados
- Selecione Mercado Pago
- Use cartão de teste:
  - **Número**: 4111 1111 1111 1111
  - **Validade**: 12/25
  - **CVV**: 123

### 3. Verificar Status

- Acesse `/admin/pedidos`
- Verifique se pedido foi criado
- Confirme se status foi atualizado para `confirmado`
- Verifique se email foi recebido

### 4. Monitorar Webhooks

1. Acesse Mercado Pago > Webhooks > Histórico
2. Verifique se webhook foi enviado
3. Confirme se resposta foi 200 OK

## 🔒 Segurança em Produção

### Variáveis de Ambiente

- ✅ Nunca commitar `.env.local`
- ✅ Usar `.env.example` como template
- ✅ Adicionar variáveis na plataforma de hosting
- ✅ Usar secrets manager se disponível

### HTTPS

- ✅ Sempre usar HTTPS
- ✅ Certificado SSL válido
- ✅ Redirecionamento HTTP → HTTPS

### Senhas

- ✅ Senhas fortes (mínimo 12 caracteres)
- ✅ Caracteres especiais
- ✅ Números e letras maiúsculas/minúsculas
- ✅ Nunca compartilhar

### Logs

- ✅ Monitorar logs de erro
- ✅ Alertas para falhas de pagamento
- ✅ Backup de dados regularmente

## 📊 Monitoramento

### Mercado Pago

- Painel: https://www.mercadopago.com.br/admin/transacciones
- Relatórios de vendas
- Histórico de webhooks

### Plataforma de Hosting

- Logs de aplicação
- Métricas de performance
- Alertas de erro

### Email

- Verificar pasta de spam
- Confirmar entrega
- Monitorar taxa de rejeição

## 🐛 Troubleshooting

### "Webhook não está sendo recebido"

- Verifique URL no Mercado Pago
- Confirme que domínio é acessível
- Verifique logs de erro
- Teste com ngrok em desenvolvimento

### "Pagamento não está sendo processado"

- Verifique Access Token
- Confirme que Client Secret está correto
- Verifique logs do servidor
- Teste com cartão de teste

### "Email não está sendo enviado"

- Verifique credenciais do Gmail
- Confirme que 2FA está ativado
- Verifique senha de app
- Veja logs de erro

## 📞 Suporte

- Mercado Pago: https://www.mercadopago.com.br/developers/support
- Vercel: https://vercel.com/support
- Gmail: https://support.google.com/mail

## 🎉 Próximos Passos

1. Monitorar transações
2. Otimizar conversão
3. Adicionar mais produtos
4. Implementar analytics
5. Escalar infraestrutura conforme necessário
