import { useEffect } from 'react'

export default function useGsapContext(setup) {
  useEffect(() => setup?.(), [setup])
}
