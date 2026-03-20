'use client'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/translations'

export default function Contact() {
  const { lang } = useLanguage()
  const copy = t[lang].contact
  const [form, setForm] = useState({ first: '', last: '', email: '', type: '', message: '' })
  const [sent, setSent] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact">
      <div className="s-inner c-grid">
        <div>
          <div className="s-label rev">{copy.label}</div>
          <h2 className="s-title rev d1">{copy.title1}<br /><em>{copy.titleEm}</em></h2>
          <div className="c-info rev d2">
            <div>
              <div className="ci-lbl">{copy.info.booking}</div>
              <div className="ci-val"><a href="mailto:dhakermahdi1@gmail.com">dhakermahdi1@gmail.com</a></div>
            </div>
            <div>
              <div className="ci-lbl">{copy.info.press}</div>
              <div className="ci-val"><a href="mailto:dhakermahdi1@gmail.com">dhakermahdi1@gmail.com</a></div>
            </div>
            <div>
              <div className="ci-lbl">{copy.info.location}</div>
              <div className="ci-val">{copy.info.locationValue}</div>
            </div>
          </div>
          <div className="socials rev d3">
            <a href="https://www.instagram.com/mahdi_dhaker_/" target="_blank" rel="noreferrer" className="soc">{copy.socials.instagram}</a>
            <a href="https://www.facebook.com/mehdi.dhaker.7" target="_blank" rel="noreferrer" className="soc">{copy.socials.facebook}</a>
            <a href="https://www.youtube.com/@mahdidhaker1" className="soc">{copy.socials.youtube}</a>
            <a href="#" className="soc">{copy.socials.spotify}</a>
          </div>
        </div>

        <form className="form rev d2" onSubmit={handleSubmit}>
          {sent ? (
            <div style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)', fontSize: '22px', fontStyle: 'italic' }}>
              {copy.form.thanks}
            </div>
          ) : (
            <>
              <div className="frow">
                <div className="fg">
                  <label>{copy.form.firstName}</label>
                  <input type="text" placeholder={copy.form.placeholderFirst} value={form.first} onChange={e => set('first', e.target.value)} />
                </div>
                <div className="fg">
                  <label>{copy.form.lastName}</label>
                  <input type="text" placeholder={copy.form.placeholderLast} value={form.last} onChange={e => set('last', e.target.value)} />
                </div>
              </div>
              <div className="fg">
                <label>{copy.form.email}</label>
                <input type="email" placeholder={copy.form.placeholderEmail} value={form.email} onChange={e => set('email', e.target.value)} />
              </div>
              <div className="fg">
                <label>{copy.form.enquiry}</label>
                <select value={form.type} onChange={e => set('type', e.target.value)}>
                  <option value="">{copy.form.selectPlaceholder}</option>
                  <option>{copy.form.options.concert}</option>
                  <option>{copy.form.options.festival}</option>
                  <option>{copy.form.options.press}</option>
                  <option>{copy.form.options.collab}</option>
                  <option>{copy.form.options.other}</option>
                </select>
              </div>
              <div className="fg">
                <label>{copy.form.message}</label>
                <textarea rows="5" placeholder={copy.form.placeholderMessage} value={form.message} onChange={e => set('message', e.target.value)} />
              </div>
              <button type="submit" className="btn btn-g" style={{ alignSelf: 'flex-start', cursor: 'pointer' }}>
                {copy.form.send}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
