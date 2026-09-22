import styles from './PerfumeBottle.module.scss'

const BOTTLE_PATH = 'M45 8 L75 8 L75 28 L68 34 L68 55 L92 75 Q100 82 100 95 L100 185 Q100 200 85 200 L35 200 Q20 200 20 185 L20 95 Q20 82 28 75 L52 55 L52 34 L45 28 Z'

export default function PerfumeBottle({ color }) {
  return <div className={styles.bottle} aria-hidden="true">
    <svg viewBox="0 0 120 210" xmlns="http://www.w3.org/2000/svg">
      <path className={styles.fill} d={BOTTLE_PATH} style={{ fill: color }} />
      <path className={styles.outline} d={BOTTLE_PATH} />
    </svg>
    <span className={styles.shadow} />
  </div>
}
