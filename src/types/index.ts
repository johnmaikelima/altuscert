export interface Certificado {
  id: string;
  tipo: 'a1-pj' | 'a1-pf';
  nome: string;
  descricao: string;
  preco: number;
  features: string[];
}

export interface Cliente {
  nome: string;
  email: string;
  telefone: string;
  cpf_cnpj: string;
}

export interface Pedido {
  id: string;
  cliente: Cliente;
  certificado: Certificado;
  status: 'pendente' | 'processando' | 'confirmado' | 'erro';
  data_criacao: Date;
  data_pagamento?: Date;
}
