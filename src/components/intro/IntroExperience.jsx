import Scene01 from './Scene01/Scene01'
import Scene02 from './Scene02/Scene02'
import Scene03 from './Scene03/Scene03'
import Scene04 from './Scene04/Scene04'
import Scene05 from './Scene05/Scene05'
import Scene06 from './Scene06/Scene06'
import Scene07 from './Scene07/Scene07'
import useReducedMotion from '../../hooks/useReducedMotion'
import styles from './IntroExperience.module.scss'

export default function IntroExperience() {
  const reduced = useReducedMotion()

  return <div className={`${styles['intro-experience']}${reduced ? ` ${styles['reduce-motion']}` : ''}`}>
    <div className={styles['scene-stack']}><Scene01 /><Scene02 /><Scene03 /><Scene04 /><Scene05 /><Scene06 /><Scene07 /></div>
  </div>
}
