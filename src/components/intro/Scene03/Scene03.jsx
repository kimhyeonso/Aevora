import background from '../../../assets/intro/scene03/background.png'
import RainCanvas from './RainCanvas'
import HeroDroplet from './HeroDroplet'
import RippleEffect from './RippleEffect'
import styles from './Scene03.module.scss'

const copy = [...'비가 내린 뒤의 흙과']

// Scene03 has no scroll-driven animation of its own — every reveal here
// (the droplet's fall, the splash/ripple, the light falloff, and this copy's
// fade-in) is timed and driven by Scene02's own pin timeline (see
// Scene02.jsx), because that handoff has to happen while Scene02 is still
// pinned. By the time Scene02 releases, Scene03 is already fully revealed;
// there's nothing left to scroll-trigger locally.
export default function Scene03() {
  return <section id="return" className={styles.scene03} aria-label="Rain reaching the forest floor">
    <div className={styles['scene03-frame']}>
      <img className={styles['scene03-background']} src={background} alt="" aria-hidden="true" />
      <div className={styles['scene03-light-falloff']} aria-hidden="true" />
      <RainCanvas />
      <HeroDroplet />
      <div className={styles['scene03-impact']} aria-hidden="true">
        <div className={styles['scene03-splash']} />
        <RippleEffect />
      </div>
      <p className={styles['scene03-copy']}>{copy.map((character, index) => <span className={styles['scene03-copy-character']} key={`${character}-${index}`}>{character === ' ' ? ' ' : character}</span>)}</p>
    </div>
  </section>
}
