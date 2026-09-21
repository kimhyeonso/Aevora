export default function InkReveal() {
  return <span className="scene01-ink" aria-hidden="true">
    <svg viewBox="0 0 400 150" preserveAspectRatio="none"><defs><filter id="scene01-ink-filter"><feTurbulence type="fractalNoise" baseFrequency=".012 .06" numOctaves="3" seed="8" result="noise" /><feDisplacementMap in="SourceGraphic" in2="noise" scale="28" /></filter></defs><ellipse cx="200" cy="75" rx="175" ry="55" filter="url(#scene01-ink-filter)" /></svg>
  </span>
}
