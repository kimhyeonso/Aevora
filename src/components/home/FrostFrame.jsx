import { useEffect, useRef } from 'react'
import background from '../../assets/home/01blanche.png'
import styles from './FrostFrame.module.scss'

const GRID_COLS = 28
const GRID_ROWS = 16
const REVEAL_THRESHOLD = .4
const BRUSH_RADIUS = 140

export default function FrostFrame({ glassRef, reducedMotion, onProgress, onRevealed }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const glass = glassRef.current
    if (!canvas || !glass) return undefined
    const context = canvas.getContext('2d')
    let width = 0
    let height = 0
    let revealed = false
    let bgImage = null
    let lastPoint = null
    const touched = new Set()

    function drawFrost() {
      context.clearRect(0, 0, width, height)
      if (bgImage) {
        context.save()
        context.filter = 'blur(24px) saturate(.9) brightness(1.05)'
        const scale = Math.max(width / bgImage.width, height / bgImage.height) * 1.1
        const dw = bgImage.width * scale
        const dh = bgImage.height * scale
        context.drawImage(bgImage, (width - dw) / 2, (height - dh) / 2, dw, dh)
        context.restore()
      } else {
        context.fillStyle = '#efe9dc'
        context.fillRect(0, 0, width, height)
      }
      context.fillStyle = 'rgba(244, 241, 232, .5)'
      context.fillRect(0, 0, width, height)
      const speckles = Math.floor((width * height) / 1400)
      for (let i = 0; i < speckles; i += 1) {
        context.fillStyle = `rgba(255, 255, 255, ${.05 + Math.random() * .1})`
        context.beginPath()
        context.arc(Math.random() * width, Math.random() * height, Math.random() * 1.3, 0, Math.PI * 2)
        context.fill()
      }
    }

    function resize() {
      width = glass.offsetWidth; height = glass.offsetHeight
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      drawFrost()
    }

    function cellKey(x, y) {
      const col = Math.min(GRID_COLS - 1, Math.max(0, Math.floor((x / width) * GRID_COLS)))
      const row = Math.min(GRID_ROWS - 1, Math.max(0, Math.floor((y / height) * GRID_ROWS)))
      return col * GRID_ROWS + row
    }

    function eraseAt(x, y) {
      context.globalCompositeOperation = 'destination-out'
      const gradient = context.createRadialGradient(x, y, 0, x, y, BRUSH_RADIUS)
      gradient.addColorStop(0, 'rgba(0, 0, 0, .9)')
      gradient.addColorStop(.65, 'rgba(0, 0, 0, .5)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      context.fillStyle = gradient
      context.beginPath()
      context.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2)
      context.fill()
      context.globalCompositeOperation = 'source-over'
      touched.add(cellKey(x, y))
    }

    function reveal() {
      revealed = true
      canvas.style.transition = 'opacity 1.2s ease'
      canvas.style.opacity = '0'
      onRevealed?.()
    }

    function reportProgress() {
      const coverage = touched.size / (GRID_COLS * GRID_ROWS)
      onProgress?.(Math.min(1, coverage / REVEAL_THRESHOLD))
      if (!revealed && coverage >= REVEAL_THRESHOLD) reveal()
    }

    function handlePointer(event) {
      if (revealed) return
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      if (x < 0 || y < 0 || x > width || y > height) { lastPoint = null; return }
      if (lastPoint) {
        const distance = Math.hypot(x - lastPoint.x, y - lastPoint.y)
        const steps = Math.max(1, Math.ceil(distance / (BRUSH_RADIUS * .5)))
        for (let step = 1; step <= steps; step += 1) {
          const t = step / steps
          eraseAt(lastPoint.x + (x - lastPoint.x) * t, lastPoint.y + (y - lastPoint.y) * t)
        }
      } else {
        eraseAt(x, y)
      }
      lastPoint = { x, y }
      reportProgress()
    }
    function handleLeave() { lastPoint = null }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(glass)

    const image = new Image()
    image.src = background
    image.onload = () => { bgImage = image; drawFrost() }

    if (reducedMotion) {
      canvas.style.opacity = '0'
      onProgress?.(1)
      onRevealed?.()
    } else {
      glass.addEventListener('pointermove', handlePointer)
      glass.addEventListener('pointerleave', handleLeave)
    }

    return () => {
      observer.disconnect()
      glass.removeEventListener('pointermove', handlePointer)
      glass.removeEventListener('pointerleave', handleLeave)
    }
  }, [glassRef, reducedMotion, onProgress, onRevealed])

  return <canvas className={styles.frost} ref={canvasRef} aria-hidden="true" />
}
