import { useEffect, useRef } from 'react'
import background01 from '../../../assets/intro/scene04/background01.png'
import background02 from '../../../assets/intro/scene04/background02.png'
import PetalDrift from './PetalDrift'
import CursorPetals from './CursorPetals'
import PetalWipe from './PetalWipe'
import BackgroundShatter from './BackgroundShatter'
import { createScrollTimeline, gsap } from '../../../utils/gsapSetup'
import useReducedMotion from '../../../hooks/useReducedMotion'
import styles from './Scene04.module.scss'

export default function Scene04() {
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
      gsap.set(selectClass('scene04-shatter'), { opacity: 1 })
      gsap.set(selectClass('scene04-shatter-tile'), { x: 0, y: 0, rotation: 0, autoAlpha: 0 })
      // Scene03 has no frame of its own to fade out (it's a permanently fixed
      // background driven entirely by Scene02's timeline — see Scene03.jsx),
      // so the crossfade into Scene04 has to come from this end instead: the
      // whole frame starts invisible and fades in, the same way background01
      // later crossfades into background02, rather than sliding up into view
      // as an ordinary in-flow section would.
      gsap.set(frame, { autoAlpha: 0 })

      // No `pin` here — the frame is permanently fixed via CSS instead (see
      // Scene04.module.scss), so this ScrollTrigger only needs to drive the
      // timeline's progress, not hold the frame in place.
      const timeline = createScrollTimeline({
        trigger: scene,
        start: 'top top',
        end: '+=7400',
      })

      timeline
        // 0–12%: the whole frame crossfades in over Scene03's held puddle shot.
        .to(frame, { autoAlpha: 1, duration: .12 }, 0)
        // 0–15%: the bloom settles into view, carried over from Scene03's puddle.
        .to(selectClass('scene04-background--one'), { scale: 1.02, duration: .15 }, 0)
        // 10–30%: wind rises and petals begin drifting across the frame.
        .to(selectClass('scene04-petals'), { opacity: .85, duration: .2 }, .1)
        // 28–64%: the wind carries the scent — first line arrives, then fades,
        // with a soft radial backdrop behind it for readability over the bloom.
        .to(selectClass('scene04-copy--one'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .16 }, .28)
        .to(selectClass('scene04-copy--one'), { '--scene04-copy-backdrop': .9, duration: .1 }, .28)
        .to(selectClass('scene04-copy--one'), { autoAlpha: 0, y: -14, filter: 'blur(7px)', '--scene04-copy-backdrop': 0, duration: .12 }, .52)
        // 50–70%: the season turns — the grove crossfades into fuller bloom.
        .to(selectClass('scene04-background--one'), { autoAlpha: 0, scale: 1.05, duration: .2 }, .5)
        .to(selectClass('scene04-background--two'), { autoAlpha: 1, scale: 1.02, duration: .2 }, .5)
        .to(selectClass('scene04-petals'), { opacity: 1, duration: .15 }, .55)
        // 82–100%: the closing line settles in and holds, with the same backdrop.
        .to(selectClass('scene04-copy--two'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .18 }, .82)
        .to(selectClass('scene04-copy--two'), { '--scene04-copy-backdrop': .9, duration: .12 }, .84)
        // The line holds through 130% before the exit begins, so it still
        // reads as a proper close rather than being cut short by the wipe.
        // 130–137%: a dense burst of petals appears across the whole frame.
        .to(selectClass('scene04-wipe-petal'), { autoAlpha: 1, duration: .05, stagger: { each: .0015, from: 'start' } }, 1.3)
        // 131–149%: the tiled shatter copy of the bloom pops in tile by tile,
        // in random order and at random moments rather than all at once —
        // each is pixel-identical to background--two underneath, so where a
        // tile has already appeared the swap is invisible, and where it
        // hasn't yet the image reads as already starting to break apart.
        .to(selectClass('scene04-shatter-tile'), {
          autoAlpha: 1,
          duration: .08,
          stagger: { amount: .18, from: 'random' },
        }, 1.31)
        // 132–144%: the line, the original bloom image and the ambient drift
        // all fade out together — the shatter tiles are what's left standing.
        .to(selectClass('scene04-copy--two'), { autoAlpha: 0, duration: .1 }, 1.32)
        .to([...selectClass('scene04-background--two'), ...selectClass('scene04-petals'), ...selectClass('scene04-vignette')], { autoAlpha: 0, duration: .1 }, 1.34)
        // 142–204%: the image itself tears into petal-sized pieces and is
        // scattered off in a gust — each piece its own random direction,
        // distance, rotation and timing (stagger order is randomized, not
        // column-by-column), so it reads as pieces caught in gusting wind
        // rather than one deterministic left-to-right wipe. The overall
        // drift still leans rightward on average, together with PetalWipe's
        // burst, but nothing about it should look mechanical.
        .to(selectClass('scene04-shatter-tile'), {
          x: () => gsap.utils.random(-.15, 1.3) * frame.getBoundingClientRect().width,
          y: () => gsap.utils.random(-160, 180),
          rotation: () => gsap.utils.random(-220, 220),
          autoAlpha: 0,
          duration: () => gsap.utils.random(.3, .64),
          ease: 'power1.in',
          // `amount` spreads a fixed total delay across however many tiles
          // there are — using `each` here (fine at low counts) would scale
          // the whole spread up with the tile count (160 of them).
          stagger: { amount: .18, from: 'random' },
        }, 1.42)
        // 135–197%: every ambient burst petal scatters the same way — random
        // direction and pace per petal, popping in random order.
        .to(selectClass('scene04-wipe-petal'), {
          x: () => gsap.utils.random(-.2, 1.3) * frame.getBoundingClientRect().width,
          y: () => gsap.utils.random(-180, 240),
          rotation: () => gsap.utils.random(-320, 320),
          duration: () => gsap.utils.random(.32, .68),
          ease: 'power1.in',
          stagger: { amount: .16, from: 'random' },
        }, 1.35)
        // 160–200%: the burst itself fades out as it exits, clearing the frame.
        .to(selectClass('scene04-wipe-petal'), { autoAlpha: 0, duration: .2, stagger: { amount: .1, from: 'random' } }, 1.6)
    }, scene)

    return () => context.revert()
  }, [reducedMotion])

  return <section className={styles.scene04} ref={sceneRef} aria-label="The scent of flowers carried on the wind">
    <div className={styles['scene04-frame']} ref={frameRef}>
      <img className={`${styles['scene04-background']} ${styles['scene04-background--one']}`} src={background01} alt="" aria-hidden="true" />
      <img className={`${styles['scene04-background']} ${styles['scene04-background--two']}`} src={background02} alt="" aria-hidden="true" />
      <BackgroundShatter />
      <PetalDrift />
      <CursorPetals frameRef={frameRef} active={!reducedMotion} />
      <p className={`${styles['scene04-copy']} ${styles['scene04-copy--one']}`}>바람에 실려온 꽃의 향으로</p>
      <p className={`${styles['scene04-copy']} ${styles['scene04-copy--two']}`}>계절을 기억했다.</p>
      <div className={styles['scene04-vignette']} aria-hidden="true" />
      <PetalWipe />
    </div>
  </section>
}
