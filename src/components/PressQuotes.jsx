"use client"
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/translations'

export default function PressQuotes() {
  const { lang } = useLanguage()
  const quotes = t[lang].press.quotes

  return (
    <div className="press">
      <div className="p-track">
        {[...quotes, ...quotes].map((q, i) => (
          <div className="p-quote" key={i}>
            <blockquote>&ldquo;{q.text}&rdquo;</blockquote>
            <cite>{q.source}</cite>
          </div>
        ))}
      </div>
    </div>
  )
}
