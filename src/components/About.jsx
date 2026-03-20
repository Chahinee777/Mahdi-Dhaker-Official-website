"use client"
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/translations'

export default function About() {
  const { lang } = useLanguage()
  const copy = t[lang]

  return (
    <section id="about">
      <div className="s-inner about-grid">
        <div>
          <div className="s-label rev">{copy.about.label}</div>
          <h2 className="s-title rev d1">
            {copy.about.title1}<br />{copy.about.title2} <em>{copy.about.titleEm}</em>
          </h2>
          <div className="stats rev d2">
            <div className="stat">
              <div className="stat-n">10+</div>
              <div className="stat-l">{copy.about.stats.countries}</div>
            </div>
            <div className="stat">
              <div className="stat-n">50+</div>
              <div className="stat-l">{copy.about.stats.concerts}</div>
            </div>
            <div className="stat">
              <div className="stat-n">2</div>
              <div className="stat-l">{copy.about.stats.orchestras}</div>
            </div>
            <div className="stat">
              <div className="stat-n">8</div>
              <div className="stat-l">{copy.about.stats.years}</div>
            </div>
          </div>
        </div>

        <div className="bio rev d2">
          {copy.about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div style={{ marginTop: '32px', display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
            <a href="/bio" className="btn-ghost">{copy.about.cta}</a>
            <a href="/repertoire" className="btn-ghost">{copy.about.repertoireCta}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
