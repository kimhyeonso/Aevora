// The "only near the cursor" localization is handled by a CSS mask in
// Scene07.jsx/scss; this filter just needs to read as a gentle glass bend
// rather than a tangled knot. A thin 2.4px stroke displaced by two noise
// octaves at high frequency/scale folds back on itself into little scribbles
// (that's the "부자연스러운" look) — a single low-frequency octave with a
// modest scale bends the line in one smooth wave instead. `displacementRef`
// lets Scene07 animate the `scale` attribute with GSAP for a subtle organic
// breathing motion instead of a static, fixed-strength warp.
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
