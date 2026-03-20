import Link from 'next/link'

export const metadata = {
  title: '404 — Page Not Found | Mahdi Dhaker Official',
}

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--black)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      textAlign: 'center',
      gap: '0',
    }}>
      <p style={{
        fontSize: '9px',
        letterSpacing: '.45em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
      }}>
        <span style={{ width: '26px', height: '1px', background: 'var(--gold)', display: 'inline-block' }} />
        Error 404
      </p>

      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(80px, 15vw, 180px)',
        fontWeight: '300',
        lineHeight: '1',
        color: 'var(--gold)',
        opacity: '.15',
        marginBottom: '0',
      }}>
        404
      </h1>

      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(28px, 4vw, 48px)',
        fontWeight: '300',
        fontStyle: 'italic',
        color: 'var(--cream)',
        margin: '24px 0 16px',
        lineHeight: '1.1',
      }}>
        This page has left the stage
      </h2>

      <p style={{
        fontSize: '13px',
        color: 'var(--muted)',
        letterSpacing: '.05em',
        maxWidth: '360px',
        lineHeight: '1.8',
        marginBottom: '48px',
      }}>
        The page you are looking for does not exist or has been moved.
      </p>

      <Link href="/" className="btn btn-g">
        Back to Home
      </Link>

      <div style={{
        marginTop: '80px',
        fontFamily: 'var(--font-serif)',
        fontSize: '18px',
        fontWeight: '300',
        letterSpacing: '.08em',
        color: 'var(--muted)',
        opacity: '.4',
      }}>
        Mahdi <span style={{ color: 'var(--gold)' }}>Dhaker</span>
      </div>
    </div>
  )
}
