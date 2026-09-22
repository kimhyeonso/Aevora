import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import background02 from '../../../assets/intro/scene04/background02.png'
import styles from './Scene04.module.scss'

export const EDGE_SCALE = 1.18
export const EDGE_OFFSET = .08

const isSmallViewport = () => window.innerWidth < 700

const ParticleDissolve = forwardRef(function ParticleDissolve(_props, ref) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const sizeRef = useRef({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return undefined
    const context = canvas.getContext('2d')
    let cancelled = false

    function buildParticles(width, height) {
      const image = new Image()
      image.src = background02
      image.onload = () => {
        if (cancelled) return
        const small = isSmallViewport()
        const cols = small ? 44 : 72
        const rows = small ? 26 : 42
        const sampleCanvas = document.createElement('canvas')
        sampleCanvas.width = cols
        sampleCanvas.height = rows
        const sctx = sampleCanvas.getContext('2d')
        const targetAspect = width / height
        const imageAspect = image.width / image.height
        let sx; let sy; let sw; let sh
        if (imageAspect > targetAspect) {
          sh = image.height
          sw = sh * targetAspect
          sx = (image.width - sw) / 2
          sy = 0
        } else {
          sw = image.width
          sh = sw / targetAspect
          sx = 0
          sy = (image.height - sh) * .76
        }
        sctx.drawImage(image, sx, sy, sw, sh, 0, 0, cols, rows)
        const { data } = sctx.getImageData(0, 0, cols, rows)
        const particles = []
        for (let row = 0; row < rows; row += 1) {
          for (let col = 0; col < cols; col += 1) {
            const i = (row * cols + col) * 4
            const r = data[i]; const g = data[i + 1]; const b = data[i + 2]
            const luminance = (r * .299 + g * .587 + b * .114) / 255
            const x0 = col / (cols - 1)
            const y0 = row / (rows - 1)
            particles.push({
              x0,
              y0,
              r,
              g,
              b,
              size: .8 + luminance * 2.2,
              delay: (x0 + EDGE_OFFSET) / EDGE_SCALE,
              driftX: .12 + Math.random() * .4,
              driftY: (Math.random() - .7) * .18,
              phase: Math.random() * Math.PI * 2,
            })
          }
        }
        particlesRef.current = particles
      }
    }

    function resize() {
      const bounds = parent.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      sizeRef.current = { width: bounds.width, height: bounds.height }
      canvas.width = Math.round(bounds.width * ratio)
      canvas.height = Math.round(bounds.height * ratio)
      canvas.style.width = `${bounds.width}px`
      canvas.style.height = `${bounds.height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      if (particlesRef.current.length === 0 && bounds.width && bounds.height) buildParticles(bounds.width, bounds.height)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    return () => { cancelled = true; observer.disconnect() }
  }, [])

  useImperativeHandle(ref, () => ({
    setProgress(progress) {
      const canvas = canvasRef.current
      const particles = particlesRef.current
      if (!canvas) return
      const { width, height } = sizeRef.current
      const context = canvas.getContext('2d')
      context.clearRect(0, 0, width, height)
      if (progress <= 0 || !particles.length) return
      context.globalCompositeOperation = 'lighter'
      particles.forEach((particle) => {
        const local = (progress - particle.delay) / (1 - particle.delay)
        if (local <= 0 || local > 1) return
        const envelope = Math.sin(Math.PI * local)
        if (envelope <= .015) return
        const ease = local * local
        const x = (particle.x0 + particle.driftX * ease) * width
        const y = (particle.y0 + particle.driftY * ease + Math.sin(local * 7 + particle.phase) * .012) * height
        const radius = particle.size * (1 + ease * 1.8)
        const glow = context.createRadialGradient(x, y, 0, x, y, radius * 3.2)
        glow.addColorStop(0, `rgba(${particle.r}, ${particle.g}, ${particle.b}, ${envelope})`)
        glow.addColorStop(1, `rgba(${particle.r}, ${particle.g}, ${particle.b}, 0)`)
        context.fillStyle = glow
        context.beginPath(); context.arc(x, y, radius * 3.2, 0, Math.PI * 2); context.fill()
        context.fillStyle = `rgba(255, 250, 235, ${envelope})`
        context.beginPath(); context.arc(x, y, radius * .4, 0, Math.PI * 2); context.fill()
      })
      context.globalCompositeOperation = 'source-over'
    },
  }), [])

  return <canvas className={styles['scene04-dissolve']} ref={canvasRef} aria-hidden="true" />
})

export default ParticleDissolve
