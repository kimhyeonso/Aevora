import { useEffect, useState } from 'react'

export default function useMousePosition() {
  const [position, setPosition] = useState({ x: .5, y: .5 })
  useEffect(() => {
    const update = (event) => setPosition({ x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight })
    window.addEventListener('pointermove', update, { passive: true })
    return () => window.removeEventListener('pointermove', update)
  }, [])
  return position
}
