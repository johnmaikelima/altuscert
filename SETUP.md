# CertDigital - Setup e Configuração

## Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Conta no Mercado Pago (https://www.mercadopago.com.br)

## Instalação

1. **Instalar dependências** (já feito):
```bash
npm install
```

2. **Configurar variáveis de ambiente**:
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione as seguintes variáveis:

```env
MERCADO_PAGO_ACCESS_TOKEN=seu_token_aqui
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Como obter o Access Token do Mercado Pago:

1. Acesse https://www.mercadopago.com.br/developers/panel
2. Faça login ou crie uma conta
3. Vá em "Credenciais" na seção de Aplicações
4. Copie o **Access Token** (use o token de sandbox para testes)
5. Cole no arquivo `.env.local`

## Rodando o projeto

```bash
npm run dev
```

O site estará disponível em: http://localhost:3000

## Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Layout principal
│   ├── checkout/
│   │   └── page.tsx          # Página de checkout
│   ├── sucesso/
│   │   └── page.tsx          # Página de sucesso
│   ├── erro/
│   │   └── page.tsx          # Página de erro
│   ├── pendente/
│   │   └── page.tsx          # Página de pendente
│   ├── api/
│   │   └── mercado-pago/
│   │       ├── create-preference/
│   │       │   └── route.ts  # API para criar preferência
│   │       └── webhook/
│   │           └── route.ts  # Webhook do Mercado Pago
│   ├── sitemap.ts            # Sitemap para SEO
│   ├── robots.ts             # Robots.txt para SEO
│   └── schema.ts             # Schema JSON-LD para SEO
├── lib/
│   └── constants.ts          # Constantes da aplicação
└── types/
    └── index.ts              # Tipos TypeScript
```

## Funcionalidades

✅ **Home Page Moderna**
- Design responsivo e moderno
- Hero section com CTA
- Seção de features
- Seção de produtos (A1 PJ e A1 PF)
- Footer com informações

✅ **Produtos**
- Certificado A1 PJ - R$ 89,90
- Certificado A1 PF - R$ 85,00

✅ **Checkout**
- Formulário de dados do cliente
- Integração com Mercado Pago
- Redirecionamento seguro para pagamento

✅ **Páginas de Retorno**
- Sucesso: Confirmação de pagamento
- Erro: Tratamento de falhas
- Pendente: Status de processamento

✅ **SEO Otimizado**
- Metatags e Open Graph
- Sitemap XML
- Robots.txt
- Schema JSON-LD
- URLs amigáveis

✅ **Integração WhatsApp**
- Links diretos para WhatsApp em toda a página
- Número: (11) 98775-6034

## Próximos Passos

1. Configure o `.env.local` com seu Access Token do Mercado Pago
2. Execute `npm run dev`
3. Teste o fluxo de compra em http://localhost:3000
4. Quando estiver pronto para produção, faça o deploy (Vercel, Netlify, etc.)

## Notas Importantes

- O projeto usa Next.js 14+ com App Router
- Tailwind CSS para estilização
- Lucide React para ícones
- Mercado Pago SDK para pagamentos
- TypeScript para type safety

## Suporte

Para dúvidas sobre integração com Mercado Pago:
- Documentação: https://www.mercadopago.com.br/developers/pt/docs
- Sandbox: Use o token de sandbox para testes
