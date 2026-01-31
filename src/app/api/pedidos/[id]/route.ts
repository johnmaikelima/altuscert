import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PEDIDOS_FILE = path.join(process.cwd(), 'data', 'pedidos.json');

function lerPedidos() {
  try {
    if (fs.existsSync(PEDIDOS_FILE)) {
      const data = fs.readFileSync(PEDIDOS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Erro ao ler pedidos:', error);
  }
  return [];
}

function salvarPedidos(pedidos: any[]) {
  const dir = path.dirname(PEDIDOS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(PEDIDOS_FILE, JSON.stringify(pedidos, null, 2));
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pedidos = lerPedidos();
    const pedido = pedidos.find((p: any) => p.id === id);

    if (!pedido) {
      return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 });
    }

    return NextResponse.json(pedido);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar pedido' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const pedidos = lerPedidos();
    const index = pedidos.findIndex((p: any) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 });
    }

    pedidos[index] = {
      ...pedidos[index],
      ...body,
      dataAtualizacao: new Date().toISOString(),
    };

    salvarPedidos(pedidos);

    return NextResponse.json(pedidos[index]);
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    return NextResponse.json({ error: 'Erro ao atualizar pedido' }, { status: 500 });
  }
}
