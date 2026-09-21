import { useEffect, useRef } from 'react'

export default function Scene01Particles({ reducedMotion, frameRef, className }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const frame = frameRef.current
    if (!canvas || !frame) return undefined

    const context = canvas.getContext('2d')
    const pointer = { x: -1000, y: -1000 }
    const particles = []
    const traces = []
    let width = 0
    let height = 0
    let ratio = 1
    let frameId

    const seedParticles = () => {
      particles.length = 0
      const count = window.innerWidth < 700 ? 28 : 48
      for (let index = 0; index < count; index += 1) particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - .5) * .09,
        vy: -.025 - Math.random() * .08,
        size: .28 + Math.random() * .72,
        opacity: .06 + Math.random() * .18,
        phase: Math.random() * Math.PI * 2,
      })
    }
    const resize = () => {
      const bounds = frame.getBoundingClientRect()
      width = bounds.width; height = bounds.height; ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      seedParticles()
    }
    const movePointer = (event) => {
      const bounds = frame.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left; pointer.y = event.clientY - bounds.top
      frame.style.setProperty('--pointer-x', `${pointer.x}px`)
      frame.style.setProperty('--pointer-y', `${pointer.y}px`)
      if (!reducedMotion && (traces.length === 0 || Math.hypot(pointer.x - traces.at(-1).x, pointer.y - traces.at(-1).y) > 5)) {
        traces.push({
          x: pointer.x + (Math.random() - .5) * 4,
          y: pointer.y + (Math.random() - .5) * 4,
          vx: (Math.random() - .5) * .22,
          vy: (Math.random() - .5) * .22 - .04,
          size: .42 + Math.random() * .48,
          life: 1,
        })
        if (traces.length > 36) traces.shift()
      }
    }
    const draw = (time) => {
      context.clearRect(0, 0, width, height)
      particles.forEach((particle) => {
        const dx = particle.x - pointer.x; const dy = particle.y - pointer.y
        const distance = Math.hypot(dx, dy)
        if (!reducedMotion && distance < 140 && distance > 0) {
          particle.vx += (dx / distance) * .003
          particle.vy += (dy / distance) * .003
        }
        particle.x += particle.vx + Math.sin(time * .00035 + particle.phase) * .09
        particle.y += particle.vy
        particle.vx *= .994; particle.vy *= .994
        if (particle.x < -10) particle.x = width + 10
        if (particle.x > width + 10) particle.x = -10
        if (particle.y < -10) particle.y = height + 10
        if (particle.y > height + 10) particle.y = -10
        context.fillStyle = `rgba(205, 206, 173, ${particle.opacity})`
        context.beginPath(); context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2); context.fill()
      })
      for (let index = traces.length - 1; index >= 0; index -= 1) {
        const trace = traces[index]
        trace.x += trace.vx; trace.y += trace.vy; trace.life -= .018
        if (trace.life <= 0) { traces.splice(index, 1); continue }
        const glow = context.createRadialGradient(trace.x, trace.y, 0, trace.x, trace.y, trace.size * 4)
        glow.addColorStop(0, `rgba(255, 246, 196, ${trace.life * .9})`)
        glow.addColorStop(1, 'rgba(255, 246, 196, 0)')
        context.fillStyle = glow
        context.beginPath(); context.arc(trace.x, trace.y, trace.size * 4, 0, Math.PI * 2); context.fill()
        context.fillStyle = `rgba(255, 249, 212, ${trace.life * .88})`
        context.beginPath(); context.arc(trace.x, trace.y, trace.size, 0, Math.PI * 2); context.fill()
      }
      frameId = requestAnimationFrame(draw)
    }

    const observer = new ResizeObserver(resize)
    resize(); observer.observe(frame)
    if (!reducedMotion) frame.addEventListener('pointermove', movePointer, { passive: true })
    frameId = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frameId); observer.disconnect(); frame.removeEventListener('pointermove', movePointer) }
  }, [frameRef, reducedMotion])

  return <canvas className={className} ref={canvasRef} aria-hidden="true" />
}
