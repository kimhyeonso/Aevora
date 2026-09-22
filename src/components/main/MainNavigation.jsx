import logo from '../../assets/logo.svg'
import styles from './MainNavigation.module.scss'

const LINKS = ['SCENTS', 'PLAYGROUND', 'ABOUT', 'CART (0)']

export default function MainNavigation() {
  return <header className={styles.nav}>
    <img className={styles.logo} src={logo} alt="AEVORA" />
    <nav className={styles.links} aria-label="Primary">
      {LINKS.map((label) => <button key={label} type="button">{label}</button>)}
    </nav>
  </header>
}
