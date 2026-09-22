import background from '../../../assets/intro/scene03/background.png'
import RainCanvas from './RainCanvas'
import HeroDroplet from './HeroDroplet'
import RippleEffect from './RippleEffect'
import styles from './Scene03.module.scss'

const copy = [...'비가 내린 뒤의 흙과']

export default function Scene03() {
  return <section id="scene03" className={styles.scene03} aria-label="Rain reaching the forest floor">
    <div className={styles['scene03-frame']}>
      <img className={styles['scene03-background']} src={background} alt="빗물이 고인 숲 바닥" aria-hidden="true" />
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
