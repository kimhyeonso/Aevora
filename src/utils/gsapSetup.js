import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export function createScrollTimeline(config) {
  return gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      scrub: 1,
      anticipatePin: 1,
      ...config,
    },
  })
}
