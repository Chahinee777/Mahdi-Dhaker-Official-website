'use client'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/translations'

export default function Newsletter() {
  const { lang } = useLanguage()
  const copy = t[lang].newsletter
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = () => {
    if (email && email.includes('@')) {
      setDone(true)
      setEmail('')
    }
  }

  return (
    <div className="nl rev">
      <div>
        <h2>{copy.title1}<br />{copy.title2}</h2>
        <p>{copy.sub}</p>
      </div>
      <div className="nl-form">
        <input
          className="nl-inp"
          type="email"
          placeholder={copy.placeholder}
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
        <button className="nl-btn" onClick={handleSubmit}>
          {done ? copy.btnDone : copy.btn}
        </button>
      </div>
    </div>
  )
}
