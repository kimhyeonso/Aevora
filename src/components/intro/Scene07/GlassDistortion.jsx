export default function GlassDistortion({ filterId, displacementRef }) {
  return <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
    <defs>
      <filter id={filterId} x="-60%" y="-60%" width="220%" height="220%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.028" numOctaves="1" seed="7" result="scene07-noise" />
        <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="scene07-noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
}
