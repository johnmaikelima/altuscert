import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Proteger rotas do painel admin (exceto login)
  if (pathname.startsWith('/admin/pedidos')) {
    const authCookie = request.cookies.get('admin_auth');

    if (!authCookie) {
      // Redirecionar para login se não autenticado
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
