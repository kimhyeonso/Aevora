import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import styles from './MainNavigation.module.scss'

const LINKS = [
  { label: 'ABOUT', to: '/about' },
  { label: 'SHOP', to: '/shop' },
]

export default function MainNavigation({ color }) {
  return <header className={styles.nav} style={{ '--nav-color': color }}>
    <Link to="/main" className={styles.logo} style={{ '--logo-mask': `url(${logo})` }} role="img" aria-label="AEVORA" />
    <nav className={styles.links} aria-label="Primary">
      {LINKS.map(({ label, to }) => <Link key={label} to={to}>{label}</Link>)}
    </nav>
  </header>
}
