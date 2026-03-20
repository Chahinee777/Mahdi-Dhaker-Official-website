'use client'
import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cur = document.getElementById('cur')
    const ring = document.getElementById('cur-r')
    if (!cur || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let animId

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      cur.style.left = mx + 'px'
      cur.style.top = my + 'px'
    }

    const animate = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      animId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    animId = requestAnimationFrame(animate)

    const targets = document.querySelectorAll('a, button, .t-item, .mc, .album, .f-tab')
    const onEnter = () => ring.classList.add('big')
    const onLeave = () => ring.classList.remove('big')
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <div id="cur" />
      <div id="cur-r" />
    </>
  )
}
