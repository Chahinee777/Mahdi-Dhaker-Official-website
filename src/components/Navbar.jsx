'use client'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/translations'

export default function Navbar() {
  const { lang, setLang } = useLanguage()
  const copy = t[lang]
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['about', 'tour', 'discography', 'media', 'contact']

    const onScroll = () => {
      const scrollY = window.scrollY + 120
      let current = ''
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.offsetTop <= scrollY) current = id
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className={`mob-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#about" onClick={closeMenu}>{copy.nav.about}</a>
        <a href="#tour" onClick={closeMenu}>{copy.nav.tourDates}</a>
        <a href="#discography" onClick={closeMenu}>{copy.nav.discography}</a>
        <a href="#media" onClick={closeMenu}>{copy.nav.media}</a>
        <a href="#contact" onClick={closeMenu}>{copy.nav.contact}</a>
      </div>

      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="nav-grad" />
        <a href="#" className="nav-logo">Mahdi <b>Dhaker</b></a>
        <ul className="nav-links">
          {[
            { id: 'about', label: copy.nav.about },
            { id: 'tour', label: copy.nav.tour },
            { id: 'discography', label: copy.nav.discography },
            { id: 'media', label: copy.nav.media },
          ].map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={activeSection === id ? 'active' : ''}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className={`nav-cta${activeSection === 'contact' ? ' active' : ''}`}>
              {copy.nav.book}
            </a>
          </li>
        </ul>
        <div className="nav-actions">
          <div className="lang-switch" aria-label="Language switcher">
            {[
              { code: 'en', label: 'EN' },
              { code: 'fr', label: 'FR' },
              { code: 'ar', label: 'AR' },
            ].map(({ code, label }) => (
              <button
                key={code}
                type="button"
                className={lang === code ? 'active' : ''}
                onClick={() => setLang(code)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </div>
        </div>
      </nav>
    </>
  )
}