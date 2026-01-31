import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { senha } = body;

    const senhaAdmin = process.env.ADMIN_PASSWORD;

    if (!senhaAdmin) {
      return NextResponse.json(
        { error: 'Senha admin não configurada' },
        { status: 500 }
      );
    }

    if (senha !== senhaAdmin) {
      return NextResponse.json(
        { error: 'Senha incorreta' },
        { status: 401 }
      );
    }

    // Criar resposta com cookie de sessão
    const response = NextResponse.json({
      success: true,
      message: 'Login realizado com sucesso',
    });

    // Definir cookie de autenticação (válido por 24 horas)
    response.cookies.set('admin_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 horas
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer login' },
      { status: 500 }
    );
  }
}
