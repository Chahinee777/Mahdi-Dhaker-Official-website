"use client"
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/translations'

const PlayIcon = () => (
  <svg width="14" height="16" viewBox="0 0 14 16">
    <polygon points="0,0 14,8 0,16" />
  </svg>
)

export default function Discography() {
  const { lang } = useLanguage()
  const copy = t[lang].discography
  const albums = copy.albums

  return (
    <section id="discography">
      <div className="s-inner">
        <div className="s-label rev">{copy.label}</div>
        <h2 className="s-title rev d1">{copy.title}</h2>
        <div className="disco">
          {albums.map((a, i) => (
            <div className={`album rev d${i + 1}`} key={i}>
              <div className={`alb-art ${a.bg}`}>
                <div className="alb-ph"><span>{a.num}</span></div>
                <div className="alb-ov">
                  <div className="alb-play"><PlayIcon /></div>
                </div>
              </div>
              <div className="alb-info">
                <div className="alb-name">{a.title}</div>
                <div className="alb-meta">{a.meta}</div>
                <div className="alb-label">{a.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
