'use client'
import Link from 'next/link'
import Cursor from '@/components/Cursor'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/translations'

export default function BioPageContent() {
  const { lang } = useLanguage()
  const copy = t[lang].bioPage

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <Cursor />

      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '24px 64px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(8,7,5,.9)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border)',
      }}>
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

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '160px 64px 120px' }}>
        <p style={{
          fontSize: '9px', letterSpacing: '.45em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: '24px',
          display: 'flex', alignItems: 'center', gap: '14px',
        }}>
          <span style={{ width: '26px', height: '1px', background: 'var(--gold)', display: 'inline-block' }} />
          {copy.label}
        </p>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(44px, 6vw, 80px)',
          fontWeight: '300', lineHeight: '1.0',
          marginBottom: '60px',
        }}>
          {copy.titleFirst}<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{copy.titleLast}</em>
        </h1>

        <div style={{ height: '1px', background: 'var(--border)', marginBottom: '60px' }} />

        <div style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '15px', lineHeight: '2',
          color: 'var(--muted)',
          display: 'flex', flexDirection: 'column', gap: '28px',
        }}>
          {copy.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div style={{ height: '1px', background: 'var(--border)', margin: '60px 0' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
          {copy.facts.map((f, i) => (
            <div key={i}>
              <div style={{ fontSize: '9px', letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px' }}>
                {f.label}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--cream)', lineHeight: '1.6' }}>{f.val}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '64px' }}>
          <Link href="/#contact" className="btn btn-g">{copy.cta}</Link>
        </div>
      </div>
    </div>
  )
}
