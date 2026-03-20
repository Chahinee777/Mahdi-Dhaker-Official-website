'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { t } from '@/translations'

const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
})

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const stored = window.localStorage.getItem('lang')
    if (stored && t[stored]) setLang(stored)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('lang', lang)
    const dir = t[lang]?.dir || 'ltr'
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', dir)
  }, [lang])

  const value = useMemo(() => ({ lang, setLang }), [lang])

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
