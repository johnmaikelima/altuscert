# 🚀 CertDigital - Quick Start

## 1️⃣ Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```env
MERCADO_PAGO_ACCESS_TOKEN=seu_token_aqui
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Como obter o token:**
1. Acesse: https://www.mercadopago.com.br/developers/panel
2. Faça login
3. Vá em "Credenciais"
4. Copie o **Access Token** (sandbox para testes)
5. Cole no `.env.local`

## 2️⃣ Rodar o Projeto

```bash
cd c:\Users\ACER\Desktop\Projetos\certificado\certificado
npm run dev
```

Acesse: http://localhost:3000

## 3️⃣ Testar o Fluxo de Compra

1. Clique em "Comprar Agora" em um dos certificados
2. Preencha o formulário
3. Clique em "Ir para Pagamento"
4. Você será redirecionado para o Mercado Pago

## 📋 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx              ← Home page
│   ├── checkout/page.tsx     ← Checkout
│   ├── sucesso/page.tsx      ← Success page
│   ├── erro/page.tsx         ← Error page
│   ├── pendente/page.tsx     ← Pending page
│   └── api/mercado-pago/     ← API endpoints
├── lib/constants.ts          ← Constantes
├── types/index.ts            ← Tipos TypeScript
└── components/               ← Componentes reutilizáveis
```

## ✨ Funcionalidades Implementadas

✅ Home page moderna e responsiva
✅ Produtos A1 PJ (R$ 89,90) e A1 PF (R$ 85)
✅ Checkout com formulário
✅ Integração Mercado Pago
✅ Páginas de sucesso/erro/pendente
✅ SEO otimizado (metatags, schema, sitemap)
✅ WhatsApp integrado
✅ URLs amigáveis

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar build em produção
npm start

# Lint
npm run lint
```

## 📱 Responsividade

O site é totalmente responsivo e funciona em:
- Desktop
- Tablet
- Mobile

## 🎨 Design

- Cores: Azul (#0066cc) e Verde (WhatsApp)
- Tipografia: Sans-serif moderna
- Componentes: Lucide React icons
- Estilização: Tailwind CSS

## 🚀 Deploy

Quando estiver pronto, faça deploy em:
- **Vercel** (recomendado para Next.js)
- **Netlify**
- **AWS**
- **Google Cloud**

Lembre-se de atualizar `NEXT_PUBLIC_BASE_URL` com seu domínio!

## ❓ Dúvidas?

Consulte:
- SETUP.md para configuração detalhada
- Documentação Mercado Pago: https://www.mercadopago.com.br/developers/pt/docs
