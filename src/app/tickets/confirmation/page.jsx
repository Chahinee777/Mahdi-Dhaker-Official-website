'use client'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './confirmation.module.css'
import Cursor from '@/components/Cursor'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/translations'
import {
  getBooking,
  buildShareText,
  generateBookingReference,
} from '@/lib/tickets'

export default function ConfirmationPage() {
  const { lang } = useLanguage()
  const copy = t[lang].tickets.confirmation
  const common = t[lang].tickets
  const router = useRouter()
  const [booking, setBooking] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const saved = getBooking()
    if (!saved) {
      router.replace('/tickets')
      return
    }
    setBooking({
      ...saved,
      reference: saved.reference || generateBookingReference(),
    })
  }, [router])

  const total = useMemo(() => booking?.order?.total || 0, [booking])

  const downloadTicketPdf = async () => {
    if (!booking) return

    const { PDFDocument, rgb } = await import('pdf-lib')
    const { StandardFonts }    = await import('pdf-lib')
    const QRCode               = await import('qrcode')

    const pdfDoc = await PDFDocument.create()

    // ── PAGE ──
    const W = 620
    const H = 960
    const page = pdfDoc.addPage([W, H])

    // ── COLORS ──
    const BLACK    = rgb(0.031, 0.027, 0.020)
    const DEEP     = rgb(0.059, 0.055, 0.043)
    const GOLD     = rgb(0.776, 0.659, 0.294)
    const CREAM    = rgb(0.929, 0.898, 0.816)
    const MUTED    = rgb(0.478, 0.447, 0.392)

    // ── FONTS ──
    const serif     = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    const serifBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
    const serifItal = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic)
    const mono      = await pdfDoc.embedFont(StandardFonts.Courier)

    // ── HELPERS ──
    const txt = (str, x, y, opts = {}) => {
      const {
        size = 11, font = serif,
        color = CREAM, align = 'left',
      } = opts
      const s = String(str || '')
      if (!s) return
      let dx = x
      if (align === 'center') dx = x - font.widthOfTextAtSize(s, size) / 2
      if (align === 'right')  dx = x - font.widthOfTextAtSize(s, size)
      page.drawText(s, { x: dx, y, size, font, color })
    }

    const box = (x, y, w, h, opts = {}) =>
      page.drawRectangle({
        x, y, width: w, height: h,
        color: opts.fill,
        borderColor: opts.border,
        borderWidth: opts.bw || 0,
        opacity: opts.opacity ?? 1,
      })

    const ln = (x1, y1, x2, y2, opts = {}) =>
      page.drawLine({
        start: { x: x1, y: y1 }, end: { x: x2, y: y2 },
        color: opts.color || GOLD,
        thickness: opts.t || 0.5,
        opacity: opts.opacity ?? 0.3,
      })

    // ── BACKGROUND ──
    box(0, 0, W, H, { fill: BLACK })

    // ── OUTER BORDER ──
    box(24, 24, W - 48, H - 48, { border: GOLD, bw: 0.5 })

    // ── CORNER ACCENTS ──
    const corners = [
      [24, H - 24, 1, -1],
      [W - 24, H - 24, -1, -1],
      [24, 24, 1, 1],
      [W - 24, 24, -1, 1],
    ]
    corners.forEach(([cx, cy, dx, dy]) => {
      box(cx, cy, dx * 30, 1, { fill: GOLD, opacity: 1 })
      box(cx, cy, 1, dy * 30, { fill: GOLD, opacity: 1 })
    })

    // ── HEADER BAND ──
    box(24, H - 112, W - 48, 88, { fill: DEEP })
    ln(24, H - 112, W - 24, H - 112, { opacity: 0.4 })

    txt('OFFICIAL TICKET · MAHDI DHAKER', W / 2, H - 56, {
      size: 8, font: serif, color: GOLD, align: 'center',
    })
    txt(booking?.event?.title || 'Violin Obsession', W / 2, H - 84, {
      size: 28, font: serifBold, color: CREAM, align: 'center',
    })

    // ── SUBTITLE ──
    txt(
      `— ${booking?.event?.subtitle || 'A journey through passion, virtuosity, and intimacy'} —`,
      W / 2, H - 136,
      { size: 10, font: serifItal, color: MUTED, align: 'center' }
    )

    ln(56, H - 156, W - 56, H - 156, { opacity: 0.4 })

    // ── EVENT DETAILS — 3 COLUMNS ──
    const dY = H - 212
    const c1 = 80, c2 = W / 2, c3 = W - 80
    const lbl = { size: 7.5, font: serif, color: GOLD }
    const val = { size: 11, font: serifBold, color: CREAM }
    const sub = { size: 9, font: serif, color: MUTED }

    txt('DATE',      c1, dY + 18, lbl)
    txt('24 April 2026', c1, dY, val)
    txt('19:00',     c1, dY - 16, sub)

    txt('VENUE',     c2, dY + 18, { ...lbl, align: 'center' })
    txt('Maison de la Culture', c2, dY, { ...val, align: 'center' })
    txt('Ibn Rachiq · Tunis', c2, dY - 16, { ...sub, align: 'center' })

    txt('PERFORMERS', c3, dY + 18, { ...lbl, align: 'right' })
    txt('Mahdi Dhaker', c3, dY, { ...val, align: 'right' })
    txt('Lina Ammari — Piano', c3, dY - 16, { ...sub, align: 'right' })

    ln(c2 - 80, dY + 22, c2 - 80, dY - 20, { opacity: 0.15 })
    ln(c2 + 80, dY + 22, c2 + 80, dY - 20, { opacity: 0.15 })

    ln(56, dY - 34, W - 56, dY - 34, { opacity: 0.2 })

    // ── PROGRAMME ──
    const pY = H - 304
    txt('PROGRAMME', W / 2, pY + 18, { ...lbl, align: 'center' })

    const prog = booking?.event?.programme ||
      'Bach · Saint-Saëns · Brahms · Grieg · Fauré · Chopin · Glazunov · Kreisler · Suppè · Monti'
    const progMaxW = W - 160
    const progWords = prog.split(' ')
    const progLines = []
    let cur = ''
    for (const w of progWords) {
      const test = cur ? `${cur} ${w}` : w
      if (serifItal.widthOfTextAtSize(test, 10) > progMaxW) {
        if (cur) progLines.push(cur)
        cur = w
      } else { cur = test }
    }
    if (cur) progLines.push(cur)
    progLines.slice(0, 3).forEach((l, i) =>
      txt(l, W / 2, pY - 2 - i * 16, {
        size: 10, font: serifItal, color: MUTED, align: 'center',
      })
    )

    ln(56, pY - 56, W - 56, pY - 56, { opacity: 0.2 })

    // ── REFERENCE BOX ──
    const refY = H - 432
    box(56, refY, W - 112, 60, { fill: DEEP, border: GOLD, bw: 0.5 })
    txt('BOOKING REFERENCE', W / 2, refY + 44, {
      size: 7.5, font: serif, color: GOLD, align: 'center',
    })
    txt(booking?.reference || 'MD-2026-0000', W / 2, refY + 18, {
      size: 18, font: mono, color: CREAM, align: 'center',
    })

    ln(56, refY - 16, W - 56, refY - 16, { opacity: 0.15 })

    // ── TICKET INFO ROW ──
    const tY = H - 510
    txt('TICKET TYPE', c1, tY + 14, lbl)
    txt('General Admission', c1, tY, val)
    txt('QUANTITY', c2, tY + 14, { ...lbl, align: 'center' })
    txt(String(booking?.order?.quantity || 1), c2, tY, { ...val, align: 'center' })
    txt('TOTAL PAID', c3, tY + 14, { ...lbl, align: 'right' })
    txt(`${total} TND`, c3, tY, { ...val, align: 'right' })

    ln(56, tY - 20, W - 56, tY - 20, { opacity: 0.15 })

    // ── HOLDER INFO ──
    const hY = H - 572
    txt('TICKET HOLDER', c1, hY + 14, lbl)
    txt(booking?.customer?.name || '—', c1, hY, val)
    txt('EMAIL', c3, hY + 14, { ...lbl, align: 'right' })
    txt(booking?.customer?.email || '—', c3, hY, { ...val, align: 'right' })

    ln(56, hY - 20, W - 56, hY - 20, { opacity: 0.15 })

    // ══════════════════════════════════════
    // ── QR CODE SECTION ──
    // ══════════════════════════════════════
    const qrData = JSON.stringify({
      ref: booking?.reference || 'MD-2026-0000',
      event: 'Violin Obsession',
      date: '24 April 2026',
      venue: 'Maison de la Culture Ibn Rachiq',
      holder: booking?.customer?.name || '',
      qty: booking?.order?.quantity || 1,
      total: `${total} TND`,
      url: `https://mahdidhaker.com/tickets/verify?ref=${booking?.reference}`,
    })

    // Generate QR as PNG data URL
    const qrDataUrl = await QRCode.toDataURL(qrData, {
      width: 160,
      margin: 1,
      color: {
        dark: '#c6a84b',   // gold dots
        light: '#080705',  // black background
      },
    })

    // Convert data URL to Uint8Array
    const qrBase64 = qrDataUrl.split(',')[1]
    const qrBytes = Uint8Array.from(atob(qrBase64), c => c.charCodeAt(0))
    const qrImage = await pdfDoc.embedPng(qrBytes)

    // QR position — centered bottom area
    const qrSize = 130
    const qrX = W / 2 - qrSize / 2
    const qrY = 100

    // QR border box
    box(qrX - 12, qrY - 12, qrSize + 24, qrSize + 24, {
      fill: DEEP, border: GOLD, bw: 0.5,
    })

    // Draw QR image
    page.drawImage(qrImage, {
      x: qrX, y: qrY,
      width: qrSize, height: qrSize,
    })

    // QR label above
    txt('SCAN TO VERIFY', W / 2, qrY + qrSize + 20, {
      size: 7.5, font: serif, color: GOLD, align: 'center',
    })

    // QR hint below
    txt('Present this QR code at the entrance', W / 2, qrY - 20, {
      size: 7.5, font: serifItal, color: MUTED, align: 'center',
    })

    // ── DECORATIVE VIOLIN STRINGS ──
    ;[170, 205, 240, 275].forEach((sx, i) => {
      ln(sx, qrY - 30, sx - 8, H - 600, {
        opacity: 0.03 + i * 0.01,
        t: 0.4,
      })
    })

    // ── FOOTER ──
    txt('mahdidhaker.com', W / 2, 44, {
      size: 8, font: serif, color: MUTED, align: 'center',
    })
    txt('This ticket is valid for one entry. Please present at the venue entrance.', W / 2, 30, {
      size: 7, font: serifItal, color: MUTED, align: 'center',
    })

    // ── SAVE ──
    const bytes = await pdfDoc.save()
    const blob = new Blob([bytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${booking?.reference || 'ticket'}-mahdi-dhaker.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareBooking = async () => {
    const shareText = buildShareText(
      booking?.reference || '', total, booking?.event, {
        confirmed: copy.title,
        reference: copy.reference,
        with: common.withLabel,
        programme: common.programmeLabel,
        total: copy.paid,
        currency: 'TND',
      }
    )
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch { setCopied(false) }
  }

  return (
    <div className={styles.page}>
      <Cursor />
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>Mahdi <b>Dhaker</b></Link>
        <Link href="/tickets" className={styles.back}><span />{common.back}</Link>
      </nav>
      <main className={styles.wrap}>
        <div className={styles.checkWrap}>
          <div className={styles.checkmark} aria-hidden="true">
            <svg className={styles.tickIcon} viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1>{copy.title}</h1>
        <p className={styles.ref}>{copy.reference}: {booking?.reference || 'MD-2026-0000'}</p>
        <div className={styles.card}>
          <p className={styles.title}>{booking?.event?.title}</p>
          <p className={styles.sub}>{booking?.event?.subtitle}</p>
          <p>{booking?.event?.dateText}</p>
          <p>{booking?.event?.venue}</p>
          <p>{common.withLabel}: {booking?.event?.with}</p>
          <p className={styles.total}>{copy.paid}: {total} TND</p>
        </div>
        <div className={styles.actions}>
          <button type="button" className="btn btn-g" onClick={downloadTicketPdf}>
            {copy.downloadTicket}
          </button>
          <button type="button" className={styles.ghost} onClick={shareBooking}>
            {copied ? copy.copied : copy.share}
          </button>
        </div>
        <Link href="/" className={styles.home}>{copy.backHome}</Link>
      </main>
    </div>
  )
}