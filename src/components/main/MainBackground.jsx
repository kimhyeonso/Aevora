import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsapSetup'
import styles from './MainBackground.module.scss'

export default function MainBackground({ perfumes, activeId }) {
  const containerRef = useRef(null)
  const previousId = useRef(activeId)

  useEffect(() => {
    const container = containerRef.current
    const previous = previousId.current
    if (!container || previous === activeId) return undefined

    const incoming = container.querySelector(`[data-id="${activeId}"]`)
    const outgoing = container.querySelector(`[data-id="${previous}"]`)

    const context = gsap.context(() => {
      gsap.set(incoming, { autoAlpha: 0, scale: 1.06 })
      gsap.to(incoming, { autoAlpha: 1, scale: 1, duration: 1.6, ease: 'power2.out' })
      if (outgoing) gsap.to(outgoing, { autoAlpha: 0, scale: 1.03, duration: 1.6, ease: 'power2.out' })
    }, container)

    previousId.current = activeId
    return () => context.revert()
  }, [activeId])

  return <div className={styles.background} ref={containerRef} aria-hidden="true">
    {perfumes.map((perfume, index) => (
      <img
        key={perfume.id}
        data-id={perfume.id}
        src={perfume.background}
        alt={`${perfume.name} 향을 표현한 배경 이미지`}
        className={styles.layer}
        style={index === 0 ? undefined : { opacity: 0 }}
      />
    ))}
  </div>
}
