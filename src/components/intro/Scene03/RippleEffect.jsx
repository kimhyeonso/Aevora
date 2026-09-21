import styles from './Scene03.module.scss'

export default function RippleEffect() {
  return <div className={styles['scene03-ripple']} aria-hidden="true">
    <span className={styles['scene03-ripple-ring']} />
    <span className={styles['scene03-ripple-ring']} />
    <span className={styles['scene03-ripple-ring']} />
  </div>
}
