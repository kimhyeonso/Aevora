import { useEffect, useRef } from 'react'
import styles from './Scene02.module.scss'

const layers = [
  { count: 460, length: 42, speed: 500, drift: 30, opacity: .36, width: 1 },
  { count: 390, length: 70, speed: 720, drift: 52, opacity: .58, width: 1.25 },
  { count: 210, length: 112, speed: 960, drift: 84, opacity: .82, width: 2 },
]

export default function Rain({ reducedMotion, frameRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const frame = frameRef.current
    if (!canvas || !frame) return undefined

    const context = canvas.getContext('2d')
    const drops = []
    const cursorDrops = []
    let width = 0
    let height = 0
    let ratio = 1
    let frameId
    let previousTime = 0
    let lastCursorRain = 0

    const seedDrops = () => {
      drops.length = 0
      layers.forEach((layer) => {
        for (let index = 0; index < layer.count; index += 1) drops.push({
          ...layer,
          x: Math.random() * width,
          y: Math.random() * (height + layer.length) - layer.length,
          velocity: layer.speed * (.82 + Math.random() * .36),
          xVelocity: (Math.random() * 2 - 1) * layer.drift,
          start: Math.random() * .82,
        })
      })
    }
    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      seedDrops()
    }
    const addCursorRain = (event) => {
      if (reducedMotion || event.timeStamp - lastCursorRain < 28) return
      const bounds = frame.getBoundingClientRect()
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top
      lastCursorRain = event.timeStamp
      for (let index = 0; index < 5; index += 1) cursorDrops.push({
        x: x + (Math.random() - .5) * 88,
        y: y - 18 - Math.random() * 92,
        velocity: 760 + Math.random() * 420,
        xVelocity: (Math.random() - .5) * 96,
        length: 42 + Math.random() * 58,
        width: Math.random() > .72 ? 2 : 1,
        life: .5 + Math.random() * .22,
      })
      if (cursorDrops.length > 90) cursorDrops.splice(0, cursorDrops.length - 90)
    }
    const draw = (time) => {
      const delta = previousTime ? Math.min((time - previousTime) / 1000, .05) : 1 / 60
      previousTime = time
      context.clearRect(0, 0, width, height)
      const intensity = reducedMotion ? .25 : Math.min(Math.max(Number.parseFloat(canvas.style.getPropertyValue('--rain-intensity')) || 0, 0), 1)

      drops.forEach((drop) => {
        const visibility = Math.min(Math.max((intensity - drop.start) / .18, 0), 1)
        if (visibility === 0) return
        if (!reducedMotion) {
          drop.y += drop.velocity * delta
          drop.x += drop.xVelocity * delta
          if (drop.y - drop.length > height || drop.x < -20 || drop.x > width + 20) {
            drop.y = -drop.length
            drop.x = Math.random() * width
          }
        }
        context.strokeStyle = `rgba(210, 222, 226, ${drop.opacity * visibility})`
        context.lineWidth = drop.width
        context.beginPath()
        context.moveTo(drop.x - drop.xVelocity * .06, drop.y - drop.length)
        context.lineTo(drop.x, drop.y)
        context.stroke()
      })
      for (let index = cursorDrops.length - 1; index >= 0; index -= 1) {
        const drop = cursorDrops[index]
        drop.life -= delta
        if (drop.life <= 0 || drop.y - drop.length > height) {
          cursorDrops.splice(index, 1)
          continue
        }
        drop.y += drop.velocity * delta
        drop.x += drop.xVelocity * delta
        context.strokeStyle = `rgba(223, 231, 234, ${Math.min(drop.life * 1.25, .82)})`
        context.lineWidth = drop.width
        context.beginPath()
        context.moveTo(drop.x - drop.xVelocity * .06, drop.y - drop.length)
        context.lineTo(drop.x, drop.y)
        context.stroke()
      }

      if (!reducedMotion) frameId = requestAnimationFrame(draw)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()
    frame.addEventListener('pointermove', addCursorRain, { passive: true })
    frameId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      frame.removeEventListener('pointermove', addCursorRain)
    }
  }, [frameRef, reducedMotion])

  return <canvas className={styles['scene02-rain']} ref={canvasRef} aria-hidden="true" />
}
