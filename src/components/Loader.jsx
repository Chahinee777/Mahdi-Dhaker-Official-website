'use client'
import { useEffect } from 'react'
import Image from 'next/image'

export default function Loader() {
  useEffect(() => {
    const loader = document.getElementById('loader')
    const timer = setTimeout(() => {
      loader?.classList.add('done')
    }, 1400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div id="loader">
      <div className="loader-ring">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" />
        </svg>
        <Image
          src="/images/logo.png"
          alt="Mahdi Dhaker"
          width={100}
          height={100}
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </div>
  )
}