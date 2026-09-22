import styles from './Scene04.module.scss'

const COLORS = ['#f7cdd9', '#fbe0e6', '#f3b8cc', '#fff0f4']
const PETAL_PATH = 'M12 2C6.5 6 3 11 3 15.2 3 19.5 7 22 12 22s9-2.5 9-6.8C21 11 17.5 6 12 2Z'
const PETAL_COUNT = 55

const petals = Array.from({ length: PETAL_COUNT }, (_, index) => ({
  key: index,
  x: `${(Math.random() * 90).toFixed(1)}%`,
  y: `${(Math.random() * 100).toFixed(1)}%`,
  size: 14 + Math.random() * 16,
  color: COLORS[index % COLORS.length],
}))

export default function PetalWipe() {
  return <div className={styles['scene04-wipe-petals']} aria-hidden="true">
    {petals.map((p) => <span key={p.key} className={styles['scene04-wipe-petal']} style={{ left: p.x, top: p.y, width: `${p.size}px` }}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d={PETAL_PATH} fill={p.color} /></svg>
    </span>)}
  </div>
}
