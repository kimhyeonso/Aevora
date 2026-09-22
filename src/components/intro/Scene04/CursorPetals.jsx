import { useEffect, useRef } from 'react'
import { gsap } from '../../../utils/gsapSetup'
import styles from './Scene04.module.scss'

const COLORS = ['#f7cdd9', '#fbe0e6', '#f3b8cc']
const PETAL_PATH = 'M12 2C6.5 6 3 11 3 15.2 3 19.5 7 22 12 22s9-2.5 9-6.8C21 11 17.5 6 12 2Z'
const SPAWN_INTERVAL_MS = 55

function createPetalEl(color, size) {
  const el = document.createElement('span')
  el.className = styles['scene04-cursor-petal']
  el.style.width = `${size}px`
  el.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="${PETAL_PATH}" fill="${color}" /></svg>`
  return el
}

export default function CursorPetals({ frameRef, active }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const frame = frameRef.current
    const container = containerRef.current
    if (!frame || !container || !active) return undefined

    let lastSpawn = 0

    function spawnPetal(x, y) {
      const size = 10 + Math.random() * 10
      const petal = createPetalEl(COLORS[Math.floor(Math.random() * COLORS.length)], size)
      petal.style.left = `${x - size / 2}px`
      petal.style.top = `${y - size / 2}px`
      container.appendChild(petal)

      const driftX = (Math.random() * 2 - 1) * 100
      const fallY = 90 + Math.random() * 80
      const rotation = (Math.random() * 2 - 1) * 280
      const duration = 1.5 + Math.random() * 1.1

      const tl = gsap.timeline({ onComplete: () => petal.remove() })
      tl.fromTo(petal, { autoAlpha: 0, scale: .4 }, { autoAlpha: 1, scale: 1, duration: .22, ease: 'power1.out' }, 0)
        .to(petal, { x: driftX, y: fallY, rotation, duration, ease: 'power1.out' }, 0)
        .to(petal, { autoAlpha: 0, duration: .45 }, duration - .45)
    }

    function handlePointerMove(event) {
      const now = performance.now()
      if (now - lastSpawn < SPAWN_INTERVAL_MS) return
      lastSpawn = now
      const rect = frame.getBoundingClientRect()
      spawnPetal(event.clientX - rect.left, event.clientY - rect.top)
    }

    frame.addEventListener('pointermove', handlePointerMove)
    return () => {
      frame.removeEventListener('pointermove', handlePointerMove)
      gsap.killTweensOf(container.children)
      container.replaceChildren()
    }
  }, [frameRef, active])

  return <div ref={containerRef} className={styles['scene04-cursor-petals']} aria-hidden="true" />
}
