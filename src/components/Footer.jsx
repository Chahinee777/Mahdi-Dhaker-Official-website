"use client"
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/translations'

export default function Footer() {
  const { lang } = useLanguage()
  const copy = t[lang].footer

  const devStyle = {
    fontSize: '10px',
    color: 'var(--muted)',
    letterSpacing: '.05em',
    textDecoration: 'none',
    transition: 'color .3s',
  }

  return (
    <footer>
      <div className="f-top">
        <div>
          <div className="f-logo">Mahdi <b>Dhaker</b></div>
          <div className="f-tag">{copy.tagline}</div>
        </div>
        <div className="f-col">
          <h4>{copy.navTitle}</h4>
          <ul>
            <li><a href="#about">{copy.nav.about}</a></li>
            <li><a href="#tour">{copy.nav.tour}</a></li>
            <li><a href="#discography">{copy.nav.discography}</a></li>
            <li><a href="#media">{copy.nav.media}</a></li>
          </ul>
        </div>
        <div className="f-col">
          <h4>{copy.connectTitle}</h4>
          <ul>
            <li><a href="https://www.instagram.com/mahdi_dhaker_/" target="_blank" rel="noreferrer">{copy.connect.instagram}</a></li>
            <li><a href="https://www.facebook.com/mehdi.dhaker.7" target="_blank" rel="noreferrer">{copy.connect.facebook}</a></li>
            <li><a href="https://www.youtube.com/@mahdidhaker1" target="_blank" rel="noreferrer">{copy.connect.youtube}</a></li>
            <li><a href="https://open.spotify.com/artist/5QVn8fJ4J5K5J5K5J5K5J5" target="_blank" rel="noreferrer">{copy.connect.spotify}</a></li>
          </ul>
        </div>
        <div className="f-col">
          <h4>{copy.proTitle}</h4>
          <ul>
            <li><a href="#contact">{copy.pro.booking}</a></li>
            <li><a href="#contact">{copy.pro.pressKit}</a></li>
            <li><a href="#contact">{copy.pro.enquiries}</a></li>
            <li><a href="/repertoire">{copy.pro.repertoire}</a></li>
          </ul>
        </div>
      </div>
      <div className="f-bot">
        <p className="f-copy">{copy.copy}</p>
        <p className="f-cred">{copy.cred}</p>
        <a href="https://github.com/Chahinee777" target="_blank" rel="noreferrer" style={devStyle}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)' }}>
          {copy.dev}
        </a>
      </div>
    </footer>
  )
}