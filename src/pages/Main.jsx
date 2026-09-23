import { useRef } from 'react'
import usePerfumeAnimation from '../hooks/usePerfumeAnimation'
import useReducedMotion from '../hooks/useReducedMotion'
import MainNavigation from '../components/main/MainNavigation'
import MainBackground from '../components/main/MainBackground'
import MainCursorParticles from '../components/main/MainCursorParticles'
import MainCursorEffects from '../components/main/MainCursorEffects'
import ScentTransition from '../components/main/ScentTransition'
import PerfumeBottle from '../components/main/PerfumeBottle'
import PerfumeSelector from '../components/main/PerfumeSelector'
import mojaveTitle from '../assets/home/02Title.png'
import balTitle from '../assets/home/03Title.png'
import roseTitle from '../assets/home/04Title.png'
import bibliothequeTitle from '../assets/home/05Title.png'
import styles from './Main.module.scss'

const titleImages = {
  mojave: { source: mojaveTitle, alt: 'MOJAVE GHOST', className: styles.mojaveTitle },
  bal: { source: balTitle, alt: "BAL D'AFRIQUE", className: styles.balTitle },
  rose: { source: roseTitle, alt: "ROSE OF NO MAN'S LAND", className: styles.roseTitle },
  bibliotheque: { source: bibliothequeTitle, alt: 'BIBLIOTHÈQUE', className: styles.bibliothequeTitle },
}

export default function Main() {
  const { perfumes, active, select } = usePerfumeAnimation()
  const heroRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const heroContent = active.hero
  const titleImage = titleImages[active.id]
  const copyVariant = {
    bal: styles['copy--bal'],
    blanche: styles['copy--blanche'],
    bibliotheque: styles['copy--bibliotheque'],
    mojave: styles['copy--mojave'],
    rose: styles['copy--rose'],
  }[active.id] ?? ''
  const copyClassName = `${styles.copy}${copyVariant ? ` ${copyVariant}` : ''}`
  const veilClassName = `${styles.veilLeft}${active.id === 'mojave' ? ` ${styles['veilLeft--mojave']}` : ''}`
  const bottleLayout = active.bottleLayout
  const bottleStageStyle = {
    '--bottle-width': bottleLayout.size,
    '--bottle-top': bottleLayout.top ?? 'auto',
    '--bottle-right': bottleLayout.right ?? 'auto',
    '--bottle-bottom': bottleLayout.bottom ?? 'auto',
    '--bottle-left': bottleLayout.left ?? 'auto',
  }

  return <main className={styles.main}>
    <MainNavigation color={active.navigationColor ?? active.textColor} />

    <section className={styles.hero} ref={heroRef}>
      <MainBackground perfumes={perfumes} activeId={active.id} reducedMotion={reducedMotion} />
      <ScentTransition activeId={active.id} />
      {active.effect === 'dim'
        ? <MainCursorParticles frameRef={heroRef} reducedMotion={reducedMotion} className={styles.cursorParticles} />
        : <MainCursorEffects frameRef={heroRef} reducedMotion={reducedMotion} effect={active.effect} />}
      <div className={veilClassName} aria-hidden="true" />
      <div className={styles.veilBottom} aria-hidden="true" />

      <div className={copyClassName} key={active.id} aria-live="polite">
        <p className={styles.eyebrow}>{heroContent.eyebrow}</p>
        {titleImage
          ? <h1 className={styles.headline}><img className={titleImage.className} src={titleImage.source} alt={titleImage.alt} /></h1>
          : <h1 className={styles.headline}>{heroContent.title}<br />{heroContent.accent}</h1>}
        <p className={styles.lede}>{heroContent.description}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.secondaryBtn}>{heroContent.secondaryAction}</button>
        </div>
      </div>

      <div className={styles.bottleStage} style={bottleStageStyle}>
        <PerfumeBottle image={active.bottle} />
        <ul className={styles.pillars} aria-hidden="true">
          {heroContent.pillars.map((word) => <li key={word}>{word}</li>)}
        </ul>
      </div>

      <div className={styles.selectorRow}>
        <PerfumeSelector perfumes={perfumes} activeId={active.id} onSelect={select} />
      </div>

    </section>
  </main>
}
