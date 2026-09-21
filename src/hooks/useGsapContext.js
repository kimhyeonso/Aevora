import { useEffect } from 'react'

// Lifecycle-compatible home for animation setup without forcing a GSAP dependency.
export default function useGsapContext(setup) {
  useEffect(() => setup?.(), [setup])
}
