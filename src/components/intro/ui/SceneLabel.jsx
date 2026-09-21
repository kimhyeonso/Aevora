import styles from '../IntroExperience.module.scss'

export default function SceneLabel({ number, title, active }) {
  return <div className={`${styles['scene-label']}${active ? ` ${styles['is-active']}` : ''}`}><span>{number}</span><p>{title}</p></div>
}
