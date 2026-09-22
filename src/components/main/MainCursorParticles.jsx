import { useEffect, useRef } from 'react'

const MAX_PARTICLES = {
  light: 22,
  dust: 72,
  sunlight: 18,
  petals: 48,
  dim: 52,
}

const MOVE_THRESHOLD = {
  light: 20,
  dust: 7,
  sunlight: 22,
  petals: 18,
  dim: 7,
}

const ROSE_COLORS = ['#f3b8bf', '#dc7e91', '#b94d66', '#f8d1d5']

export default function MainCursorParticles({ frameRef, reducedMotion, effect, className }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const frame = frameRef.current
    if (!canvas || !frame || reducedMotion) return undefined

    const context = canvas.getContext('2d')
    const particles = []
    let width = 0
    let height = 0
    let ratio = 1
    let previousPoint = null
    let frameId

    const resize = () => {
      width = frame.offsetWidth
      height = frame.offsetHeight
      ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const addFog = (x, y, direction) => {
      particles.push({
        kind: 'fog',
        x: x - direction.x * 14,
        y: y - direction.y * 14,
        vx: -direction.x * .15 + (Math.random() - .5) * .16,
        vy: -direction.y * .1 + (Math.random() - .5) * .1,
        size: 20 + Math.random() * 18,
        life: 1,
      })
    }

    const addSand = (x, y, direction) => {
      const count = 4 + Math.floor(Math.random() * 3)
      for (let index = 0; index < count; index += 1) {
        particles.push({
          kind: 'sand',
          x: x - direction.x * (2 + Math.random() * 12) + (Math.random() - .5) * 8,
          y: y - direction.y * (2 + Math.random() * 12) + (Math.random() - .5) * 8,
          vx: -direction.x * (.16 + Math.random() * .36) + (Math.random() - .5) * .28,
          vy: -direction.y * (.1 + Math.random() * .22) + (Math.random() - .5) * .22,
          size: .45 + Math.random() * 1.35,
          life: .7 + Math.random() * .3,
        })
      }
    }

    const addRipple = (x, y) => {
      particles.push({
        kind: 'ripple',
        x,
        y,
        life: 1,
        tilt: .62 + Math.random() * .18,
        rotation: Math.random() * Math.PI,
      })
    }

    const addRose = (x, y, direction) => {
      particles.push({
        kind: 'bloom',
        x: x - direction.x * 8,
        y: y - direction.y * 8,
        life: 1,
        rotation: Math.random() * Math.PI * 2,
      })
      for (let index = 0; index < 3; index += 1) {
        particles.push({
          kind: 'petal',
          x: x + (Math.random() - .5) * 10,
          y: y + (Math.random() - .5) * 10,
          vx: -direction.x * (.1 + Math.random() * .2) + (Math.random() - .5) * .32,
          vy: -direction.y * (.08 + Math.random() * .14) - .04 + (Math.random() - .5) * .2,
          size: 3 + Math.random() * 3.5,
          life: .72 + Math.random() * .25,
          rotation: Math.random() * Math.PI,
          spin: (Math.random() - .5) * .12,
          color: ROSE_COLORS[Math.floor(Math.random() * ROSE_COLORS.length)],
        })
      }
    }

    const addSpark = (x, y, direction) => {
      const count = 1 + Number(Math.random() > .7)
      for (let index = 0; index < count; index += 1) {
        particles.push({
          kind: 'spark',
          x: x - direction.x * (4 + Math.random() * 12) + (Math.random() - .5) * 5,
          y: y - direction.y * (4 + Math.random() * 12) + (Math.random() - .5) * 5,
          vx: -direction.x * (.08 + Math.random() * .18) + (Math.random() - .5) * .14,
          vy: -direction.y * (.08 + Math.random() * .18) - .04 - Math.random() * .1,
          size: .55 + Math.random() * 1.15,
          life: .72 + Math.random() * .28,
        })
      }
    }

    const addEffect = (x, y, distance, deltaX, deltaY) => {
      const direction = distance ? { x: deltaX / distance, y: deltaY / distance } : { x: 0, y: 0 }
      if (effect === 'light') addFog(x, y, direction)
      else if (effect === 'dust') addSand(x, y, direction)
      else if (effect === 'sunlight') addRipple(x, y)
      else if (effect === 'petals') addRose(x, y, direction)
      else addSpark(x, y, direction)

      const limit = MAX_PARTICLES[effect] ?? MAX_PARTICLES.dim
      if (particles.length > limit) particles.splice(0, particles.length - limit)
    }

    const movePointer = (event) => {
      const bounds = frame.getBoundingClientRect()
      const point = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
      if (previousPoint) {
        const deltaX = point.x - previousPoint.x
        const deltaY = point.y - previousPoint.y
        const distance = Math.hypot(deltaX, deltaY)
        if (distance > (MOVE_THRESHOLD[effect] ?? MOVE_THRESHOLD.dim)) addEffect(point.x, point.y, distance, deltaX, deltaY)
      }
      previousPoint = point
    }

    const drawFog = (particle) => {
      const size = particle.size + (1 - particle.life) * 42
      const glow = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, size)
      glow.addColorStop(0, `rgba(242, 247, 239, ${particle.life * .24})`)
      glow.addColorStop(.52, `rgba(218, 229, 218, ${particle.life * .1})`)
      glow.addColorStop(1, 'rgba(218, 229, 218, 0)')
      context.fillStyle = glow
      context.beginPath()
      context.ellipse(particle.x, particle.y, size, size * .58, 0, 0, Math.PI * 2)
      context.fill()
    }

    const drawSand = (particle) => {
      context.fillStyle = `rgba(231, 194, 135, ${particle.life * .7})`
      context.beginPath()
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      context.fill()
    }

    const drawRipple = (particle) => {
      const progress = 1 - particle.life
      const radius = 8 + progress * 96
      context.save()
      context.translate(particle.x, particle.y)
      context.rotate(particle.rotation)
      context.strokeStyle = `rgba(198, 232, 242, ${particle.life * .55})`
      context.lineWidth = 1.4 - progress * .5
      context.beginPath()
      context.ellipse(0, 0, radius, radius * particle.tilt, 0, 0, Math.PI * 2)
      context.stroke()
      context.strokeStyle = `rgba(235, 249, 255, ${particle.life * .26})`
      context.lineWidth = .8
      context.beginPath()
      context.ellipse(0, 0, radius * .58, radius * particle.tilt * .58, 0, 0, Math.PI * 2)
      context.stroke()
      context.restore()
    }

    const drawBloom = (particle) => {
      const progress = 1 - particle.life
      const size = 5 + progress * 20
      context.save()
      context.translate(particle.x, particle.y)
      context.rotate(particle.rotation + progress * .8)
      context.globalAlpha = particle.life * .7
      for (let index = 0; index < 5; index += 1) {
        context.save()
        context.rotate((Math.PI * 2 * index) / 5)
        context.fillStyle = ROSE_COLORS[index % ROSE_COLORS.length]
        context.beginPath()
        context.ellipse(0, -size * .38, size * .28, size * .48, 0, 0, Math.PI * 2)
        context.fill()
        context.restore()
      }
      context.fillStyle = '#f7d8cf'
      context.beginPath()
      context.arc(0, 0, size * .2, 0, Math.PI * 2)
      context.fill()
      context.restore()
    }

    const drawPetal = (particle) => {
      context.save()
      context.translate(particle.x, particle.y)
      context.rotate(particle.rotation)
      context.fillStyle = particle.color
      context.globalAlpha = particle.life * .82
      context.beginPath()
      context.ellipse(0, 0, particle.size, particle.size * .58, 0, 0, Math.PI * 2)
      context.fill()
      context.restore()
    }

    const drawSpark = (particle) => {
      const glow = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 4)
      glow.addColorStop(0, `rgba(255, 244, 208, ${particle.life * .58})`)
      glow.addColorStop(1, 'rgba(255, 244, 208, 0)')
      context.fillStyle = glow
      context.beginPath()
      context.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
      context.fill()
      context.fillStyle = `rgba(255, 250, 230, ${particle.life * .82})`
      context.beginPath()
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      context.fill()
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index]
        if (particle.kind !== 'ripple' && particle.kind !== 'bloom') {
          particle.x += particle.vx
          particle.y += particle.vy
          particle.vx *= .985
          particle.vy *= .985
        }
        if (particle.kind === 'petal') particle.rotation += particle.spin
        particle.life -= particle.kind === 'fog' ? .013 : .022
        if (particle.life <= 0) {
          particles.splice(index, 1)
          continue
        }
        if (particle.kind === 'fog') drawFog(particle)
        else if (particle.kind === 'sand') drawSand(particle)
        else if (particle.kind === 'ripple') drawRipple(particle)
        else if (particle.kind === 'bloom') drawBloom(particle)
        else if (particle.kind === 'petal') drawPetal(particle)
        else drawSpark(particle)
      }
      frameId = requestAnimationFrame(draw)
    }

    const clearPointer = () => {
      previousPoint = null
    }

    const observer = new ResizeObserver(resize)
    resize()
    observer.observe(frame)
    frame.addEventListener('pointermove', movePointer, { passive: true })
    frame.addEventListener('pointerleave', clearPointer)
    frameId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      frame.removeEventListener('pointermove', movePointer)
      frame.removeEventListener('pointerleave', clearPointer)
    }
  }, [effect, frameRef, reducedMotion])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
