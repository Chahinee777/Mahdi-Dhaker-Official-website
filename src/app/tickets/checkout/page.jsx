'use client'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './checkout.module.css'
import Cursor from '@/components/Cursor'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/translations'
import {
  getOrder,
  saveBooking,
  generateBookingReference,
} from '@/lib/tickets'

export default function CheckoutPage() {
  const { lang } = useLanguage()
  const copy = t[lang].tickets.checkout
  const common = t[lang].tickets
  const router = useRouter()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  useEffect(() => {
    const stored = getOrder()
    if (!stored || !stored.items || stored.items.length === 0) {
      router.replace('/tickets')
      return
    }
    setOrder(stored)
  }, [router])

  const isValid = useMemo(() => {
    return Boolean(form.name.trim() && form.email.trim() && form.phone.trim() && order)
  }, [form, order])

  const payNow = () => {
    if (!isValid || !order) return
    setLoading(true)

    setTimeout(() => {
      const reference = generateBookingReference()
      saveBooking({
        reference,
        order,
        customer: form,
        event: order.event,
        paidAt: new Date().toISOString(),
      })
      router.push('/tickets/confirmation')
    }, 1500)
  }

  return (
    <div className={styles.page}>
      <Cursor />

      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Mahdi <b>Dhaker</b>
        </Link>
        <Link href="/tickets" className={styles.back}>
          <span />
          {common.back}
        </Link>
      </nav>

      <main className={styles.wrap}>
        <section className={styles.summary}>
          <h1>{copy.title}</h1>
          <p className={styles.event}>{order?.event?.title}</p>
          <p className={styles.eventMeta}>{order?.event?.dateText} · {order?.event?.venue}</p>

          {order?.items?.map((item) => (
            <div className={styles.row} key={item.id}>
              <span>{common.standardName || item.name} x {item.quantity}</span>
              <span>{item.quantity * item.price} TND</span>
            </div>
          ))}

          <div className={styles.total}>
            <span>{copy.total}</span>
            <span>{order?.total || 0} TND</span>
          </div>
        </section>

        <section className={styles.formBox}>
          <div className={styles.formGroup}>
            <label>{copy.fullName}</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder={copy.fullNamePlaceholder}
            />
          </div>

          <div className={styles.formGroup}>
            <label>{copy.email}</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder={copy.emailPlaceholder}
            />
          </div>

          <div className={styles.formGroup}>
            <label>{copy.phone}</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder={copy.phonePlaceholder}
            />
          </div>

          <div className={styles.payment}>
            <p className={styles.paymentTitle}>{copy.paymentMethod}</p>
            <div className={styles.method}>
              <strong>Konnect</strong>
              <div className={styles.badges}>
                <span>Visa</span>
                <span>Mastercard</span>
              </div>
            </div>
            <p className={styles.note}>{copy.redirectNote}</p>
          </div>

          <button
            type="button"
            className={`btn btn-g ${styles.pay}`}
            onClick={payNow}
            disabled={!isValid || loading}
          >
            {loading ? <span className={styles.spinner} /> : `${copy.pay} ${order?.total || 0} TND`}
          </button>

          <p className={styles.security}>{copy.security}</p>
        </section>
      </main>
    </div>
  )
}
