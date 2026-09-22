import { useEffect, useRef } from 'react'
import forestBackground from '../../../assets/intro/scene01/background01.png'
import fogImage from '../../../assets/intro/scene01/image 51.png'
import leftTree from '../../../assets/intro/scene01/left_tree.png'
import rightTree from '../../../assets/intro/scene01/right_tree.png'
import Scene01Particles from './Scene01Particles'
import { createScrollTimeline, gsap } from '../../../utils/gsapSetup'
import useReducedMotion from '../../../hooks/useReducedMotion'
import styles from './Scene01.module.scss'

export default function Scene01() {
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
        gsap.set(selectClass('scene01-world'), { opacity: 1 })
        gsap.set(selectClass('scene01-overlay'), { opacity: .2 })
        gsap.set(selectClass('scene01-background'), { scale: 1.08 })
        gsap.set(selectClass('scene01-tree--left'), { x: -58 })
        gsap.set(selectClass('scene01-tree--right'), { x: 58 })
        gsap.set(selectClass('scene01-fog'), { opacity: .36, xPercent: 6 })
        gsap.set(selectClass('scene01-copy--second'), { autoAlpha: 1, y: 0, filter: 'blur(0px)' })
        return
      }

      gsap.set(selectClass('scene01-copy'), { autoAlpha: 0, y: 24, filter: 'blur(12px)' })

      const timeline = createScrollTimeline({
        trigger: scene,
        pin: frame,
        start: 'top top',
        end: '+=2800',
      })

      timeline
        .to(selectClass('scene01-scroll-cue'), { autoAlpha: 0, duration: .1 }, .1)
        .to(selectClass('scene01-world'), { opacity: .58, duration: .22 }, .12)
        .to(selectClass('scene01-fog'), { opacity: .5, duration: .16 }, .16)
        .to(selectClass('scene01-fog--left'), { opacity: .3, xPercent: -8, duration: .3 }, .38)
        .to(selectClass('scene01-fog--right'), { opacity: .3, xPercent: 8, duration: .3 }, .38)
        .to(selectClass('scene01-copy--first'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .14 }, .24)
        .to(selectClass('scene01-copy--first'), { autoAlpha: 0, y: -16, filter: 'blur(8px)', duration: .1 }, .5)
        .to(selectClass('scene01-overlay'), { opacity: .5, duration: .27 }, .44)
        .to(selectClass('scene01-background'), { scale: 1.045, yPercent: -1.5, duration: .3 }, .44)
        .to(selectClass('scene01-tree--left'), { x: -28, duration: .3 }, .44)
        .to(selectClass('scene01-tree--right'), { x: 28, duration: .3 }, .44)
        .to(selectClass('scene01-copy--second'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .15 }, .58)
        .to(selectClass('scene01-fog--left'), { opacity: .2, xPercent: -17, duration: .3 }, .6)
        .to(selectClass('scene01-fog--right'), { opacity: .2, xPercent: 17, duration: .3 }, .6)
        .to(selectClass('scene01-copy--second'), { autoAlpha: 0, y: -12, filter: 'blur(7px)', duration: .1 }, .84)
        .to(selectClass('scene01-pointer-reveal'), { opacity: 0, duration: .1 }, .8)
        .to(frame, { autoAlpha: 0, duration: .2 }, .8)
    }, scene)

    return () => context.revert()
  }, [reducedMotion])

  return <section id="scene01" className={styles.scene01} ref={sceneRef} aria-label="The origin of scent">
    <div className={styles['scene01-frame']} ref={frameRef}>
      <div className={styles['scene01-world']} aria-hidden="true">
        <img className={styles['scene01-background']} src={forestBackground} alt="안개 낀 숲길" />
        <img className={`${styles['scene01-tree']} ${styles['scene01-tree--left']}`} src={leftTree} alt="숲길 왼쪽의 나무" />
        <img className={`${styles['scene01-tree']} ${styles['scene01-tree--right']}`} src={rightTree} alt="숲길 오른쪽의 나무" />
      </div>
      <div className={styles['scene01-overlay']} aria-hidden="true" />
      <img className={`${styles['scene01-fog']} ${styles['scene01-fog--left']}`} src={fogImage} alt="숲 왼쪽을 감싼 안개" aria-hidden="true" />
      <img className={`${styles['scene01-fog']} ${styles['scene01-fog--right']}`} src={fogImage} alt="숲 오른쪽을 감싼 안개" aria-hidden="true" />
      <div className={styles['scene01-pointer-reveal']} aria-hidden="true" />
      <Scene01Particles reducedMotion={reducedMotion} frameRef={frameRef} className={styles['scene01-particles']} />
      <p className={`${styles['scene01-copy']} ${styles['scene01-copy--first']}`}>아주 오래전,</p>
      <p className={`${styles['scene01-copy']} ${styles['scene01-copy--second']}`}>향수라는 이름조차 없던 시절.</p>
      <div className={styles['scene01-scroll-cue']} aria-hidden="true"><span>SCROLL</span><div><i /><i /><i /></div></div>
    </div>
  </section>
}
