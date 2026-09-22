import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsapSetup'
import styles from './PerfumeContent.module.scss'

export default function PerfumeContent({ perfume }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined
    const context = gsap.context(() => {
      gsap.fromTo(
        container.children,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: .7, ease: 'power2.out', stagger: .06 },
      )
    }, container)
    return () => context.revert()
  }, [perfume.id])

  return <div className={styles.content} ref={containerRef}>
    <strong className={styles.name}>{perfume.name}</strong>
    <p className={styles.subtitle}>{perfume.subtitle}.</p>
    <p className={styles.description}>{perfume.description}</p>
    <button type="button" className={styles.cta}>DISCOVER THE SCENT <span aria-hidden="true">→</span></button>
  </div>
}
