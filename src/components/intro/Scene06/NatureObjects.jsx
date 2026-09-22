import styles from './Scene06.module.scss'

const PETAL_PATH = 'M12 2C6.5 6 3 11 3 15.2 3 19.5 7 22 12 22s9-2.5 9-6.8C21 11 17.5 6 12 2Z'
const DROPLET_PATH = 'M12 0C12 0 2 15 2 22a10 10 0 0 0 20 0C22 15 12 0 12 0Z'
const LEAF_PATH = 'M12 2C4 8 4 16 12 22 20 16 20 8 12 2Z M12 4V20'
const LIGHT_PATH = 'M12 0C13 8 16 11 24 12 16 13 13 16 12 24 11 16 8 13 0 12 8 11 11 8 12 0Z'
const TREE_PATH = 'M12 1 4 11h4L2 19h7v4h6v-4h7l-6-8h4L12 1Z'

const OBJECTS = [
  { key: 'petal', className: 'petal', path: PETAL_PATH, color: '#f3b8cc' },
  { key: 'droplet', className: 'droplet', path: DROPLET_PATH, color: '#cfe3e6' },
  { key: 'light', className: 'light', path: LIGHT_PATH, color: '#f6e3a8' },
  { key: 'leaf', className: 'leaf', path: LEAF_PATH, color: '#9db97a' },
  { key: 'tree', className: 'tree', path: TREE_PATH, color: '#7c9468' },
]

export default function NatureObjects() {
  return <div className={styles['scene06-objects']} aria-hidden="true">
    {OBJECTS.map((o) => <div key={o.key} className={`${styles['scene06-object']} ${styles[`scene06-object--${o.className}`]}`}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d={o.path} fill="none" stroke={o.color} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>)}
  </div>
}
