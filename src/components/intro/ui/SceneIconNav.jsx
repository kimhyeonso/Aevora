import icon01 from '../../../assets/intro/icon/icon-01.png'
import icon02 from '../../../assets/intro/icon/icon-02.png'
import icon03 from '../../../assets/intro/icon/icon-03.png'
import icon04 from '../../../assets/intro/icon/icon-04.png'
import icon05 from '../../../assets/intro/icon/icon-05.png'
import icon06 from '../../../assets/intro/icon/icon-06.png'
import { ScrollTrigger } from '../../../utils/gsapSetup'
import styles from './SceneIconNav.module.scss'

const ICONS = [
  { key: 'scene01', src: icon01, label: 'Scene 01', anchorId: 'scene01' },
  { key: 'scene02', src: icon02, label: 'Scene 02', anchorId: 'scene02', triggerId: 'scene02', gsapLabel: 'walk' },
  { key: 'scene03', src: icon03, label: 'Scene 03', anchorId: 'scene04', triggerId: 'scene02', gsapLabel: 'rainDrop' },
  { key: 'scene04', src: icon04, label: 'Scene 04', anchorId: 'scene04', triggerId: 'scene04', gsapLabel: 'windScent' },
  { key: 'scene05', src: icon05, label: 'Scene 05', anchorId: 'scene05', triggerId: 'scene05', gsapLabel: 'notAnObject' },
  { key: 'scene06', src: icon06, label: 'Scene 06', anchorId: 'scene06', triggerId: 'scene06', gsapLabel: 'fiveElements', large: true },
]

export default function SceneIconNav() {
  function handleClick({ anchorId, triggerId, gsapLabel }) {
    const trigger = triggerId && ScrollTrigger.getById(triggerId)
    const y = trigger && gsapLabel ? trigger.labelToScroll(gsapLabel) : null
    if (typeof y === 'number') {
      window.scrollTo({ top: y, behavior: 'smooth' })
      return
    }
    document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return <nav className={styles['scene-icon-nav']} aria-label="Scene navigation">
    {ICONS.map((icon) => (
      <button
        key={icon.key}
        type="button"
        className={`${styles['scene-icon-nav-item']}${icon.large ? ` ${styles['scene-icon-nav-item--large']}` : ''}`}
        onClick={() => handleClick(icon)}
        aria-label={icon.label}
      >
        <img src={icon.src} alt={`${icon.label} 장면 아이콘`} aria-hidden="true" />
      </button>
    ))}
  </nav>
}
