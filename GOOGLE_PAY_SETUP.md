# Configuração do Google Pay

Este guia mostra como configurar o Google Pay como opção de pagamento no CertDigital.

## 🔐 O que é Google Pay?

Google Pay é um serviço de pagamento digital que permite aos usuários pagar com:
- Cartões de crédito/débito salvos
- Carteiras digitais
- Contas Google

## 📋 Pré-requisitos

1. Conta no Google Pay for Business
2. Conta no Mercado Pago (já configurada)
3. Chave Pública do Mercado Pago

## 🚀 Passo 1: Obter Chave Pública do Mercado Pago

1. Acesse https://www.mercadopago.com.br/developers/panel
2. Faça login com sua conta
3. Vá para **Credenciais**
4. Copie a **Chave Pública (Public Key)**
5. Adicione ao `.env.local`:

```env
MERCADO_PAGO_PUBLIC_KEY=APP_USR_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🔧 Passo 2: Configurar Google Pay no Mercado Pago

1. Acesse o painel do Mercado Pago
2. Vá para **Configurações > Integrações**
3. Ative **Google Pay**
4. Configure o domínio da sua aplicação
5. Salve as configurações

## 💳 Como Funciona

### Fluxo de Pagamento com Google Pay

```
1. Usuário seleciona "Google Pay" no checkout
2. Preenche dados (nome, email, telefone, CPF/CNPJ)
3. Clica em "Ir para Pagamento"
4. Google Pay abre com opções de pagamento
5. Usuário seleciona cartão/método
6. Pagamento processado
7. Redirecionado para página de sucesso
```

## 🌐 Domínios Permitidos

Google Pay requer que você configure os domínios onde será usado:

**Desenvolvimento:**
- `http://localhost:3000`
- `http://localhost:3001`

**Produção:**
- `https://seu-dominio.com`
- `https://www.seu-dominio.com`

## 📱 Dispositivos Suportados

Google Pay está disponível em:
- ✅ Android (Chrome, Firefox, Safari)
- ✅ iOS (Safari)
- ✅ Desktop (Chrome, Firefox, Safari, Edge)

## 🔍 Testando Google Pay

### Modo Teste

1. Use cartões de teste do Mercado Pago:
   - **Visa**: 4111 1111 1111 1111
   - **Mastercard**: 5555 5555 5555 4444
   - **Validade**: 12/25
   - **CVV**: 123

2. Acesse http://localhost:3000/checkout?tipo=a1-pf
3. Selecione "Google Pay"
4. Preencha os dados
5. Clique em "Ir para Pagamento"
6. Use um cartão de teste

### Modo Produção

1. Use cartões reais
2. Google Pay processará pagamentos reais
3. Fundos serão transferidos para sua conta

## 🛡️ Segurança

- ✅ Tokenização de cartão (Google Pay não vê dados reais)
- ✅ Criptografia end-to-end
- ✅ Conformidade com PCI DSS
- ✅ Autenticação 3D Secure

## 📊 Monitoramento

Você pode acompanhar pagamentos via Google Pay em:

1. **Painel do Mercado Pago**
   - Vá para **Vendas > Transações**
   - Filtre por "Google Pay"

2. **Painel Admin do CertDigital**
   - Acesse `/admin/pedidos`
   - Veja status dos pagamentos

## 🐛 Troubleshooting

### "Google Pay não está disponível"

- Verifique se está em um dispositivo/navegador suportado
- Confirme que o domínio está configurado no Mercado Pago
- Limpe cache do navegador

### "Erro ao processar pagamento"

- Verifique `MERCADO_PAGO_PUBLIC_KEY` no `.env.local`
- Confirme que a chave é válida
- Verifique logs do navegador (F12)

### "Cartão recusado"

- Use cartões de teste em desenvolvimento
- Verifique dados do cartão
- Confirme que o Mercado Pago está ativo

## 📚 Recursos Adicionais

- [Google Pay Documentation](https://developers.google.com/pay/api)
- [Mercado Pago Google Pay](https://www.mercadopago.com.br/developers/pt/guides/payments/web-payment-checkout/integration)
- [Google Pay Test Cards](https://developers.google.com/pay/api/web/guides/test-and-troubleshoot/test-solutions)

## 🔄 Próximos Passos

1. Configurar domínio em produção
2. Testar com cartões reais
3. Monitorar transações
4. Otimizar conversão

## 📞 Suporte

Para dúvidas sobre Google Pay:
- Contate Google Pay Support
- Contate Mercado Pago Support
- Verifique documentação oficial
