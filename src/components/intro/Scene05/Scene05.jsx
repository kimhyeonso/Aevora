import { useEffect, useRef } from 'react'
import glimpse01 from '../../../assets/intro/Scene05/background01.png'
import glimpse02 from '../../../assets/intro/Scene05/background02.png'
import glimpse03 from '../../../assets/intro/Scene05/background03.png'
import { createScrollTimeline, gsap } from '../../../utils/gsapSetup'
import useReducedMotion from '../../../hooks/useReducedMotion'
import styles from './Scene05.module.scss'

export default function Scene05() {
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
        gsap.set(selectClass('scene05-line'), { autoAlpha: 0 })
        gsap.set(selectClass('scene05-line--four'), { autoAlpha: 1 })
        return
      }

      gsap.set(selectClass('scene05-line'), { autoAlpha: 0, y: 16, filter: 'blur(8px)' })
      gsap.set(selectClass('scene05-glimpse'), { autoAlpha: 0 })
      // This scene is almost bare on purpose, so the frame itself starts
      // invisible and fades in over Scene04's held content, the same
      // crossfade technique used for the Scene03→Scene04 handoff.
      gsap.set(frame, { autoAlpha: 0 })

      // No `pin` — the frame is permanently fixed via CSS instead (see
      // Scene05.module.scss), matching Scene04/06's frames: a GSAP-pinned
      // frame reverts to normal flow once its range ends and physically
      // scrolls away, briefly exposing whatever's behind it (the bug fixed
      // on Scene04 — see the comment on .scene04-frame for the full story).
      // Scene06 is now pinned right after this one, so this scene needs the
      // same fix to hand off to it cleanly.
      const timeline = createScrollTimeline({
        trigger: scene,
        start: 'top top',
        end: '+=3600',
      })

      timeline
        // 0–8%: the frame settles in as pure dark space.
        .to(frame, { autoAlpha: 1, duration: .08 }, 0)
        // 8–30%: the first line stands alone in the dark, then fades.
        .to(selectClass('scene05-line--one'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .14 }, .08)
        .to(selectClass('scene05-line--one'), { autoAlpha: 0, y: -12, filter: 'blur(6px)', duration: .1 }, .3)
        // 30–44%: background01 arrives, then "a place" follows it.
        .to(selectClass('scene05-glimpse--one'), { autoAlpha: .4, duration: .04 }, .3)
        .to(selectClass('scene05-glimpse--one'), { autoAlpha: 0, duration: .1 }, .34)
        .to(selectClass('scene05-line--two'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .14 }, .34)
        .to(selectClass('scene05-line--two'), { autoAlpha: 0, y: -12, filter: 'blur(6px)', duration: .1 }, .56)
        // 56–70%: background02 arrives, then "a moment" follows it.
        .to(selectClass('scene05-glimpse--two'), { autoAlpha: .4, duration: .04 }, .56)
        .to(selectClass('scene05-glimpse--two'), { autoAlpha: 0, duration: .1 }, .6)
        .to(selectClass('scene05-line--three'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .14 }, .6)
        .to(selectClass('scene05-line--three'), { autoAlpha: 0, y: -12, filter: 'blur(6px)', duration: .1 }, .82)
        // 82–96%: background03 arrives, then "a memory" follows it and holds.
        .to(selectClass('scene05-glimpse--three'), { autoAlpha: .4, duration: .04 }, .82)
        .to(selectClass('scene05-glimpse--three'), { autoAlpha: 0, duration: .1 }, .86)
        .to(selectClass('scene05-line--four'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .16 }, .88)
    }, scene)

    return () => context.revert()
  }, [reducedMotion])

  return <section className={styles.scene05} ref={sceneRef} aria-label="The scent becomes a memory">
    <div className={styles['scene05-frame']} ref={frameRef}>
      <img className={`${styles['scene05-glimpse']} ${styles['scene05-glimpse--one']}`} src={glimpse01} alt="" aria-hidden="true" />
      <img className={`${styles['scene05-glimpse']} ${styles['scene05-glimpse--two']}`} src={glimpse02} alt="" aria-hidden="true" />
      <img className={`${styles['scene05-glimpse']} ${styles['scene05-glimpse--three']}`} src={glimpse03} alt="" aria-hidden="true" />
      <p className={`${styles['scene05-line']} ${styles['scene05-line--one']}`}>향은 물건이 아니었다.</p>
      <p className={`${styles['scene05-line']} ${styles['scene05-line--two']}`}>장소였고,</p>
      <p className={`${styles['scene05-line']} ${styles['scene05-line--three']}`}>순간이었고,</p>
      <p className={`${styles['scene05-line']} ${styles['scene05-line--four']}`}>기억이었다.</p>
    </div>
  </section>
}
