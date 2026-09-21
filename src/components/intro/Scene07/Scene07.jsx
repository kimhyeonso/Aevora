import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import GlassDistortion from './GlassDistortion'
import { createScrollTimeline, gsap, ScrollTrigger } from '../../../utils/gsapSetup'
import useReducedMotion from '../../../hooks/useReducedMotion'
import styles from './Scene07.module.scss'
import scene06Styles from '../Scene06/Scene06.module.scss'

// The exact same silhouette and position/size Scene06 just finished
// drawing (top: 44%, same viewBox) — this scene picks it up from there
// rather than drawing a new one, so nothing visibly "appears"; it's the
// same bottle continuing to act.
const BOTTLE_PATH = 'M45 8 L75 8 L75 28 L68 34 L68 55 L92 75 Q100 82 100 95 L100 185 Q100 200 85 200 L35 200 Q20 200 20 185 L20 95 Q20 82 28 75 L52 55 L52 34 L45 28 Z'
const FILTER_ID = 'scene07-glass'
const SCROLL_DISTANCE = 2600
const LENS_RADIUS = 100

function Bottle({ warped }) {
  return <div className={styles['scene07-bottle-anchor']}>
    <div className={styles['scene07-bottle-group']}>
      <svg viewBox="0 0 120 210" xmlns="http://www.w3.org/2000/svg" className={warped ? styles['scene07-bottle-warped'] : undefined}>
        <path className={styles['scene07-bottle-fill']} d={BOTTLE_PATH} />
        <path className={styles['scene07-bottle-path']} d={BOTTLE_PATH} />
      </svg>
    </div>
  </div>
}

