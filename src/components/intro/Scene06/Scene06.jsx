import { useEffect, useRef } from 'react'
import NatureObjects from './NatureObjects'
import PerfumeBottle from './PerfumeBottle'
import { createScrollTimeline, gsap } from '../../../utils/gsapSetup'
import useReducedMotion from '../../../hooks/useReducedMotion'
import styles from './Scene06.module.scss'

// Small, fixed offsets (not random) so the four motifs that do converge
// settle into a deliberate little cluster — petal above, droplet and leaf
// side by side, light below — matching the loose diagram this scene was
// built from, rather than landing in a random pile.
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
      // The frame starts invisible and fades itself in over whatever scene
      // came before, the same crossfade technique used since Scene04 — see
      // Scene04.module.scss for why a scroll-pinned frame can't just default
      // to visible without briefly exposing what's behind it.
      gsap.set(frame, { autoAlpha: 0 })

      // Every converging object needs the same "move my own center to the
      // frame's center, then nudge by a small fixed offset" calculation —
      // defined once here since it depends on frame's live layout, not on
      // any one object.
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

      // No `pin` — the frame is permanently fixed via CSS instead (see
      // Scene06.module.scss), so this ScrollTrigger only drives the
      // timeline's progress, avoiding the physical unpin-and-scroll-away
      // that briefly exposed the wrong scene behind Scene04 before that fix.
      const timeline = createScrollTimeline({
        trigger: scene,
        start: 'top top',
        end: '+=3800',
      })

      timeline
        // 0–8%: the frame crossfades in over whatever scene came before.
        .to(frame, { autoAlpha: 1, duration: .08 }, 0)
        // 28–46%: the tree — the source, not a moment — is left behind as
        // everything else starts drawing inward.
        .to(selectClass('scene06-object--tree'), { autoAlpha: 0, scale: .7, duration: .16 }, .28)
        // 32–46%: the first line arrives as the objects start being drawn
        // together — the gathering itself is what the words describe.
        .to(selectClass('scene06-line--one'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .14 }, .32)
        // 30–58%: the petal, droplet, leaf and light are pulled to the
        // center and settle into a small cluster, each on its own beat.
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
        // 50–70%: a soft glow gathers behind the cluster as the bottle
        // begins to draw itself around it.
        .to(selectClass('scene06-glow'), { opacity: .55, duration: .2 }, .5)
        // 62–76%: the first line steps aside as the bottle finishes drawing.
        .to(selectClass('scene06-line--one'), { autoAlpha: 0, y: -12, filter: 'blur(6px)', duration: .14 }, .62)
        .to(selectClass('scene06-bottle-path'), { strokeDashoffset: 0, duration: .32, ease: 'power1.inOut' }, .56)
        .to(selectClass('scene06-glow'), { opacity: .85, duration: .15 }, .84)
        // 88–106%: once the bottle is fully drawn, the second line arrives
        // and holds.
        .to(selectClass('scene06-line--two'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .18 }, .88)
    }, scene)

    return () => context.revert()
  }, [reducedMotion])

  return <section className={styles.scene06} ref={sceneRef} aria-label="Gathering moments into a bottle">
    <div className={styles['scene06-frame']} ref={frameRef}>
      <div className={styles['scene06-glow']} aria-hidden="true" />
      <NatureObjects />
      <PerfumeBottle />
      <p className={`${styles['scene06-line']} ${styles['scene06-line--one']}`}>그리고 시간이 흘러,</p>
      <p className={`${styles['scene06-line']} ${styles['scene06-line--two']}`}>우리는 그 순간들을<br />작은 병 안에 담기 시작했다.</p>
    </div>
  </section>
}
