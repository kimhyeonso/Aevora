import { useEffect, useRef } from 'react'
import styles from './Scene06.module.scss'

// A single continuous outline (cap, neck, shoulders, body) so its length can
// be measured once and revealed with a stroke-dashoffset "draw-on" — see
// Scene06.jsx, which animates --scene06-bottle-draw from 1 to 0 in step with
// the objects converging.
const BOTTLE_PATH = 'M45 8 L75 8 L75 28 L68 34 L68 55 L92 75 Q100 82 100 95 L100 185 Q100 200 85 200 L35 200 Q20 200 20 185 L20 95 Q20 82 28 75 L52 55 L52 34 L45 28 Z'

export default function PerfumeBottle() {
  const pathRef = useRef(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    // Starts fully "undrawn" — Scene06.jsx animates strokeDashoffset from
    // this same length down to 0 once the objects finish converging.
    const length = path.getTotalLength()
    path.style.strokeDasharray = String(length)
    path.style.strokeDashoffset = String(length)
  }, [])

  return <div className={styles['scene06-bottle']} aria-hidden="true">
    <svg viewBox="0 0 120 210" xmlns="http://www.w3.org/2000/svg">
      <path ref={pathRef} className={styles['scene06-bottle-path']} d={BOTTLE_PATH} />
    </svg>
  </div>
}
