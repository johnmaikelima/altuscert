import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PEDIDOS_FILE = path.join(process.cwd(), 'data', 'pedidos.json');

// Garantir que o diretório existe
function ensureDataDir() {
  const dir = path.dirname(PEDIDOS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Ler pedidos
function lerPedidos() {
  ensureDataDir();
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

// Salvar pedidos
function salvarPedidos(pedidos: any[]) {
  ensureDataDir();
  fs.writeFileSync(PEDIDOS_FILE, JSON.stringify(pedidos, null, 2));
}

// Gerar código único de pedido
function gerarCodigoPedido() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CERT-${timestamp}-${random}`;
}

export async function GET(request: NextRequest) {
  try {
    const pedidos = lerPedidos();
    return NextResponse.json(pedidos);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar pedidos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tipo, preco, cliente, mercadoPagoId, status } = body;

    const codigoPedido = gerarCodigoPedido();
    const pedidos = lerPedidos();

    const novoPedido = {
      id: codigoPedido,
      tipo,
      preco,
      cliente,
      mercadoPagoId,
      status: status || 'pendente',
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    };

    pedidos.push(novoPedido);
    salvarPedidos(pedidos);

    return NextResponse.json(novoPedido, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return NextResponse.json({ error: 'Erro ao criar pedido' }, { status: 500 });
  }
}
