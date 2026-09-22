import { useEffect, useRef } from 'react'
import NatureObjects from './NatureObjects'
import PerfumeBottle from './PerfumeBottle'
import { createScrollTimeline, gsap } from '../../../utils/gsapSetup'
import useReducedMotion from '../../../hooks/useReducedMotion'
import styles from './Scene06.module.scss'

const CLUSTER_OFFSET = {
  petal: { x: 0, y: -20 },
  droplet: { x: -16, y: 6 },
  leaf: { x: 16, y: 6 },
  light: { x: 0, y: 26 },
}

export default function Scene06() {
  const sceneRef = useRef(null)
  const frameRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const scene = sceneRef.current
    const frame = frameRef.current
    if (!scene || !frame) return undefined

    const context = gsap.context(() => {
      const select = gsap.utils.selector(frame)
      const selectClass = (className) => select(`.${styles[className]}`)

      if (reducedMotion) {
        gsap.set(selectClass('scene06-object--tree'), { autoAlpha: 0 })
        gsap.set([...selectClass('scene06-object--petal'), ...selectClass('scene06-object--droplet'), ...selectClass('scene06-object--leaf'), ...selectClass('scene06-object--light')], { autoAlpha: 1, scale: 1 })
        gsap.set(selectClass('scene06-glow'), { opacity: .7 })
        gsap.set(selectClass('scene06-bottle-path'), { strokeDashoffset: 0 })
        gsap.set(selectClass('scene06-line--one'), { autoAlpha: 0 })
        gsap.set(selectClass('scene06-line--two'), { autoAlpha: 1, y: 0, filter: 'blur(0px)' })
        return
      }

      gsap.set(selectClass('scene06-line'), { autoAlpha: 0, y: 16, filter: 'blur(8px)' })
      gsap.set(selectClass('scene06-glow'), { opacity: 0 })
      gsap.set(frame, { autoAlpha: 0 })

      const centerX = (offsetX) => (index, target) => {
        const r = target.getBoundingClientRect()
        const f = frame.getBoundingClientRect()
        return (f.left + f.width / 2) - (r.left + r.width / 2) + offsetX
      }
      const centerY = (offsetY) => (index, target) => {
        const r = target.getBoundingClientRect()
        const f = frame.getBoundingClientRect()
        return (f.top + f.height / 2) - (r.top + r.height / 2) + offsetY
      }

      const timeline = createScrollTimeline({
        id: 'scene06',
        trigger: scene,
        start: 'top top',
        end: '+=3800',
      })

      timeline
        .to(frame, { autoAlpha: 1, duration: .08 }, 0)
        .addLabel('fiveElements', .15)
        .to(selectClass('scene06-object--tree'), { autoAlpha: 0, scale: .7, duration: .16 }, .28)
        .to(selectClass('scene06-line--one'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .14 }, .32)
        .to(selectClass('scene06-object--petal'), {
          x: centerX(CLUSTER_OFFSET.petal.x), y: centerY(CLUSTER_OFFSET.petal.y),
          scale: .6, rotation: () => gsap.utils.random(-30, 30), duration: .22, ease: 'power2.inOut',
        }, .3)
        .to(selectClass('scene06-object--droplet'), {
          x: centerX(CLUSTER_OFFSET.droplet.x), y: centerY(CLUSTER_OFFSET.droplet.y),
          scale: .6, rotation: () => gsap.utils.random(-30, 30), duration: .22, ease: 'power2.inOut',
        }, .33)
        .to(selectClass('scene06-object--leaf'), {
          x: centerX(CLUSTER_OFFSET.leaf.x), y: centerY(CLUSTER_OFFSET.leaf.y),
          scale: .6, rotation: () => gsap.utils.random(-30, 30), duration: .22, ease: 'power2.inOut',
        }, .36)
        .to(selectClass('scene06-object--light'), {
          x: centerX(CLUSTER_OFFSET.light.x), y: centerY(CLUSTER_OFFSET.light.y),
          scale: .6, rotation: () => gsap.utils.random(-30, 30), duration: .22, ease: 'power2.inOut',
        }, .39)
        .to(selectClass('scene06-glow'), { opacity: .55, duration: .2 }, .5)
        .to(selectClass('scene06-line--one'), { autoAlpha: 0, y: -12, filter: 'blur(6px)', duration: .14 }, .62)
        .to(selectClass('scene06-bottle-path'), { strokeDashoffset: 0, duration: .32, ease: 'power1.inOut' }, .56)
        .to(selectClass('scene06-glow'), { opacity: .85, duration: .15 }, .84)
        .to(selectClass('scene06-line--two'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .18 }, .88)
    }, scene)

    return () => context.revert()
  }, [reducedMotion])

  return <section id="scene06" className={styles.scene06} ref={sceneRef} aria-label="Gathering moments into a bottle">
    <div className={styles['scene06-frame']} ref={frameRef}>
      <div className={styles['scene06-glow']} aria-hidden="true" />
      <NatureObjects />
      <PerfumeBottle />
      <p className={`${styles['scene06-line']} ${styles['scene06-line--one']}`}>그리고 시간이 흘러,</p>
      <p className={`${styles['scene06-line']} ${styles['scene06-line--two']}`}>우리는 그 순간들을<br />작은 병 안에 담기 시작했다.</p>
    </div>
  </section>
}
