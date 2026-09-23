import styles from './PerfumeSelector.module.scss'

export default function PerfumeSelector({ perfumes, activeId, onSelect }) {
  return <ul className={styles.selector}>
    {perfumes.map((perfume, index) => (
      <li key={perfume.id} className={styles.entry}>
        <button
          type="button"
          className={`${styles.item}${perfume.id === activeId ? ` ${styles['item--active']}` : ''}`}
          onClick={() => onSelect(perfume.id)}
        >
          <span>{perfume.name}</span>
          <i />
        </button>
        {index < perfumes.length - 1 && <span className={styles.divider} aria-hidden="true" />}
      </li>
    ))}
  </ul>
}
