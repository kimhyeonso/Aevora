import { useEffect, useRef } from 'react'

const MAX_PARTICLES = 150

export default function AncientParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const scene = canvas?.closest('.scene-01')
    if (!canvas || !scene) return undefined

    const context = canvas.getContext('2d')
    const particles = []
    let frameId
    let width = 0
    let height = 0
    let ratio = 1
    let lastPoint = null

    const resize = () => {
      const bounds = scene.getBoundingClientRect()
      ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const addParticles = (x, y, amount) => {
      for (let index = 0; index < amount; index += 1) {
        const angle = Math.random() * Math.PI * 2
        const speed = .08 + Math.random() * .38
        particles.push({
          x: x + (Math.random() - .5) * 5,
          y: y + (Math.random() - .5) * 5,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - .08,
          size: .22 + Math.random() * .58,
          life: 1,
          decay: .008 + Math.random() * .012,
        })
      }
      if (particles.length > MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES)
    }

    const onMove = (event) => {
      const bounds = scene.getBoundingClientRect()
      const point = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
      if (point.x < 0 || point.y < 0 || point.x > width || point.y > height) return
      const distance = lastPoint ? Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y) : 0
      if (!lastPoint || distance > 3) {
        addParticles(point.x, point.y, Math.min(5, Math.max(1, Math.ceil(distance / 12))))
        lastPoint = point
      }
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'lighter'
      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index]
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= .992
        particle.vy *= .992
        particle.life -= particle.decay
        if (particle.life <= 0) { particles.splice(index, 1); continue }
        const glow = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 4.5)
        glow.addColorStop(0, `rgba(246, 237, 180, ${particle.life * .9})`)
        glow.addColorStop(1, 'rgba(246, 237, 180, 0)')
        context.fillStyle = glow
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size * 4.5, 0, Math.PI * 2)
        context.fill()
      }
      context.globalCompositeOperation = 'source-over'
      frameId = requestAnimationFrame(draw)
    }

    const observer = new ResizeObserver(resize)
    resize(); observer.observe(scene); scene.addEventListener('pointermove', onMove, { passive: true }); draw()
    return () => { cancelAnimationFrame(frameId); observer.disconnect(); scene.removeEventListener('pointermove', onMove) }
  }, [])

  return <canvas ref={canvasRef} className="ancient-particles" aria-hidden="true" />
}
