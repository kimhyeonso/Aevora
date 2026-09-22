import { useEffect, useRef } from 'react'
import background01 from '../../../assets/intro/scene04/background01.png'
import background02 from '../../../assets/intro/scene04/background02.png'
import PetalDrift from './PetalDrift'
import CursorPetals from './CursorPetals'
import PetalWipe from './PetalWipe'
import ParticleDissolve, { EDGE_SCALE, EDGE_OFFSET } from './ParticleDissolve'
import { createScrollTimeline, gsap } from '../../../utils/gsapSetup'
import useReducedMotion from '../../../hooks/useReducedMotion'
import styles from './Scene04.module.scss'

export default function Scene04() {
  const sceneRef = useRef(null)
  const frameRef = useRef(null)
  const dissolveRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const scene = sceneRef.current
    const frame = frameRef.current
    if (!scene || !frame) return undefined

    const context = gsap.context(() => {
      const select = gsap.utils.selector(frame)
      const selectClass = (className) => select(`.${styles[className]}`)

      if (reducedMotion) {
        gsap.set(selectClass('scene04-background--one'), { autoAlpha: 0 })
        gsap.set(selectClass('scene04-background--two'), { autoAlpha: 1 })
        gsap.set(selectClass('scene04-petals'), { opacity: .8 })
        gsap.set(selectClass('scene04-copy--two'), { autoAlpha: 1, y: 0, filter: 'blur(0px)' })
        return
      }

      gsap.set(selectClass('scene04-copy'), { autoAlpha: 0, y: 22, filter: 'blur(10px)', '--scene04-copy-backdrop': 0 })
      gsap.set(selectClass('scene04-background--two'), { autoAlpha: 0 })
      gsap.set(selectClass('scene04-petals'), { opacity: 0 })
      gsap.set(selectClass('scene04-wipe-petal'), { autoAlpha: 0, x: 0, rotation: () => gsap.utils.random(-35, 35) })
      frame.style.setProperty('--dissolve-edge', `${-EDGE_OFFSET * 100}%`)
      gsap.set(frame, { autoAlpha: 0 })

      const timeline = createScrollTimeline({
        id: 'scene04',
        trigger: scene,
        start: 'top top',
        end: '+=7400',
      })

      timeline
        .to(frame, { autoAlpha: 1, duration: .12 }, 0)
        .to(selectClass('scene04-background--one'), { scale: 1.02, duration: .15 }, 0)
        .to(selectClass('scene04-petals'), { opacity: .85, duration: .2 }, .1)
        .to(selectClass('scene04-copy--one'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .16 }, .28)
        .to(selectClass('scene04-copy--one'), { '--scene04-copy-backdrop': .9, duration: .1 }, .28)
        .addLabel('windScent', .46)
        .to(selectClass('scene04-copy--one'), { autoAlpha: 0, y: -14, filter: 'blur(7px)', '--scene04-copy-backdrop': 0, duration: .12 }, .52)
        .to(selectClass('scene04-background--one'), { autoAlpha: 0, scale: 1.05, duration: .2 }, .5)
        .to(selectClass('scene04-background--two'), { autoAlpha: 1, scale: 1.02, duration: .2 }, .5)
        .to(selectClass('scene04-petals'), { opacity: 1, duration: .15 }, .55)
        .to(selectClass('scene04-copy--two'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .18 }, .82)
        .to(selectClass('scene04-copy--two'), { '--scene04-copy-backdrop': .9, duration: .12 }, .84)
        .to(selectClass('scene04-wipe-petal'), { autoAlpha: 1, duration: .05, stagger: { each: .0015, from: 'start' } }, 1.3)
        .to(selectClass('scene04-copy--two'), { autoAlpha: 0, duration: .1 }, 1.32)
        .to([...selectClass('scene04-petals'), ...selectClass('scene04-vignette')], { autoAlpha: 0, duration: .1 }, 1.34)
        .to({ value: 0 }, {
          value: 1,
          duration: .76,
          ease: 'none',
          onUpdate() {
            const progress = this.targets()[0].value
            dissolveRef.current?.setProgress(progress)
            frame.style.setProperty('--dissolve-edge', `${(progress * EDGE_SCALE - EDGE_OFFSET) * 100}%`)
          },
        }, 1.3)
        .to(selectClass('scene04-wipe-petal'), {
          x: () => gsap.utils.random(-.2, 1.3) * frame.getBoundingClientRect().width,
          y: () => gsap.utils.random(-180, 240),
          rotation: () => gsap.utils.random(-320, 320),
          duration: () => gsap.utils.random(.32, .68),
          ease: 'power1.in',
          stagger: { amount: .16, from: 'random' },
        }, 1.35)
        .to(selectClass('scene04-wipe-petal'), { autoAlpha: 0, duration: .2, stagger: { amount: .1, from: 'random' } }, 1.6)
    }, scene)

    return () => context.revert()
  }, [reducedMotion])

  return <section id="scene04" className={styles.scene04} ref={sceneRef} aria-label="The scent of flowers carried on the wind">
    <div className={styles['scene04-frame']} ref={frameRef}>
      <img className={`${styles['scene04-background']} ${styles['scene04-background--one']}`} src={background01} alt="바람에 흔들리는 꽃이 있는 들판" aria-hidden="true" />
      <img className={`${styles['scene04-background']} ${styles['scene04-background--two']}`} src={background02} alt="꽃잎이 흩날리는 계절의 풍경" aria-hidden="true" />
      <ParticleDissolve ref={dissolveRef} />
      <PetalDrift />
      <CursorPetals frameRef={frameRef} active={!reducedMotion} />
      <p className={`${styles['scene04-copy']} ${styles['scene04-copy--one']}`}>바람에 실려온 꽃의 향으로</p>
      <p className={`${styles['scene04-copy']} ${styles['scene04-copy--two']}`}>계절을 기억했다.</p>
      <div className={styles['scene04-vignette']} aria-hidden="true" />
      <PetalWipe />
    </div>
  </section>
}
