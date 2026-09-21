import background02 from '../../../assets/intro/scene04/background02.png'
import styles from './Scene04.module.scss'

// Finer than a plain grid needs to be — this is the tradeoff point between
// "reads as cherry-blossom-petal sized" and keeping the DOM/GSAP load sane
// (a literal petal-scale grid would run into the thousands of elements).
export const SHATTER_COLS = 16
export const SHATTER_ROWS = 10

// Random column widths / row heights (instead of a uniform grid) so pieces
// come out different sizes, and each piece's outline is its own jittered
// polygon rather than one shape stamped identically everywhere — a uniform
// honeycomb of identical cells read as unnervingly artificial.
function randomSplits(count, min, max) {
  const weights = Array.from({ length: count }, () => min + Math.random() * (max - min))
  const total = weights.reduce((sum, w) => sum + w, 0)
  return weights.map((w) => (w / total) * 100)
}

function cumulative(splits) {
  const out = [0]
  splits.forEach((s) => out.push(out[out.length - 1] + s))
  return out
}

// A single cherry-blossom petal outline: rounded at the base (where it
// would meet the flower's center), widening out, and finishing in the
// shallow notch/cleft that gives sakura petals their distinctive tip —
// instead of the plain teardrop/leaf silhouette used before.
const BASE_POINTS = [
  [50, 100], [24, 80], [9, 55], [7, 30], [19, 11],
  [38, 3], [50, 15], [62, 3], [81, 11], [93, 30],
  [91, 55], [76, 80],
]

function shatterClipPath() {
  const jitter = (v) => Math.max(0, Math.min(100, v + (Math.random() - 0.5) * 14))
  return `polygon(${BASE_POINTS.map(([x, y]) => `${jitter(x).toFixed(1)}% ${jitter(y).toFixed(1)}%`).join(', ')})`
}

const colWidths = randomSplits(SHATTER_COLS, 4, 10)
const rowHeights = randomSplits(SHATTER_ROWS, 6, 14)
const colX = cumulative(colWidths)
const rowY = cumulative(rowHeights)

const tiles = []
for (let row = 0; row < SHATTER_ROWS; row++) {
  for (let col = 0; col < SHATTER_COLS; col++) {
    const left = colX[col]
    const top = rowY[row]
    const width = colWidths[col]
    const height = rowHeights[row]
    tiles.push({ key: `${row}-${col}`, left, top, width, height, clipPath: shatterClipPath() })
  }
}

// Sits exactly over background02, invisible at rest, and is only swapped in
// for the instant the exit begins (see Scene04.jsx): each tile is one
// irregular, varying-size slice of the same photo, so the crossfade reads as
// the image itself tearing apart rather than a plain fade, right before the
// pieces are swept away left to right along with PetalWipe's burst. The
// nested <img> is sized and offset in percentages relative to its own
// (variable-size) tile box so it reconstructs exactly the right slice of the
// full photo, however large or small that particular tile turned out to be.
export default function BackgroundShatter() {
  return <div className={styles['scene04-shatter']} aria-hidden="true">
    {tiles.map((t) => <div key={t.key} className={styles['scene04-shatter-tile']} style={{
      left: `${t.left}%`,
      top: `${t.top}%`,
      width: `${t.width}%`,
      height: `${t.height}%`,
      clipPath: t.clipPath,
    }}>
      <img src={background02} alt="" style={{
        left: `${-(t.left / t.width) * 100}%`,
        top: `${-(t.top / t.height) * 100}%`,
        width: `${(100 / t.width) * 100}%`,
        height: `${(100 / t.height) * 100}%`,
      }} />
    </div>)}
  </div>
}
