import { Cormorant_Garamond, Noto_Naskh_Arabic, Raleway } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '600'],
  variable: '--font-arabic',
  display: 'swap',
})

export const metadata = {
  title: 'Mahdi Dhaker Official — Violinist',
  description:
    'International Professional Violinist from Tunis. Member of the Orchestre des Jeunes de la Méditerranée and El Sistema. Performed under Sir Simon Rattle.',
  keywords: [
    'Mahdi Dhaker', 'violinist', 'Tunisia', 'classical violin',
    'Orchestre des Jeunes de la Méditerranée', 'concert',
  ],
  authors: [{ name: 'Mahdi Dhaker' }],
  openGraph: {
    title: 'Mahdi Dhaker Official — Violinist',
    description: 'International Professional Violinist from Tunis. Performing across Europe and the Arab world.',
    url: 'https://mahdi-dhaker-official-website.vercel.app',
    siteName: 'Mahdi Dhaker Official',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Mahdi Dhaker — Violinist' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahdi Dhaker Official — Violinist',
    description: 'International Professional Violinist from Tunis.',
    images: ['/og-image.jpg'],
  },
  icons: { icon: '/favicon.svg' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${cormorant.variable} ${raleway.variable} ${notoNaskhArabic.variable}`}
    >
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
