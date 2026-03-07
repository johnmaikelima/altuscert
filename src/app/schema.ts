export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CertDigital',
  description: 'Emissão de certificados digitais A1 PJ e A1 PF',
  url: 'http://localhost:3000',
  logo: 'http://localhost:3000/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    telephone: '+55-11-98775-6034',
    areaServed: 'BR',
  },
};

export const productSchemaA1PJ = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Certificado A1 PJ',
  description: 'Certificado digital A1 para Pessoas Jurídicas',
  brand: {
    '@type': 'Brand',
    name: 'CertDigital',
  },
  offers: {
    '@type': 'Offer',
    url: 'http://localhost:3000/checkout?tipo=a1-pj',
    priceCurrency: 'BRL',
    price: '89.90',
    availability: 'https://schema.org/InStock',
  },
};

export const productSchemaA1PF = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Certificado A1 PF',
  description: 'Certificado digital A1 para Pessoas Físicas',
  brand: {
    '@type': 'Brand',
    name: 'CertDigital',
  },
  offers: {
    '@type': 'Offer',
    url: 'http://localhost:3000/checkout?tipo=a1-pf',
    priceCurrency: 'BRL',
    price: '85.00',
    availability: 'https://schema.org/InStock',
  },
};
