import styles from '../IntroExperience.module.scss'

export default function ScrollProgress({ progress }) {
  return <div className={styles['scroll-progress']} aria-hidden="true"><span style={{ transform: `scaleY(${progress})` }} /></div>
}
