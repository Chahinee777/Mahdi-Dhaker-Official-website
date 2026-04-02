'use client'
import Image from 'next/image'
import Link from 'next/link'
import styles from './tickets.module.css'
import Cursor from '@/components/Cursor'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/translations'
import {
  TICKET_CATEGORIES,
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
  const category = TICKET_CATEGORIES[0]

  const proceedToCheckout = () => {
    window.open('https://teskerti.tn/evenement/violin-obession', '_blank')
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
            <div className={styles.ticketCard}>
              <div>
                <div className={styles.ticketName}>{copy.standardName || category.name}</div>
                <div className={styles.ticketDesc}>{copy.standardDesc || category.description}</div>
              </div>
              <div className={styles.ticketRight}>
                <div className={styles.ticketPrice}>{category.price} TND</div>
              </div>
            </div>
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryTitle}>{copy.proceed}</div>
            <p className={styles.empty}>{copy.standardName || category.name} · {category.price} TND</p>

            <button
              type="button"
              className={`btn btn-g ${styles.proceed}`}
              onClick={proceedToCheckout}
            >
              {copy.proceed}
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
