"use client"
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/translations'

export default function Hero() {
  const { lang } = useLanguage()
  const copy = t[lang]

  return (
    <section className="hero">
      <div className="hero-bg" />

      <div className="hero-left">
        <p className="h-kicker">{copy.hero.kicker}</p>
        <h1 className="h-name">
          {copy.hero.nameFirst}<br />
          <em>{copy.hero.nameLast}</em>
        </h1>
        <div className="h-rule" />
        <p className="h-sub">{copy.hero.sub}</p>
        <div className="h-cta">
          <a href="#tour" className="btn btn-g">{copy.hero.cta1}</a>
          <a href="#media" className="btn-ghost">{copy.hero.cta2}</a>
        </div>
      </div>

      <div className="hero-right">
        <div className="h-portrait">

          {/* Decorative violin strings — behind photo */}
          <svg
            className="h-strings"
            viewBox="0 0 500 800"
            preserveAspectRatio="xMidYMid slice"
            style={{ zIndex: 0 }}
          >
            <line x1="100" y1="0" x2="80" y2="800" stroke="rgba(198,168,75,.07)" strokeWidth=".5" />
            <line x1="190" y1="0" x2="170" y2="800" stroke="rgba(198,168,75,.05)" strokeWidth=".5" />
            <line x1="280" y1="0" x2="260" y2="800" stroke="rgba(198,168,75,.07)" strokeWidth=".5" />
            <line x1="370" y1="0" x2="350" y2="800" stroke="rgba(198,168,75,.05)" strokeWidth=".5" />
            <ellipse cx="250" cy="400" rx="80" ry="120" fill="none" stroke="rgba(198,168,75,.06)" strokeWidth=".5" />
            <ellipse cx="250" cy="400" rx="48" ry="72" fill="none" stroke="rgba(198,168,75,.04)" strokeWidth=".5" />
          </svg>

          {/* Artist photo — fills the portrait frame */}
          <Image
            src="/images/mahdi.jpeg"
            alt="Mahdi Dhaker — Violinist"
            fill
            priority
            sizes="(max-width: 860px) 92vw, 45vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
              zIndex: 1,
              opacity: 0.92,
            }}
          />

        </div>
      </div>

      <span className="vert-lbl">{copy.hero.season}</span>
      <div className="h-scroll">
        <div className="s-bar" />
        {copy.hero.scroll}
      </div>
    </section>
  )
}