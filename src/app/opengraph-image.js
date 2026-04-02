import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Mahdi Dhaker — Violinist'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#080705',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 100px',
          position: 'relative',
        }}
      >
        {/* Gold top border */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: '#c6a84b',
        }} />

        {/* Gold bottom border */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '2px',
          background: '#c6a84b',
        }} />

        {/* Decorative left accent */}
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: '2px',
          background: '#c6a84b',
        }} />

        {/* Eyebrow */}
        <div style={{
          fontSize: '14px',
          letterSpacing: '6px',
          textTransform: 'uppercase',
          color: '#c6a84b',
          marginBottom: '36px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{ width: '32px', height: '1px', background: '#c6a84b' }} />
          International Violinist · Tunis
        </div>

        {/* Name */}
        <div style={{
          fontSize: '110px',
          fontWeight: '300',
          color: '#ede5d0',
          lineHeight: '0.88',
          letterSpacing: '-1px',
        }}>
          Mahdi
        </div>
        <div style={{
          fontSize: '110px',
          fontWeight: '300',
          fontStyle: 'italic',
          color: '#c6a84b',
          lineHeight: '1',
          letterSpacing: '-1px',
        }}>
          Dhaker
        </div>

        {/* Divider */}
        <div style={{
          width: '60px',
          height: '1px',
          background: '#c6a84b',
          margin: '36px 0',
        }} />

        {/* Subtitle */}
        <div style={{
          fontSize: '18px',
          color: '#7a7264',
          letterSpacing: '2px',
        }}>
          mahdi-dhaker-official-website.vercel.app
        </div>
      </div>
    ),
    { ...size }
  )
}