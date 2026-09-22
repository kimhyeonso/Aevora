import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsapSetup'
import styles from './ScentTransition.module.scss'

export default function ScentTransition({ activeId }) {
  const overlayRef = useRef(null)
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return undefined }
    const overlay = overlayRef.current
    if (!overlay) return undefined
    const context = gsap.context(() => {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: .4, ease: 'power1.inOut', yoyo: true, repeat: 1 })
    })
    return () => context.revert()
  }, [activeId])

  return <div className={styles.overlay} ref={overlayRef} aria-hidden="true" />
}
