# Configuração do Gmail para Envio de Emails

Este guia mostra como configurar o Gmail para enviar emails automaticamente com o código do pedido.

## 📋 Pré-requisitos

- Conta Gmail ativa
- Acesso à conta Google
- Nodemailer já instalado (✅ já feito)

## 🔧 Passo 1: Ativar Autenticação de Dois Fatores

1. Acesse https://myaccount.google.com/
2. Clique em **Segurança** (menu esquerdo)
3. Procure por **Autenticação de dois fatores**
4. Clique em **Começar** e siga as instruções
5. Confirme seu número de telefone

## 🔑 Passo 2: Gerar Senha de App

1. Acesse https://myaccount.google.com/apppasswords
2. Se não aparecer a opção, ative a autenticação de dois fatores primeiro
3. Selecione:
   - **App**: Mail
   - **Device**: Windows Computer (ou seu dispositivo)
4. Clique em **Gerar**
5. Google vai gerar uma senha de 16 caracteres
6. **Copie essa senha** (você vai usar no `.env.local`)

## 📝 Passo 3: Configurar Variáveis de Ambiente

1. Abra o arquivo `.env.local` na raiz do projeto
2. Adicione as seguintes linhas:

```env
# Gmail Configuration
GMAIL_USER=seu_email@gmail.com
GMAIL_PASSWORD=sua_senha_de_app_aqui
GMAIL_FROM_NAME=CertDigital
```

**Exemplo:**
```env
GMAIL_USER=minha.empresa@gmail.com
GMAIL_PASSWORD=abcd efgh ijkl mnop
GMAIL_FROM_NAME=CertDigital
```

⚠️ **IMPORTANTE**: Use a senha de app gerada no passo anterior, NÃO sua senha do Gmail!

## ✅ Passo 4: Testar a Configuração

1. Inicie o servidor: `npm run dev`
2. Faça um teste de compra no site
3. Verifique o console do servidor para ver se o email foi enviado
4. Procure pelo email na caixa de entrada do cliente

## 📧 O Que o Cliente Vai Receber

O cliente receberá um email profissional com:
- ✅ Confirmação de pedido
- ✅ Código único do pedido (ex: CERT-XXXXXX-XXXXXX)
- ✅ Tipo de certificado (A1 PJ ou A1 PF)
- ✅ Valor pago
- ✅ Data do pedido
- ✅ Link para rastrear o pedido
- ✅ Próximos passos

## 🔒 Segurança

- ✅ A senha de app é segura e específica para este app
- ✅ Você pode revogar a senha a qualquer momento
- ✅ Não use sua senha do Gmail, sempre use a senha de app
- ✅ Nunca compartilhe o `.env.local` (está no `.gitignore`)

## 🚨 Troubleshooting

### "Erro ao enviar email"
- Verifique se as variáveis estão corretas no `.env.local`
- Confirme que a autenticação de dois fatores está ativa
- Verifique se a senha de app foi gerada corretamente

### "Gmail não configurado"
- Se não tiver configurado o Gmail, o sistema envia um email simulado
- Verifique o console do servidor para ver a simulação
- Configure o Gmail para enviar emails reais

### "Acesso negado"
- Pode ser que a senha de app expirou
- Gere uma nova senha de app em https://myaccount.google.com/apppasswords
- Atualize o `.env.local`

## 📚 Recursos Adicionais

- [Google App Passwords](https://myaccount.google.com/apppasswords)
- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail Security](https://support.google.com/accounts/answer/185833)

## ✨ Próximas Melhorias (Opcionais)

- Integrar com SendGrid ou Resend para maior escalabilidade
- Adicionar templates de email mais customizados
- Implementar fila de emails (Bull, RabbitMQ)
- Adicionar logs de emails enviados no banco de dados
