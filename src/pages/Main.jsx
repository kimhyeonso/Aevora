import { useRef } from 'react'
import usePerfumeAnimation from '../hooks/usePerfumeAnimation'
import useReducedMotion from '../hooks/useReducedMotion'
import MainNavigation from '../components/main/MainNavigation'
import MainBackground from '../components/main/MainBackground'
import MainCursorParticles from '../components/main/MainCursorParticles'
import MainCursorEffects from '../components/main/MainCursorEffects'
import ScentTransition from '../components/main/ScentTransition'
import PerfumeBottle from '../components/main/PerfumeBottle'
import PerfumeContent from '../components/main/PerfumeContent'
import PerfumeSelector from '../components/main/PerfumeSelector'
import styles from './Main.module.scss'

export default function Main() {
  const { perfumes, active, select, next } = usePerfumeAnimation()
  const heroRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const heroContent = active.hero
  const copyVariant = {
    bal: styles['copy--bal'],
    blanche: styles['copy--blanche'],
    mojave: styles['copy--mojave'],
    rose: styles['copy--rose'],
  }[active.id] ?? ''
  const copyClassName = `${styles.copy}${copyVariant ? ` ${copyVariant}` : ''}`
  const bottleStageClassName = `${styles.bottleStage}${active.id === 'mojave' ? ` ${styles['bottleStage--mojave']}` : ''}`

  return <main className={styles.main}>
    <MainNavigation />

    <section className={styles.hero} ref={heroRef}>
      <MainBackground perfumes={perfumes} activeId={active.id} />
      <ScentTransition activeId={active.id} />
      {active.effect === 'dim'
        ? <MainCursorParticles frameRef={heroRef} reducedMotion={reducedMotion} className={styles.cursorParticles} />
        : <MainCursorEffects frameRef={heroRef} reducedMotion={reducedMotion} effect={active.effect} />}
      <div className={styles.veilLeft} aria-hidden="true" />
      <div className={styles.veilBottom} aria-hidden="true" />

      <div className={copyClassName} key={active.id} aria-live="polite">
        <p className={styles.eyebrow}>{heroContent.eyebrow}</p>
        <h1 className={styles.headline}>{heroContent.title}<br /><em>{heroContent.accent}</em></h1>
        <p className={styles.lede}>{heroContent.description}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.primaryBtn} onClick={next}>{heroContent.primaryAction}</button>
          <button type="button" className={styles.secondaryBtn}>{heroContent.secondaryAction}</button>
        </div>
      </div>

      <div className={bottleStageClassName}>
        <PerfumeBottle color={active.color} />
        <PerfumeContent perfume={active} />
      </div>

      <div className={styles.selectorRow}>
        <PerfumeSelector perfumes={perfumes} activeId={active.id} onSelect={select} />
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span>SCROLL TO EXPLORE</span>
        <svg viewBox="0 0 16 9" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
      </div>

      <ul className={styles.pillars} aria-hidden="true">
        {heroContent.pillars.map((word) => <li key={word}>{word}</li>)}
      </ul>
      <p className={styles.tagline}>{heroContent.tagline}</p>
    </section>
  </main>
}
