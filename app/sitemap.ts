import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const sitemapBaseUrl = 'https://troelslund.dk';
const buildTime = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${sitemapBaseUrl}/`,
      lastModified: buildTime,
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${sitemapBaseUrl}/about`,
      lastModified: buildTime,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${sitemapBaseUrl}/projects`,
      lastModified: buildTime,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${sitemapBaseUrl}/blog`,
      lastModified: buildTime,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];
}
