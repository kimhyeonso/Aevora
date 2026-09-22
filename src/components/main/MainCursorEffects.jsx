import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsapSetup'
import styles from './MainCursorEffects.module.scss'

const MOVE_THRESHOLD = {
  light: 22,
  dust: 8,
  sunlight: 24,
  petals: 20,
}

const MAX_NODES = {
  light: 18,
  dust: 64,
  sunlight: 16,
  petals: 36,
}

const ROSE_COLORS = ['#f5c6cc', '#df8698', '#bc526a', '#f9dce0']

export default function MainCursorEffects({ frameRef, reducedMotion, effect }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const frame = frameRef.current
    if (!container || !frame || reducedMotion) return undefined

    const activeNodes = new Set()
    let previousPoint = null

    const removeNode = (node) => {
      gsap.killTweensOf(node)
      node.remove()
      activeNodes.delete(node)
    }

    const appendNode = (node) => {
      container.appendChild(node)
      activeNodes.add(node)
      const limit = MAX_NODES[effect] ?? 24
      if (activeNodes.size > limit) removeNode(activeNodes.values().next().value)
    }

    const animateNode = (node, from, to) => {
      appendNode(node)
      gsap.fromTo(node, from, {
        ...to,
        overwrite: 'auto',
        onComplete: () => removeNode(node),
      })
    }

    const positionNode = (node, x, y) => {
      node.style.left = `${x}px`
      node.style.top = `${y}px`
    }

    const spawnFog = (x, y, direction) => {
      const fog = document.createElement('span')
      fog.className = styles.fog
      positionNode(fog, x - direction.x * 12, y - direction.y * 12)
      animateNode(fog, {
        xPercent: -50,
        yPercent: -50,
        x: -18 + Math.random() * 36,
        y: -12 + Math.random() * 24,
        scale: .45,
        autoAlpha: .42,
      }, {
        x: -direction.x * 30 + (Math.random() - .5) * 28,
        y: -direction.y * 22 + (Math.random() - .5) * 18,
        scale: 2.6 + Math.random() * .7,
        autoAlpha: 0,
        duration: 1.7 + Math.random() * .35,
        ease: 'power2.out',
      })
    }

    const spawnSand = (x, y, direction) => {
      const count = 5 + Math.floor(Math.random() * 3)
      for (let index = 0; index < count; index += 1) {
        const grain = document.createElement('span')
        grain.className = styles.sand
        const size = 1 + Math.random() * 2.2
        grain.style.width = `${size}px`
        grain.style.height = `${size}px`
        positionNode(grain, x + (Math.random() - .5) * 10, y + (Math.random() - .5) * 10)
        animateNode(grain, {
          xPercent: -50,
          yPercent: -50,
          scale: .5,
          autoAlpha: .9,
        }, {
          x: -direction.x * (18 + Math.random() * 34) + (Math.random() - .5) * 32,
          y: -direction.y * (10 + Math.random() * 24) + (Math.random() - .5) * 28,
          scale: .1,
          autoAlpha: 0,
          duration: .65 + Math.random() * .4,
          ease: 'power2.out',
        })
      }
    }

    const spawnRipple = (x, y) => {
      const ripple = document.createElement('span')
      ripple.className = styles.ripple
      positionNode(ripple, x, y)
      animateNode(ripple, {
        xPercent: -50,
        yPercent: -50,
        scale: .14,
        rotation: Math.random() * 180,
        autoAlpha: .72,
      }, {
        scale: 1.9 + Math.random() * .45,
        autoAlpha: 0,
        duration: 1.05 + Math.random() * .25,
        ease: 'power2.out',
      })
    }

    const spawnRose = (x, y, direction) => {
      const bloom = document.createElement('span')
      bloom.className = styles.roseBloom
      bloom.style.setProperty('--rose-color', ROSE_COLORS[Math.floor(Math.random() * ROSE_COLORS.length)])
      positionNode(bloom, x - direction.x * 8, y - direction.y * 8)
      for (let index = 0; index < 5; index += 1) {
        const petal = document.createElement('i')
        petal.className = styles.rosePetal
        petal.style.setProperty('--petal-angle', `${index * 72 + (Math.random() - .5) * 16}deg`)
        bloom.appendChild(petal)
      }
      animateNode(bloom, {
        xPercent: -50,
        yPercent: -50,
        scale: .2,
        rotation: -18,
        autoAlpha: .1,
      }, {
        scale: 1.25,
        rotation: 24,
        autoAlpha: 0,
        duration: 1.25,
        ease: 'power2.out',
      })

      for (let index = 0; index < 2; index += 1) {
        const petal = document.createElement('span')
        petal.className = styles.roseDrift
        petal.style.setProperty('--rose-color', ROSE_COLORS[Math.floor(Math.random() * ROSE_COLORS.length)])
        positionNode(petal, x + (Math.random() - .5) * 12, y + (Math.random() - .5) * 12)
        animateNode(petal, {
          xPercent: -50,
          yPercent: -50,
          scale: .5,
          rotation: Math.random() * 180,
          autoAlpha: .9,
        }, {
          x: -direction.x * (20 + Math.random() * 24) + (Math.random() - .5) * 28,
          y: -direction.y * (14 + Math.random() * 20) + (Math.random() - .5) * 26,
          scale: .2,
          rotation: (Math.random() - .5) * 300,
          autoAlpha: 0,
          duration: .9 + Math.random() * .3,
          ease: 'power2.out',
        })
      }
    }

    const spawnEffect = (x, y, distance, deltaX, deltaY) => {
      const direction = { x: deltaX / distance, y: deltaY / distance }
      if (effect === 'light') spawnFog(x, y, direction)
      else if (effect === 'dust') spawnSand(x, y, direction)
      else if (effect === 'sunlight') spawnRipple(x, y)
      else if (effect === 'petals') spawnRose(x, y, direction)
    }

    const movePointer = (event) => {
      const bounds = frame.getBoundingClientRect()
      const point = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
      if (previousPoint) {
        const deltaX = point.x - previousPoint.x
        const deltaY = point.y - previousPoint.y
        const distance = Math.hypot(deltaX, deltaY)
        if (distance > (MOVE_THRESHOLD[effect] ?? 18)) spawnEffect(point.x, point.y, distance, deltaX, deltaY)
      }
      previousPoint = point
    }

    const clearPointer = () => {
      previousPoint = null
    }

    frame.addEventListener('pointermove', movePointer, { passive: true })
    frame.addEventListener('pointerleave', clearPointer)

    return () => {
      frame.removeEventListener('pointermove', movePointer)
      frame.removeEventListener('pointerleave', clearPointer)
      Array.from(activeNodes).forEach((node) => removeNode(node))
    }
  }, [effect, frameRef, reducedMotion])

  return <div ref={containerRef} className={styles.effects} aria-hidden="true" />
}
