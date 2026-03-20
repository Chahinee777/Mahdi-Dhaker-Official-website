export const EVENT_DETAILS = {
  title: 'Violin Obsession',
  subtitle: 'A journey through passion, virtuosity, and intimacy',
  dateText: '24 April 2026 · 19:00',
  venue: 'Maison de la Culture Ibn Rachiq, Tunis',
  with: 'Lina Ammari — Piano',
  programme:
    'Bach · Saint-Saens · Brahms · Grieg · Faure · Chopin · Glazunov · Kreisler · Suppe · Monti',
  start: '20260424T190000',
  end: '20260424T210000',
}

export const TICKET_CATEGORIES = [
  {
    id: 'standard',
    name: 'Standard',
    price: 20,
    description: 'General admission seating',
  },
]

export const ORDER_STORAGE_KEY = 'md_ticket_order'
export const BOOKING_STORAGE_KEY = 'md_ticket_booking'

export function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function saveOrder(order) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order))
}

export function getOrder() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(ORDER_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveBooking(booking) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(booking))
}

export function getBooking() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(BOOKING_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function generateBookingReference() {
  const suffix = Math.floor(1000 + Math.random() * 9000)
  return `MD-2026-${suffix}`
}

export function buildIcsContent(reference = '', eventDetails = EVENT_DETAILS) {
  const cleanRef = reference || generateBookingReference()
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mahdi Dhaker//Ticketing//EN',
    'BEGIN:VEVENT',
    `UID:${cleanRef}@mahdidhaker.com`,
    `DTSTAMP:${eventDetails.start || EVENT_DETAILS.start}`,
    `DTSTART:${eventDetails.start || EVENT_DETAILS.start}`,
    `DTEND:${eventDetails.end || EVENT_DETAILS.end}`,
    `SUMMARY:${eventDetails.title || EVENT_DETAILS.title}`,
    `DESCRIPTION:${eventDetails.subtitle || EVENT_DETAILS.subtitle}\\nWith: ${eventDetails.with || EVENT_DETAILS.with}\\nProgramme: ${eventDetails.programme || EVENT_DETAILS.programme}`,
    `LOCATION:${eventDetails.venue || EVENT_DETAILS.venue}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function buildShareText(reference, bookingTotal, eventDetails = EVENT_DETAILS, labels = {}) {
  const i18n = {
    confirmed: labels.confirmed || 'Booking Confirmed',
    reference: labels.reference || 'Reference',
    with: labels.with || 'With',
    programme: labels.programme || 'Programme',
    total: labels.total || 'Total',
    currency: labels.currency || 'TND',
  }

  return [
    i18n.confirmed,
    `${i18n.reference}: ${reference}`,
    `${eventDetails.title || EVENT_DETAILS.title}`,
    eventDetails.subtitle || EVENT_DETAILS.subtitle,
    eventDetails.dateText || EVENT_DETAILS.dateText,
    eventDetails.venue || EVENT_DETAILS.venue,
    `${i18n.with}: ${eventDetails.with || EVENT_DETAILS.with}`,
    `${i18n.programme}: ${eventDetails.programme || EVENT_DETAILS.programme}`,
    `${i18n.total}: ${bookingTotal} ${i18n.currency}`,
  ].join('\n')
}
