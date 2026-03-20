'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './tickets.module.css'
import Cursor from '@/components/Cursor'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/translations'
import {
  EVENT_DETAILS,
  TICKET_CATEGORIES,
  calculateSubtotal,
  saveOrder,
} from '@/lib/tickets'

const LocationPin = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export default function TicketsPage() {
  const { lang } = useLanguage()
  const copy = t[lang].tickets
  const event = copy.event
  const router = useRouter()
  const [agreed, setAgreed] = useState(false)
  const [quantities, setQuantities] = useState(
    Object.fromEntries(TICKET_CATEGORIES.map((cat) => [cat.id, 0]))
  )

  const selectedItems = useMemo(() => {
    return TICKET_CATEGORIES
      .map((cat) => ({ ...cat, quantity: quantities[cat.id] || 0 }))
      .filter((item) => item.quantity > 0)
  }, [quantities])

  const subtotal = useMemo(() => calculateSubtotal(selectedItems), [selectedItems])
  const canProceed = selectedItems.length > 0 && agreed

  const adjustQuantity = (id, diff) => {
    setQuantities((prev) => {
      const next = Math.max(0, (prev[id] || 0) + diff)
      return { ...prev, [id]: next }
    })
  }

  const proceedToCheckout = () => {
    if (!canProceed) return
    saveOrder({
      items: selectedItems,
      subtotal,
      total: subtotal,
      event: { ...EVENT_DETAILS, ...event },
      createdAt: new Date().toISOString(),
    })
    router.push('/tickets/checkout')
  }

  return (
    <div className={styles.page}>
      <Cursor />

      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Mahdi <b>Dhaker</b>
        </Link>
        <Link href="/#tour" className={styles.back}>
          <span />
          {copy.back}
        </Link>
      </nav>

      <main className={styles.wrap}>
        <section className={styles.left}>
          <div className={styles.posterWrap}>
            <Image
              src="/images/upcoming_concerts.jpeg"
              alt={copy.posterAlt}
              fill
              sizes="(max-width: 900px) 100vw, 36vw"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className={styles.meta}>
            <p className={styles.kicker}>{copy.kicker}</p>
            <h1>{event.title}</h1>
            <p className={styles.sub}>{event.subtitle}</p>
            <p className={styles.line}>{event.dateText}</p>
            <p className={styles.lineWithIcon}>
              <span><LocationPin /></span>
              {event.venueLabel}
            </p>
            <p className={styles.prog}>{copy.programmeLabel}: {event.programme}</p>
          </div>
        </section>

        <section className={styles.right}>
          <h2>{copy.selectTitle}</h2>

          <div className={styles.ticketList}>
            {TICKET_CATEGORIES.map((cat) => (
              <div className={styles.ticketCard} key={cat.id}>
                <div>
                  <div className={styles.ticketName}>{copy.standardName || cat.name}</div>
                  <div className={styles.ticketDesc}>{copy.standardDesc || cat.description}</div>
                </div>
                <div className={styles.ticketRight}>
                  <div className={styles.ticketPrice}>{cat.price} TND</div>
                  <div className={styles.qty}>
                    <button type="button" onClick={() => adjustQuantity(cat.id, -1)}>-</button>
                    <span>{quantities[cat.id] || 0}</span>
                    <button type="button" onClick={() => adjustQuantity(cat.id, 1)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryTitle}>{copy.summaryTitle}</div>
            {selectedItems.length === 0 && <p className={styles.empty}>{copy.empty}</p>}
            {selectedItems.map((item) => (
              <div className={styles.row} key={item.id}>
                <span>{copy.standardName || item.name} x {item.quantity}</span>
                <span>{item.quantity * item.price} TND</span>
              </div>
            ))}
            <div className={styles.totalRow}>
              <span>{copy.subtotal}</span>
              <span>{subtotal} TND</span>
            </div>

            <label className={styles.terms}>
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              <span>{copy.terms}</span>
            </label>

            <button
              type="button"
              className={`btn btn-g ${styles.proceed}`}
              disabled={!canProceed}
              onClick={proceedToCheckout}
            >
              {copy.proceed}
            </button>

            <div className={styles.konnect}>{copy.poweredBy}</div>
          </div>
        </section>
      </main>
    </div>
  )
}
