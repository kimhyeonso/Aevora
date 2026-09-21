import styles from './Scene03.module.scss'

export default function GroundParallax({ progress }) { return <div className={styles['ground-parallax']} style={{ transform: `translateY(${progress * 20}px)` }} aria-hidden="true" /> }
