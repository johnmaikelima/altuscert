# Configuração do Login do Painel Admin

Este guia mostra como configurar a autenticação do painel administrativo.

## 🔐 Como Funciona

O painel admin agora possui um sistema de autenticação com:
- ✅ Página de login (`/admin/login`)
- ✅ Proteção por middleware
- ✅ Cookies de sessão (24 horas)
- ✅ Botão de logout

## 📝 Passo 1: Configurar Senha Admin

1. Abra o arquivo `.env.local` na raiz do projeto
2. Adicione a linha:

```env
ADMIN_PASSWORD=sua_senha_super_secreta_aqui
```

**Exemplo:**
```env
ADMIN_PASSWORD=CertDigital2024!
```

⚠️ **IMPORTANTE**: Use uma senha forte e segura!

## 🚀 Passo 2: Acessar o Painel

1. Inicie o servidor: `npm run dev`
2. Acesse http://localhost:3000/admin/pedidos
3. Você será redirecionado para http://localhost:3000/admin/login
4. Digite a senha que configurou no `.env.local`
5. Clique em "Acessar Painel"

## 🔑 Fluxo de Autenticação

```
1. Usuário acessa /admin/pedidos
   ↓
2. Middleware verifica cookie 'admin_auth'
   ↓
3. Se não tem cookie → redireciona para /admin/login
   ↓
4. Usuário digita senha
   ↓
5. API valida senha com ADMIN_PASSWORD
   ↓
6. Se correto → cria cookie e redireciona para /admin/pedidos
   ↓
7. Middleware permite acesso
```

## 🚪 Fazer Logout

- Clique no botão "Sair" no canto superior direito do painel
- Cookie será removido
- Você será redirecionado para `/admin/login`

## 🔒 Segurança

- ✅ Senha armazenada apenas em `.env.local` (não commitada)
- ✅ Cookie é `httpOnly` (não acessível via JavaScript)
- ✅ Cookie é `secure` em produção (HTTPS only)
- ✅ Sessão expira em 24 horas
- ✅ Middleware protege todas as rotas `/admin/*`

## 📱 Variáveis de Ambiente Necessárias

```env
# Obrigatório para login
ADMIN_PASSWORD=sua_senha_aqui

# Outros (já configurados)
MERCADO_PAGO_ACCESS_TOKEN=seu_token
NEXT_PUBLIC_BASE_URL=http://localhost:3000
GMAIL_USER=seu_email@gmail.com
GMAIL_PASSWORD=sua_senha_de_app
GMAIL_FROM_NAME=CertDigital
```

## 🚨 Troubleshooting

### "Senha incorreta"
- Verifique se digitou a senha corretamente
- Confirme que a variável `ADMIN_PASSWORD` está em `.env.local`
- Reinicie o servidor após alterar `.env.local`

### "Não consigo acessar o painel"
- Verifique se tem o cookie `admin_auth` no navegador
- Limpe os cookies e faça login novamente
- Tente em uma aba anônima

### "Logout não funciona"
- Verifique se JavaScript está habilitado
- Tente limpar cache do navegador
- Acesse `/admin/login` manualmente

## 💡 Dicas

- **Mude a senha regularmente** para maior segurança
- **Use uma senha forte** com números, letras e símbolos
- **Não compartilhe** a senha com ninguém
- **Em produção**, use HTTPS para maior segurança

## 🔄 Alterar Senha

Para alterar a senha:
1. Abra `.env.local`
2. Mude o valor de `ADMIN_PASSWORD`
3. Salve o arquivo
4. Reinicie o servidor (`npm run dev`)
5. Faça logout e login novamente

## 📚 Arquivos Relacionados

- `src/app/admin/login/page.tsx` - Página de login
- `src/app/api/admin/login/route.ts` - API de autenticação
- `src/app/api/admin/logout/route.ts` - API de logout
- `src/middleware.ts` - Proteção de rotas
- `src/app/admin/pedidos/page.tsx` - Painel protegido
