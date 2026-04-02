export default function sitemap() {
  return [
    {
      url: 'https://mahdi-dhaker-official-website.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://mahdi-dhaker-official-website.vercel.app/bio',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
