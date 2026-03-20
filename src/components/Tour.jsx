'use client'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/translations'

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="1" y1="1" x2="17" y2="17" />
    <line x1="17" y1="1" x2="1" y2="17" />
  </svg>
)

export default function Tour() {
  const { lang } = useLanguage()
  const copy = t[lang].tour
  const [filter, setFilter] = useState('all')
  const [showPast, setShowPast] = useState(false)
  const [posterOpen, setPosterOpen] = useState(false)
  const [posterFlipped, setPosterFlipped] = useState(false)

  const filtered = copy.upcoming.filter(c => filter === 'all' || c.cat === filter)
  const tagLabel = (cat) => copy.filters[cat] || cat

  return (
    <>
      {posterOpen && (
        <div
          onClick={() => {
            setPosterOpen(false)
            setPosterFlipped(false)
          }}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(8,7,5,.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn .3s ease',
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              setPosterOpen(false)
              setPosterFlipped(false)
            }}
            style={{
              position: 'absolute', top: '32px', right: '40px',
              background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--muted)', cursor: 'pointer',
              width: '44px', height: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all .3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
          >
            <CloseIcon />
          </button>

          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '90vw', maxWidth: '500px', perspective: '1200px',
            }}
          >
            <div
              onClick={() => setPosterFlipped(prev => !prev)}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '3 / 4',
                transformStyle: 'preserve-3d',
                transition: 'transform .6s ease',
                transform: posterFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  position: 'absolute', inset: 0,
                  backfaceVisibility: 'hidden',
                  border: '1px solid var(--gold)',
                  background: 'var(--deep)',
                }}
              >
                <img
                  src="/images/upcoming_concerts.jpeg"
                  alt={copy.posterAlt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              <div
                style={{
                  position: 'absolute', inset: 0,
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  border: '1px solid var(--gold)',
                  background: 'var(--deep)',
                  color: 'var(--cream)',
                  padding: '22px 20px',
                  overflowY: 'auto',
                }}
              >
                <div style={{ fontFamily: 'var(--font-serif), serif', color: 'var(--gold)', fontSize: '20px', marginBottom: '14px' }}>
                  VIOLIN OBSESSION
                </div>

                <p style={{ fontSize: '12px', lineHeight: '1.8', color: 'var(--muted)', marginBottom: '14px' }}>
                  A journey into the many faces of the violin-its fire, its voice, its soul. From brilliance and virtuosity to intimacy and reflection, this program explores the deep emotional connection between the performer and the instrument. Each work reveals a different shade of obsession: the pursuit of perfection, the intensity of expression, and the fragile beauty of sound.
                </p>

                <p style={{ fontSize: '12px', lineHeight: '1.8', color: 'var(--muted)', marginBottom: '16px' }}>
                  Through this musical arc, the violin becomes more than an instrument-it becomes a voice, a passion, and an inner world brought to life.
                </p>

                <p style={{ fontSize: '12px', lineHeight: '1.8', marginBottom: '2px' }}>🎻 VIOLIN OBSESSION</p>
                <p style={{ fontSize: '12px', lineHeight: '1.8', marginBottom: '10px', color: 'var(--muted)' }}>A journey through passion, virtuosity, and intimacy</p>

                <p style={{ fontSize: '12px', lineHeight: '1.8', marginBottom: '2px' }}>Mahdi Dhaker - Violin</p>
                <p style={{ fontSize: '12px', lineHeight: '1.8', marginBottom: '12px' }}>Lina Ammari - Piano</p>

                <p style={{ fontSize: '12px', lineHeight: '1.8', marginBottom: '2px' }}>📍 [ibn rachiq ]</p>
                <p style={{ fontSize: '12px', lineHeight: '1.8', marginBottom: '2px' }}>📅 24 April 2026</p>
                <p style={{ fontSize: '12px', lineHeight: '1.8', marginBottom: '14px' }}>🕗 [19h ]</p>

                <p style={{ fontSize: '12px', lineHeight: '1.8', color: 'var(--muted)', marginBottom: '4px' }}>Works by</p>
                <p style={{ fontSize: '12px', lineHeight: '1.8', marginBottom: '14px' }}>
                  Johann Sebastian Bach · Camille Saint-Saëns · Johannes Brahms · Edvard Grieg · Gabriel Fauré · Frédéric Chopin · Alexander Glazunov · Fritz Kreisler · Franz von Suppè · Vittorio Monti
                </p>

                <p style={{ fontSize: '12px', lineHeight: '1.8', color: 'var(--gold)' }}>⸻</p>
                <p style={{ fontSize: '12px', lineHeight: '1.8', fontStyle: 'italic' }}>✨ "The violin becomes a voice, a passion, an obsession."</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <section id="tour" className="tour-bg">
        <div className="s-inner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '44px' }}>
          <div>
            <div className="s-label rev">{copy.label}</div>
            <h2 className="s-title rev d1">{copy.title1}<br />{copy.title2}</h2>
          </div>
          <a href="#contact" className="btn-ghost rev d2">{copy.cta}</a>
        </div>

        <div className="tour-controls rev d2">
          <div className="f-tabs">
            {['all', 'solo', 'chamber'].map(f => (
              <button
                key={f}
                className={`f-tab ${filter === f ? 'on' : ''}`}
                onClick={() => setFilter(f)}
              >
                {copy.filters[f]}
              </button>
            ))}
          </div>
          <button
            className={`past-btn ${showPast ? 'open' : ''}`}
            onClick={() => setShowPast(!showPast)}
          >
            <span>{copy.pastToggle}</span>
            <span className="arr">▼</span>
          </button>
        </div>

        <ul className="t-list" id="t-list">
          {filtered.map((c, i) => (
            <li className="t-item" key={i} data-c={c.cat}>
              <div className="t-date">{c.date}<small>{c.month}</small></div>
              <div>
                <div className="t-city">{c.city}</div>
                <div className="t-venue">{c.venue}</div>
                {c.time && <div className="t-venue">{copy.timeLabel}: {c.time}</div>}
                {c.title && <div className="t-prog"><b>{c.title}</b></div>}
                {c.subtitle && <div className="t-prog">{c.subtitle}</div>}
                <div className="t-prog">{copy.programmeLabel}: {c.prog}</div>
                {c.with && <div className="t-prog">{copy.withLabel}: {c.with}</div>}
              </div>
              <span className="t-tag">{tagLabel(c.cat)}</span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                {c.ticket
                  ? <a href="/tickets" className="t-tkt">{copy.tickets}</a>
                  : <span className="t-tkt sold">{copy.soldOut}</span>
                }
                <button type="button" className="t-poster" onClick={() => { setPosterOpen(true); setPosterFlipped(false) }}>
                  {copy.poster}
                </button>
              </div>
            </li>
          ))}
        </ul>

        {showPast && (
          <div className="past-sec vis">
            <div className="past-hdg">{copy.pastTitle}</div>
            <ul className="t-list">
              {copy.past.map((c, i) => (
                <li className="t-item past" key={i}>
                  <div className="t-date">{c.date}<small>{c.month}</small></div>
                  <div>
                    <div className="t-city">{c.city}</div>
                    <div className="t-venue">{c.venue}</div>
                    <div className="t-prog">{copy.programmeLabel}: {c.prog}</div>
                    {c.with && <div className="t-prog">{copy.withLabel}: {c.with}</div>}
                  </div>
                  <span className="t-tag">{tagLabel(c.cat)}</span>
                  <span className="t-tkt sold">{copy.completed}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      </section>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </>
  )
}
