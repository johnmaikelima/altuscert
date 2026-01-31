import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/produtos/a1-pj`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/produtos/a1-pf`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/seja-parceiro`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/renovacao`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/formas-pagamento`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/minha-conta`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/politica-privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/politica-trocas-devolucoes`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/politica-cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
