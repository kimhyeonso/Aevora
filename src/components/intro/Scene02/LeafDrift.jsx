import leaf01 from '../../../assets/intro/scene02/umbrage.png'
import leaf02 from '../../../assets/intro/scene02/umbrage02.png'
import leaf03 from '../../../assets/intro/scene02/umbrage03.png'
import leaf04 from '../../../assets/intro/scene02/umbrage04.png'
import leaf05 from '../../../assets/intro/scene02/umbrage05.png'
import leaf06 from '../../../assets/intro/scene02/umbrage06.png'
import leaf07 from '../../../assets/intro/scene02/umbrage07.png'
import styles from './Scene02.module.scss'

const leaves = [
  [leaf01, '2%', '-18%', '90px', '11s', '-8.6s', '-24deg'],
  [leaf02, '20%', '-24%', '64px', '9s', '-4.2s', '18deg'],
  [leaf03, '42%', '-12%', '78px', '12s', '-9.4s', '-42deg'],
  [leaf04, '68%', '-28%', '58px', '10s', '-6.7s', '26deg'],
  [leaf05, '88%', '-10%', '72px', '13s', '-11.2s', '-16deg'],
  [leaf06, '11%', '-36%', '48px', '8s', '-2.1s', '38deg'],
  [leaf07, '53%', '-32%', '68px', '11s', '-7.8s', '-30deg'],
  [leaf02, '78%', '-42%', '52px', '9s', '-5.4s', '14deg'],
  [leaf04, '30%', '-48%', '70px', '12s', '-10.1s', '-50deg'],
  [leaf06, '94%', '-34%', '44px', '8s', '-3.6s', '32deg'],
]

export default function LeafDrift() {
  return <div className={styles['scene02-leaves']} aria-hidden="true">
    {leaves.map(([source, x, y, size, duration, delay, rotation], index) => <span key={`${source}-${index}`} style={{ '--leaf-x': x, '--leaf-y': y, '--leaf-size': size, '--leaf-duration': duration, '--leaf-delay': delay, '--leaf-rotation': rotation }}><img src={source} alt="바람에 흩날리는 나뭇잎" /></span>)}
  </div>
}
