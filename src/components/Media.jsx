'use client'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/translations'

const PlayIcon = () => (
  <svg width="14" height="16" viewBox="0 0 14 16">
    <polygon points="0,0 14,8 0,16" />
  </svg>
)

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="1" y1="1" x2="17" y2="17" />
    <line x1="17" y1="1" x2="1" y2="17" />
  </svg>
)

export default function Media() {
  const { lang } = useLanguage()
  const copy = t[lang].media
  const videos = copy.videos
  const [active, setActive] = useState(null)

  const open = (id) => setActive(id)
  const close = () => setActive(null)

  return (
    <>
      {/* Lightbox */}
      {active && (
        <div
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(8,7,5,.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn .3s ease',
          }}
        >
          {/* Close button */}
          <button
            onClick={close}
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

          {/* YouTube iframe */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '90vw', maxWidth: '1100px',
              aspectRatio: '16/9',
              border: '1px solid var(--border)',
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${active}?autoplay=1&rel=0&modestbranding=1`}
              title="Mahdi Dhaker — Violin Performance"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </div>
        </div>
      )}

      <section id="media" style={{ background: 'var(--deep)' }}>
        <div className="s-inner">
          <div className="s-label rev">{copy.label}</div>
          <h2 className="s-title rev d1">{copy.title}</h2>

          <div className="m-grid" style={{ marginTop: '52px' }}>
            {/* Featured card — spans both rows */}
            <div
              className={`mc ${videos[0].bg} rev`}
              style={{ gridRow: '1 / 3', cursor: 'pointer' }}
              onClick={() => open(videos[0].id)}
            >
              {/* YouTube thumbnail as background */}
              <img
                src={`https://img.youtube.com/vi/${videos[0].id}/maxresdefault.jpg`}
                alt={videos[0].title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .55 }}
              />
              <div className="mc-play"><PlayIcon /></div>
              <div className="mc-in">
                <div className="mc-tag">{videos[0].tag}</div>
                <div className="mc-ttl">{videos[0].title}</div>
                <div className="mc-dur" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--gold)"><path d="M19.59 12l-8.6-8.6A2 2 0 008 5v14a2 2 0 003 1.6l8.59-8.6z"/></svg>
                  {copy.watchOn}
                </div>
              </div>
            </div>

            {/* Cards 2 & 3 */}
            {videos.slice(1).map((v, i) => (
              <div
                key={v.id}
                className={`mc ${v.bg} rev d${i + 1}`}
                style={{ cursor: 'pointer' }}
                onClick={() => open(v.id)}
              >
                <img
                  src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                  alt={v.title}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .5 }}
                />
                <div className="mc-play"><PlayIcon /></div>
                <div className="mc-in">
                  <div className="mc-tag">{v.tag}</div>
                  <div className="mc-ttl">{v.title}</div>
                  <div className="mc-dur" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--gold)"><path d="M19.59 12l-8.6-8.6A2 2 0 008 5v14a2 2 0 003 1.6l8.59-8.6z"/></svg>
                    {copy.watchOn}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* YouTube channel link */}
          <div style={{ marginTop: '36px', display: 'flex', justifyContent: 'flex-end' }}>
            <a
              href="https://www.youtube.com/@mahdidhaker1"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              {copy.viewChannel}
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </>
  )
}
