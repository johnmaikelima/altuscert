# CertDigital - Plataforma de Certificados Digitais

Uma plataforma moderna, responsiva e otimizada para SEO para emissão de certificados digitais A1 (PJ e PF) com integração de pagamento via Mercado Pago.

## 🎯 Características Principais

### 🎨 Design & UX
- **Interface moderna e responsiva** - Funciona perfeitamente em desktop, tablet e mobile
- **Design profissional** - Cores azul e verde (WhatsApp) com gradientes modernos
- **Ícones Lucide React** - Ícones limpos e profissionais
- **Tailwind CSS** - Estilização rápida e eficiente

### 💳 Produtos
- **Certificado A1 PJ** - R$ 89,90 (Para Pessoas Jurídicas)
- **Certificado A1 PF** - R$ 85,00 (Para Pessoas Físicas)

### 🛒 Checkout & Pagamento
- Formulário de dados do cliente
- Integração com **Mercado Pago**
- Redirecionamento seguro para pagamento
- Páginas de sucesso, erro e pendente

### 📱 Integração WhatsApp
- Links diretos em toda a página
- Número: **(11) 98775-6034**
- Mensagens pré-preenchidas

### 🔍 SEO Otimizado
- **Metatags** - Title, description, keywords
- **Open Graph** - Compartilhamento em redes sociais
- **Schema JSON-LD** - Dados estruturados para Google
- **Sitemap XML** - Para indexação
- **Robots.txt** - Controle de crawlers
- **URLs amigáveis** - Rotas semânticas

### ⚡ Performance
- Next.js 14+ com App Router
- React Compiler ativado
- Compressão automática
- ETag generation

## 🚀 Quick Start

### 1. Configurar Variáveis de Ambiente

Crie `.env.local` na raiz do projeto:

```env
MERCADO_PAGO_ACCESS_TOKEN=seu_token_aqui
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Como obter o token:**
1. Acesse: https://www.mercadopago.com.br/developers/panel
2. Faça login
3. Vá em "Credenciais"
4. Copie o Access Token (sandbox para testes)

### 2. Rodar o Projeto

```bash
cd c:\Users\ACER\Desktop\Projetos\certificado\certificado
npm run dev
```

Acesse: **http://localhost:3000**

### 3. Testar Fluxo de Compra

1. Clique em "Comprar Agora"
2. Preencha o formulário
3. Clique em "Ir para Pagamento"
4. Será redirecionado para Mercado Pago

## 📁 Estrutura do Projeto

```
certificado/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Home page
│   │   ├── layout.tsx                  # Layout principal
│   │   ├── globals.css                 # Estilos globais
│   │   ├── sitemap.ts                  # Sitemap para SEO
│   │   ├── robots.ts                   # Robots.txt
│   │   ├── schema.ts                   # Schema JSON-LD
│   │   ├── checkout/
│   │   │   └── page.tsx                # Página de checkout
│   │   ├── sucesso/
│   │   │   └── page.tsx                # Página de sucesso
│   │   ├── erro/
│   │   │   └── page.tsx                # Página de erro
│   │   ├── pendente/
│   │   │   └── page.tsx                # Página de pendente
│   │   └── api/
│   │       └── mercado-pago/
│   │           ├── create-preference/
│   │           │   └── route.ts        # API para criar preferência
│   │           └── webhook/
│   │               └── route.ts        # Webhook do Mercado Pago
│   ├── components/
│   │   ├── Header.tsx                  # Header reutilizável
│   │   ├── Footer.tsx                  # Footer reutilizável
│   │   └── SchemaScript.tsx            # Schema JSON-LD
│   ├── lib/
│   │   └── constants.ts                # Constantes da app
│   └── types/
│       └── index.ts                    # Tipos TypeScript
├── public/
│   ├── robots.txt                      # Robots.txt estático
│   └── favicon.ico                     # Favicon
├── .env.example                        # Exemplo de variáveis
├── .gitignore                          # Git ignore
├── next.config.ts                      # Configuração Next.js
├── tailwind.config.ts                  # Configuração Tailwind
├── postcss.config.mjs                  # Configuração PostCSS
├── tsconfig.json                       # Configuração TypeScript
├── package.json                        # Dependências
├── SETUP.md                            # Guia de setup
├── QUICKSTART.md                       # Quick start
└── README_CERTDIGITAL.md               # Este arquivo
```

## 📦 Dependências

- **Next.js 16.1.6** - Framework React
- **React 19.2.3** - Biblioteca UI
- **Tailwind CSS 4** - Estilização
- **Lucide React** - Ícones
- **Mercado Pago SDK** - Integração de pagamento
- **TypeScript 5** - Type safety

## 🔧 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar em produção
npm start

# Lint
npm run lint
```

## 🌐 Páginas Disponíveis

| Rota | Descrição |
|------|-----------|
| `/` | Home page com produtos |
| `/checkout?tipo=a1-pj` | Checkout para A1 PJ |
| `/checkout?tipo=a1-pf` | Checkout para A1 PF |
| `/sucesso` | Confirmação de pagamento |
| `/erro` | Erro no pagamento |
| `/pendente` | Pagamento pendente |
| `/sitemap.xml` | Sitemap para SEO |
| `/robots.txt` | Robots.txt para SEO |

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Fazer upload da pasta .next
```

### Outras Plataformas
- AWS Amplify
- Google Cloud Run
- Heroku
- DigitalOcean

**Lembre-se de atualizar `NEXT_PUBLIC_BASE_URL` com seu domínio!**

## 🔐 Segurança

- Variáveis de ambiente protegidas
- API routes server-side
- Validação de dados
- HTTPS recomendado
- Token Mercado Pago seguro

## 📊 SEO

- ✅ Meta tags otimizadas
- ✅ Open Graph para redes sociais
- ✅ Schema JSON-LD estruturado
- ✅ Sitemap XML
- ✅ Robots.txt
- ✅ URLs amigáveis
- ✅ Mobile-first responsive
- ✅ Performance otimizada

## 📱 Responsividade

Totalmente responsivo em:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## 🎨 Paleta de Cores

- **Primária**: Azul (#0066cc)
- **Secundária**: Verde (#22c55e - WhatsApp)
- **Fundo**: Branco (#ffffff)
- **Texto**: Cinza escuro (#171717)

## 📞 Suporte

- **WhatsApp**: (11) 98775-6034
- **Documentação Mercado Pago**: https://www.mercadopago.com.br/developers/pt/docs

## 📄 Licença

© 2024 CertDigital. Todos os direitos reservados.

## 🤝 Contribuições

Para melhorias e sugestões, entre em contato via WhatsApp.

---

**Desenvolvido com ❤️ para facilitar sua vida digital**