export default function Scene07() {
  const sceneRef = useRef(null)
  const frameRef = useRef(null)
  const maskRef = useRef(null)
  const displacementRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const navigate = useNavigate()

  useEffect(() => {
    const scene = sceneRef.current
    const frame = frameRef.current
    const mask = maskRef.current
    if (!scene || !frame) return undefined

    // The lens tracks the cursor at a constant on-screen radius — computed
    // in frame-relative pixels, not tied to the bottle's own scale — so it
    // stays a small, localized ripple even once the bottle has grown far
    // larger than the viewport, instead of the whole screen warping. The
    // position itself is eased with quickTo (instead of jumping straight to
    // the pointer) so the ripple trails the cursor like a drop of liquid
    // rather than snapping, which reads as far more "glass-like".
    const lens = { x: 0, y: 0 }
    function applyMask() {
      if (!mask) return
      const value = `radial-gradient(circle ${LENS_RADIUS}px at ${lens.x}px ${lens.y}px, #000 55%, transparent 100%)`
      mask.style.maskImage = value
      mask.style.webkitMaskImage = value
    }
    const quickX = gsap.quickTo(lens, 'x', { duration: .35, ease: 'power3', onUpdate: applyMask })
    const quickY = gsap.quickTo(lens, 'y', { duration: .35, ease: 'power3', onUpdate: applyMask })
    function handleMove(event) {
      const rect = frame.getBoundingClientRect()
      quickX(event.clientX - rect.left)
      quickY(event.clientY - rect.top)
    }
    if (!reducedMotion) frame.addEventListener('pointermove', handleMove)

    // A slow, gentle breathing of the displacement strength — instead of a
    // single fixed-intensity warp — so the ripple feels like it's alive
    // rather than a static scribble stamped on the line.
    const breathe = !reducedMotion && displacementRef.current && gsap.to(displacementRef.current, {
      attr: { scale: 30 },
      duration: 2.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    const context = gsap.context(() => {
      const select = gsap.utils.selector(frame)
      const selectClass = (className) => select(`.${styles[className]}`)
      // Scene06's own closing line lives in a different component's DOM —
      // this is the same cross-scene targeting technique used since
      // Scene02 drove Scene03's reveal.
      const selectScene06 = (className) => document.querySelectorAll(`.${scene06Styles[className]}`)

      if (reducedMotion) return

      gsap.set(selectClass('scene07-bottle-anchor'), { top: '44%' })
      gsap.set(selectClass('scene07-bottle-group'), { scale: 1 })
      gsap.set(selectClass('scene07-bottle-fill'), { opacity: 0 })
      gsap.set(selectClass('scene07-flash'), { opacity: 0 })
      gsap.set(selectClass('scene07-flash-streak'), { opacity: 0, scaleX: .3 })
      // The frame starts invisible and fades itself in over Scene06's held
      // bottle — the same crossfade technique used since Scene04.
      gsap.set(frame, { autoAlpha: 0 })

      // No `pin` — the frame is permanently fixed via CSS instead (see
      // Scene07.module.scss), avoiding the physical unpin-and-scroll-away
      // that briefly exposed the wrong scene behind Scene04 before that fix.
      const timeline = createScrollTimeline({
        trigger: scene,
        start: 'top top',
        end: `+=${SCROLL_DISTANCE}`,
      })

      timeline
        // 0–6%: crossfades in, already positioned exactly where Scene06
        // left its bottle, so nothing "new" appears.
        .to(frame, { autoAlpha: 1, duration: .06 }, 0)
        // 6–20%: Scene06's line steps aside and the bottle settles the
        // rest of the way to dead center.
        .to(selectScene06('scene06-line--two'), { autoAlpha: 0, duration: .12 }, .06)
        .to(selectClass('scene07-bottle-anchor'), { top: '50%', duration: .14, ease: 'power2.out' }, .06)
        // 20–78%: the camera rushes toward the bottle — it fills more and
        // more of the frame, its glass fill deepening, until its own
        // outline has scrolled past the edges of the screen.
        .to(selectClass('scene07-bottle-group'), { scale: 20, duration: .58, ease: 'power2.in' }, .2)
        .to(selectClass('scene07-bottle-fill'), { opacity: .92, duration: .4 }, .28)
        .to(selectClass('scene07-bottle-path'), { opacity: 0, duration: .2 }, .5)
        // 70–90%: the screen itself refracts — a bright burst with a
        // couple of prism streaks — right as the surface is crossed.
        .to(selectClass('scene07-flash'), { opacity: 1, duration: .2, ease: 'power1.in' }, .7)
        .to(selectClass('scene07-flash-streak'), { opacity: .8, scaleX: 1, duration: .16, stagger: .03 }, .72)
        .to(selectClass('scene07-flash'), { opacity: 0, duration: .18 }, .9)
    }, scene)

    // A separate, non-scrubbed trigger fires the actual route change once,
    // right at the peak of the flash — kept independent of the scrub
    // timeline above so it can't re-fire every time the scrub re-evaluates.
    let navigated = false
    const navTrigger = !reducedMotion && ScrollTrigger.create({
      trigger: scene,
      start: `top+=${Math.round(SCROLL_DISTANCE * .8)} top`,
      onEnter: () => {
        if (navigated) return
        navigated = true
        navigate('/home')
      },
    })

    return () => {
      frame.removeEventListener('pointermove', handleMove)
      context.revert()
      navTrigger?.kill()
      breathe?.kill()
    }
  }, [reducedMotion, navigate])

  return <section className={styles.scene07} ref={sceneRef} aria-label="Crossing into the bottle">
    <div className={styles['scene07-frame']} ref={frameRef}>
      <GlassDistortion filterId={FILTER_ID} displacementRef={displacementRef} />
      <Bottle />
      <div className={styles['scene07-bottle-mask']} ref={maskRef}>
        <Bottle warped />
      </div>
      <div className={styles['scene07-flash']} aria-hidden="true">
        <span className={styles['scene07-flash-streak']} />
        <span className={styles['scene07-flash-streak']} />
        <span className={styles['scene07-flash-streak']} />
      </div>
      {reducedMotion && <button type="button" className={styles['scene07-enter']} onClick={() => navigate('/home')}>Enter</button>}
    </div>
  </section>
}
