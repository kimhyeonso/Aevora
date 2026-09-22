import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import blancheBg from '../assets/home/01blanche.png'
import FrostFrame from '../components/home/FrostFrame'
import Scene01Particles from '../components/intro/Scene01/Scene01Particles'
import { gsap } from '../utils/gsapSetup'
import useReducedMotion from '../hooks/useReducedMotion'
import styles from './Home.module.scss'

const DUST = Array.from({ length: 20 }, (_, index) => ({
  key: index,
  style: {
    '--dust-x': `${(Math.random() * 100).toFixed(1)}%`,
    '--dust-y': `${(Math.random() * 100).toFixed(1)}%`,
    '--dust-duration': `${(16 + Math.random() * 10).toFixed(1)}s`,
    '--dust-delay': `${(Math.random() * -20).toFixed(1)}s`,
    '--dust-drift': `${(6 + Math.random() * 10).toFixed(0)}px`,
  },
}))

export default function Home() {
  const heroRef = useRef(null)
  const glassRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const reducedMotion = useReducedMotion()
  const navigate = useNavigate()

  useEffect(() => {
    if (reducedMotion) return undefined
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power2.out' } })
        .from(`.${styles.stage}`, { autoAlpha: 0, duration: 1.4 })
        .from(`.${styles.cta}`, { autoAlpha: 0, y: 10, duration: .9 }, .6)
    }, heroRef)
    return () => context.revert()
  }, [reducedMotion])

  const handleRevealed = useCallback(() => setRevealed(true), [])

  return <main className={styles.home}>
    <section className={`${styles.hero}${reducedMotion ? ` ${styles['reduce-motion']}` : ''}`} ref={heroRef}>
      <div className={`${styles.stage}${revealed ? ` ${styles['stage--revealed']}` : ''}`} ref={glassRef}>
        <img className={styles.stageBg} src={blancheBg} alt="블랑쉬 향을 표현한 밝은 실내 풍경" aria-hidden="true" />
        <FrostFrame glassRef={glassRef} reducedMotion={reducedMotion} onRevealed={handleRevealed} />

        <div className={styles.content}>
          <p className={styles.mark}>A E V O R A</p>
          <h1 className={styles.headline}>모든 순간은,<br />향이 된다.</h1>
          <p className={styles.subhead}>숲을 지나온 바람과 비, 그리고 계절이 머문 자리 —<br />그 기억을 작은 병 안에 담았습니다.</p>
        </div>

        {!reducedMotion && <Scene01Particles reducedMotion={reducedMotion} frameRef={glassRef} className={styles.sparkle} />}
        <span className={styles.dustField} aria-hidden="true">{DUST.map((dust) => <i key={dust.key} style={dust.style} />)}</span>

        <button type="button" className={styles.cta} onClick={() => navigate('/main')}>
          ENTER AEVORA <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  </main>
}
