import { useEffect, useRef, useState } from 'react'
import styles from './PerfumeBottle.module.scss'

export default function PerfumeBottle({ image }) {
  const displayedImageRef = useRef(image)
  const [currentImage, setCurrentImage] = useState(image)
  const [previousImage, setPreviousImage] = useState(null)

  useEffect(() => {
    if (image === displayedImageRef.current) return undefined

    setPreviousImage(displayedImageRef.current)
    displayedImageRef.current = image
    setCurrentImage(image)

    const timeoutId = window.setTimeout(() => setPreviousImage(null), 1600)
    return () => window.clearTimeout(timeoutId)
  }, [image])

  return <div className={styles.bottle} aria-hidden="true">
    {previousImage && <img className={`${styles.image} ${styles['image--previous']}`} src={previousImage} alt="" />}
    <img className={`${styles.image}${previousImage ? ` ${styles['image--current']}` : ''}`} src={currentImage} alt="" />
    <span className={styles.shadow} />
  </div>
}
