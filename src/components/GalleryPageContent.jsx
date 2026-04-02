'use client'
import Link from 'next/link'
import Cursor from '@/components/Cursor'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/translations'
import styles from '@/app/gallery/gallery.module.css'

export default function GalleryPageContent() {
  const { lang } = useLanguage()
  const copy = t[lang].galleryPage
  const images = Array.from({ length: 22 }, (_, i) => i + 1)

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <Cursor />

      <div className={styles['rep-mini-nav']}>
        <Link href="/" style={{
          fontFamily: 'var(--font-serif)', fontSize: '17px',
          letterSpacing: '.13em', color: 'var(--cream)', textDecoration: 'none',
        }}>
          Mahdi <b style={{ color: 'var(--gold)', fontWeight: 400 }}>Dhaker</b>
        </Link>
        <Link href="/" style={{
          fontSize: '10px', letterSpacing: '.24em', textTransform: 'uppercase',
          color: 'var(--muted)', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{ width: '20px', height: '1px', background: 'currentColor', display: 'inline-block' }} />
          {copy.back}
        </Link>
      </div>

      <div className={styles['rep-wrap']}>
        <p className={styles['rep-head-label']}>
          <span className={styles['rep-head-line']} />
          {copy.label}
        </p>

        <h1 className={styles['rep-title']}>{copy.title}</h1>

        <p className={styles['rep-sub']}>{copy.subtitle}</p>

        <div className={styles['rep-divider']} />

        <section className={styles['gal-wrap']}>
          <div className={styles['gal-grid']}>
            {images.map((n) => (
              <div className={styles['gal-item']} key={n}>
                <img
                  src={`/images/Gallery/${n}.jpeg`}
                  alt={`${copy.imageAlt} ${n}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        <div className={styles['gal-note']}>
          <p>{copy.note}</p>
        </div>
      </div>
    </div>
  )
}
