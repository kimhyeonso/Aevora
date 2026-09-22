import { useEffect, useRef } from 'react'
import background from '../../../assets/intro/scene02/background01.png'
import background02 from '../../../assets/intro/scene02/background02.png'
import LeafDrift from './LeafDrift'
import Rain from './Rain'
import { createScrollTimeline, gsap } from '../../../utils/gsapSetup'
import useReducedMotion from '../../../hooks/useReducedMotion'
import styles from './Scene02.module.scss'
import scene03Styles from '../Scene03/Scene03.module.scss'

export default function Scene02() {
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
      const selectScene03 = (className) => document.querySelectorAll(`.${scene03Styles[className]}`)
      if (reducedMotion) {
        gsap.set([...selectClass('scene02-background--one'), ...selectClass('scene02-background--two')], { autoAlpha: 0 })
        gsap.set(selectClass('scene02-background--three'), { autoAlpha: 1, scale: 1.08 })
        gsap.set(selectClass('scene02-sunrays'), { opacity: .74 })
        gsap.set([...selectClass('scene02-leaves'), ...selectClass('scene02-copy--last')], { autoAlpha: 1 })
        gsap.set(selectClass('scene02-rain'), { opacity: .3 })
        return
      }

      gsap.set(selectClass('scene02-copy'), { autoAlpha: 0, y: 22, filter: 'blur(8px)' })
      gsap.set(selectClass('scene02-rain'), { '--rain-intensity': 0 })
      gsap.set(frame, { autoAlpha: 1 })
      gsap.set(selectScene03('scene03-hero-droplet'), { top: '-220px', autoAlpha: 1 })
      gsap.set(selectScene03('scene03-splash'), { opacity: 0 })
      gsap.set(selectScene03('scene03-ripple-ring'), { opacity: 0, scale: 0 })
      gsap.set(selectScene03('scene03-light-falloff'), { opacity: 0 })
      gsap.set(selectScene03('scene03-copy'), { autoAlpha: 1, '--scene03-copy-backdrop': 0 })
      gsap.set(selectScene03('scene03-copy-character'), { autoAlpha: 0, y: 8, filter: 'blur(4px)' })
      const timeline = createScrollTimeline({
        id: 'scene02',
        trigger: scene,
        pin: frame,
        start: 'top top',
        end: '+=4600',
      })

      timeline
        .to(selectClass('scene02-background--one'), { scale: 1.02, duration: .15 }, 0)
        .to(selectClass('scene02-background--one'), { autoAlpha: 0, scale: 1.03, duration: .16 }, .17)
        .to(selectClass('scene02-background--two'), { autoAlpha: 1, scale: 1.01, duration: .16 }, .17)
        .to(selectClass('scene02-sunrays'), { opacity: .64, duration: .2 }, .18)
        .to(selectClass('scene02-copy--middle'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .15 }, .31)
        .addLabel('walk', .46)
        .to(selectClass('scene02-copy--middle'), { autoAlpha: 0, y: -12, filter: 'blur(7px)', duration: .1 }, .58)
        .to(selectClass('scene02-background--two'), { autoAlpha: 0, scale: 1.03, duration: .22 }, .5)
        .to(selectClass('scene02-background--three'), { autoAlpha: 1, scale: 1.02, duration: .22 }, .5)
        .to(selectClass('scene02-sunrays'), { opacity: .92, duration: .2 }, .52)
        .to(selectClass('scene02-copy--last'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .15 }, .7)
        .to(selectClass('scene02-background--three'), { scale: 1.12, duration: .3 }, .7)
        .to(selectClass('scene02-copy--last'), { autoAlpha: 0, y: -10, filter: 'blur(6px)', duration: .08 }, .9)
        .to(selectClass('scene02-rain'), { opacity: .38, '--rain-intensity': .3, duration: .08 }, .92)
        .to(selectClass('scene02-sunrays'), { opacity: .52, duration: .08 }, .92)
        .to(selectClass('scene02-rain'), { opacity: .94, '--rain-intensity': 1, duration: .22 }, 1)
        .to(selectClass('scene02-sunrays'), { opacity: .12, duration: .22 }, 1)
        .to(selectClass('scene02-background--three'), { scale: 1.34, filter: 'blur(13px) brightness(.48)', yPercent: -16, duration: .09 }, 1.05)
        .to(selectClass('scene02-background--three'), { autoAlpha: 0, duration: .09 }, 1.06)
        .to(selectClass('scene02-rain'), { opacity: .12, duration: .09 }, 1.06)
        .to([...selectClass('scene02-leaves'), ...selectClass('scene02-sunrays'), ...selectClass('scene02-vignette')], { autoAlpha: 0, duration: .06 }, 1.09)
        .to(selectScene03('scene03-hero-droplet'), { top: '75%', duration: .11, ease: 'power1.in' }, 1.09)
        .to(frame, { autoAlpha: 0, duration: .06 }, 1.12)
        .to(selectClass('scene02-rain'), { opacity: 0, duration: .06 }, 1.12)
        .to(selectScene03('scene03-light-falloff'), { opacity: 1, duration: .13 }, 1.11)
        .to(selectScene03('scene03-hero-droplet'), { top: '78%', autoAlpha: 0, duration: .03 }, 1.2)
        .to(selectScene03('scene03-splash'), { opacity: 1, duration: .02 }, 1.2)
        .to(selectScene03('scene03-splash'), { opacity: 0, duration: .06 }, 1.22)
        .to(selectScene03('scene03-ripple-ring'), { opacity: .55, scale: 1, duration: .11, stagger: .02, ease: 'power2.out' }, 1.2)
        .to(selectScene03('scene03-ripple-ring'), { opacity: 0, duration: .09, stagger: .02 }, 1.3)
        .to(selectScene03('scene03-copy'), { '--scene03-copy-backdrop': .92, duration: .11 }, 1.32)
        .to(selectScene03('scene03-copy-character'), {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: .24,
          stagger: { each: .015, from: 'center' },
        }, 1.34)
        .addLabel('rainDrop', 1.5)
    }, scene)

    return () => context.revert()
  }, [reducedMotion])

  return <section id="scene02" className={styles.scene02} ref={sceneRef} aria-label="Entering the living forest">
    <div className={styles['scene02-frame']} ref={frameRef}>
      <img className={`${styles['scene02-background']} ${styles['scene02-background--one']}`} src={background} alt="햇살이 비치는 숲 풍경" aria-hidden="true" />
      <img className={`${styles['scene02-background']} ${styles['scene02-background--two']}`} src={background02} alt="비가 내리기 시작한 숲 풍경" aria-hidden="true" />
      <img className={`${styles['scene02-background']} ${styles['scene02-background--three']}`} src={background02} alt="빗속의 깊은 숲 풍경" aria-hidden="true" />
      <div className={styles['scene02-sunrays']} aria-hidden="true" />
      <LeafDrift />
      <p className={`${styles['scene02-copy']} ${styles['scene02-copy--middle']}`}>사람들은 숲을 지나며,</p>
      <p className={`${styles['scene02-copy']} ${styles['scene02-copy--last']}`}>나무의 냄새를 기억했고</p>
      <Rain reducedMotion={reducedMotion} frameRef={frameRef} />
      <div className={styles['scene02-vignette']} aria-hidden="true" />
    </div>
  </section>
}
