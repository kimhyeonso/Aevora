import { Link } from 'react-router-dom'
import Scene01 from './Scene01/Scene01'
import Scene02 from './Scene02/Scene02'
import Scene03 from './Scene03/Scene03'
import Scene04 from './Scene04/Scene04'
import Scene05 from './Scene05/Scene05'
import Scene06 from './Scene06/Scene06'
import Scene07 from './Scene07/Scene07'
import SceneIconNav from './ui/SceneIconNav'
import IntroAudio from './ui/IntroAudio'
import useReducedMotion from '../../hooks/useReducedMotion'
import styles from './IntroExperience.module.scss'

export default function IntroExperience() {
  const reduced = useReducedMotion()

  return <div className={`${styles['intro-experience']}${reduced ? ` ${styles['reduce-motion']}` : ''}`}>
    <Link to="/home" className={styles.skipButton} aria-label="인트로를 건너뛰고 홈으로 이동">
      <span>SKIP</span>
      <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3 9h11M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
    </Link>
    <SceneIconNav />
    <IntroAudio />
    <div className={styles['scene-stack']}><Scene01 /><Scene02 /><Scene03 /><Scene04 /><Scene05 /><Scene06 /><Scene07 /></div>
  </div>
}
