import { NextResponse } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://altuscertificados.com.br';

const products = [
  {
    id: 'a1-pj',
    title: 'Certificado Digital A1 - Pessoa Jurídica (PJ)',
    description: 'Certificado digital A1 para pessoa jurídica emitido por videoconferência. Válido por 12 meses, ideal para empresas que precisam assinar documentos digitalmente e realizar transações seguras. Emissão online com validação por vídeo conferência.',
    link: `${baseUrl}/produtos/a1-pj`,
    imageLink: `${baseUrl}/img/certificadopj.jpeg`,
    price: '115.00',
    currency: 'BRL',
    availability: 'in stock',
    category: 'Services > Digital Products',
    brand: 'Altus Certificados',
    condition: 'new',
    gtin: '',
    mpn: ''
  },
  {
    id: 'a1-pf',
    title: 'Certificado Digital A1 - Pessoa Física (PF)',
    description: 'Certificado digital A1 para pessoa física emitido por videoconferência. Válido por 12 meses, ideal para profissionais autônomos que precisam assinar documentos digitalmente e realizar transações seguras. Emissão online com validação por vídeo conferência.',
    link: `${baseUrl}/produtos/a1-pf`,
    imageLink: `${baseUrl}/img/certificadopf.jpeg`,
    price: '99.00',
    currency: 'BRL',
    availability: 'in stock',
    category: 'Services > Digital Products',
    brand: 'Altus Certificados',
    condition: 'new',
    gtin: '',
    mpn: ''
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'xml';

  if (format === 'csv') {
    return generateCSVFeed();
  } else {
    return generateXMLFeed();
  }
}

function generateXMLFeed() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n';
  xml += '  <channel>\n';
  xml += `    <title>Altus Certificados - Produtos</title>\n`;
  xml += `    <link>${baseUrl}</link>\n`;
  xml += `    <description>Certificados Digitais A1</description>\n`;

  products.forEach(product => {
    xml += '    <item>\n';
    xml += `      <g:id>${product.id}</g:id>\n`;
    xml += `      <title>${escapeXml(product.title)}</title>\n`;
    xml += `      <description>${escapeXml(product.description)}</description>\n`;
    xml += `      <link>${product.link}</link>\n`;
    xml += `      <g:image_link>${product.imageLink}</g:image_link>\n`;
    xml += `      <g:price>${product.price} ${product.currency}</g:price>\n`;
    xml += `      <g:availability>${product.availability}</g:availability>\n`;
    xml += `      <g:product_type>${product.category}</g:product_type>\n`;
    xml += `      <g:brand>${product.brand}</g:brand>\n`;
    xml += `      <g:condition>${product.condition}</g:condition>\n`;
    xml += '    </item>\n';
  });

  xml += '  </channel>\n';
  xml += '</rss>';

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Content-Disposition': 'attachment; filename="products-feed.xml"'
    }
  });
}

function generateCSVFeed() {
  let csv = 'id,title,description,link,image_link,price,currency,availability,product_type,brand,condition\n';

  products.forEach(product => {
    csv += `"${product.id}","${escapeCsv(product.title)}","${escapeCsv(product.description)}","${product.link}","${product.imageLink}","${product.price}","${product.currency}","${product.availability}","${product.category}","${product.brand}","${product.condition}"\n`;
  });

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="products-feed.csv"'
    }
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeCsv(str: string): string {
  return str.replace(/"/g, '""');
}
