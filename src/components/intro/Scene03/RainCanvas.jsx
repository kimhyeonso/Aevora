import styles from './Scene03.module.scss'

function buildDrops(count, { duration, drift }) {
  return Array.from({ length: count }, (_, index) => ({
    key: index,
    x: Math.random() * 100,
    delay: -(Math.random() * duration),
    duration: duration * (0.82 + Math.random() * 0.36),
    drift: (Math.random() * 2 - 1) * drift,
  }))
}

// Calmer than Scene02's rain (density ~80) — the storm is settling, ~35.
const back = buildDrops(15, { duration: 1.9, drift: 5 })
const mid = buildDrops(11, { duration: 1.3, drift: 9 })
const front = buildDrops(6, { duration: 0.95, drift: 14 })

function Layer({ className, drops }) {
  return <div className={className}>
    {drops.map((drop) => <i key={drop.key} style={{
      '--rain-x': `${drop.x}%`,
      '--rain-delay': `${drop.delay}s`,
      '--rain-duration': `${drop.duration}s`,
      '--rain-drift': `${drop.drift}px`,
    }} />)}
  </div>
}

export default function RainCanvas() {
  return <div className={styles['scene03-rain']} aria-hidden="true">
    <Layer className={styles['scene03-rain-layer--back']} drops={back} />
    <Layer className={styles['scene03-rain-layer--mid']} drops={mid} />
    <Layer className={styles['scene03-rain-layer--front']} drops={front} />
  </div>
}
