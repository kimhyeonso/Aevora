import styles from './Scene03.module.scss'

export default function HeroDroplet() {
  return <div className={styles['scene03-hero-droplet']} aria-hidden="true">
    <svg viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C12 0 2 15 2 22a10 10 0 0 0 20 0C22 15 12 0 12 0Z" />
    </svg>
  </div>
}
