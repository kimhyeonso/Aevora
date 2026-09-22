import { useEffect, useRef } from 'react'
import glimpse01 from '../../../assets/intro/Scene05/background01.png'
import glimpse02 from '../../../assets/intro/Scene05/background02.png'
import glimpse03 from '../../../assets/intro/Scene05/background03.png'
import Scene01Particles from '../Scene01/Scene01Particles'
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
      gsap.set(frame, { autoAlpha: 0 })

      const timeline = createScrollTimeline({
        id: 'scene05',
        trigger: scene,
        start: 'top top',
        end: '+=3600',
      })

      timeline
        .to(frame, { autoAlpha: 1, duration: .08 }, 0)
        .to(selectClass('scene05-line--one'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .14 }, .08)
        .addLabel('notAnObject', .2)
        .to(selectClass('scene05-line--one'), { autoAlpha: 0, y: -12, filter: 'blur(6px)', duration: .1 }, .3)
        .to(selectClass('scene05-glimpse--one'), { autoAlpha: .4, duration: .04 }, .3)
        .to(selectClass('scene05-glimpse--one'), { autoAlpha: 0, duration: .1 }, .34)
        .to(selectClass('scene05-line--two'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .14 }, .34)
        .to(selectClass('scene05-line--two'), { autoAlpha: 0, y: -12, filter: 'blur(6px)', duration: .1 }, .56)
        .to(selectClass('scene05-glimpse--two'), { autoAlpha: .4, duration: .04 }, .56)
        .to(selectClass('scene05-glimpse--two'), { autoAlpha: 0, duration: .1 }, .6)
        .to(selectClass('scene05-line--three'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .14 }, .6)
        .to(selectClass('scene05-line--three'), { autoAlpha: 0, y: -12, filter: 'blur(6px)', duration: .1 }, .82)
        .to(selectClass('scene05-glimpse--three'), { autoAlpha: .4, duration: .04 }, .82)
        .to(selectClass('scene05-glimpse--three'), { autoAlpha: 0, duration: .1 }, .86)
        .to(selectClass('scene05-line--four'), { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .16 }, .88)
    }, scene)

    return () => context.revert()
  }, [reducedMotion])

  return <section id="scene05" className={styles.scene05} ref={sceneRef} aria-label="The scent becomes a memory">
    <div className={styles['scene05-frame']} ref={frameRef}>
      <img className={`${styles['scene05-glimpse']} ${styles['scene05-glimpse--one']}`} src={glimpse01} alt="향과 연결된 첫 번째 기억의 장면" aria-hidden="true" />
      <img className={`${styles['scene05-glimpse']} ${styles['scene05-glimpse--two']}`} src={glimpse02} alt="향과 연결된 두 번째 기억의 장면" aria-hidden="true" />
      <img className={`${styles['scene05-glimpse']} ${styles['scene05-glimpse--three']}`} src={glimpse03} alt="향과 연결된 세 번째 기억의 장면" aria-hidden="true" />
      <Scene01Particles reducedMotion={reducedMotion} frameRef={frameRef} className={styles['scene05-particles']} />
      <p className={`${styles['scene05-line']} ${styles['scene05-line--one']}`}>향은 물건이 아니었다.</p>
      <p className={`${styles['scene05-line']} ${styles['scene05-line--two']}`}>장소였고,</p>
      <p className={`${styles['scene05-line']} ${styles['scene05-line--three']}`}>순간이었고,</p>
      <p className={`${styles['scene05-line']} ${styles['scene05-line--four']}`}>기억이었다.</p>
    </div>
  </section>
}
