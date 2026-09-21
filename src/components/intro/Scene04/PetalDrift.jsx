import styles from './Scene04.module.scss'

const petals = [
  ['3%', '-16%', '17px', '10s', '-7.4s', '-22deg', '#f7cdd9'],
  ['18%', '-26%', '13px', '8s', '-2.6s', '16deg', '#fbe0e6'],
  ['34%', '-12%', '19px', '11s', '-9.1s', '-34deg', '#f3b8cc'],
  ['49%', '-30%', '12px', '9s', '-4.8s', '24deg', '#fbe0e6'],
  ['63%', '-18%', '18px', '12s', '-10.6s', '-14deg', '#f7cdd9'],
  ['77%', '-34%', '14px', '9.5s', '-3.2s', '30deg', '#f3b8cc'],
  ['9%', '-42%', '15px', '10.5s', '-6.3s', '-40deg', '#fbe0e6'],
  ['58%', '-46%', '16px', '11.5s', '-8.7s', '20deg', '#f7cdd9'],
  ['86%', '-22%', '13px', '8.5s', '-1.9s', '-26deg', '#f3b8cc'],
  ['24%', '-50%', '17px', '12.5s', '-5.5s', '38deg', '#fbe0e6'],
]

function Petal({ color }) {
  return <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.5 6 3 11 3 15.2 3 19.5 7 22 12 22s9-2.5 9-6.8C21 11 17.5 6 12 2Z" fill={color} />
  </svg>
}

export default function PetalDrift() {
  return <div className={styles['scene04-petals']} aria-hidden="true">
    {petals.map(([x, y, size, duration, delay, rotation, color], index) => <span key={`${color}-${index}`} style={{
      '--petal-x': x,
      '--petal-y': y,
      '--petal-size': size,
      '--petal-duration': duration,
      '--petal-delay': delay,
      '--petal-rotation': rotation,
    }}><Petal color={color} /></span>)}
  </div>
}
