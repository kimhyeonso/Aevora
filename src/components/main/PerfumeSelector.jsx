import styles from './PerfumeSelector.module.scss'

export default function PerfumeSelector({ perfumes, activeId, onSelect }) {
  return <ul className={styles.selector}>
    {perfumes.map((perfume) => (
      <li key={perfume.id}>
        <button
          type="button"
          className={`${styles.item}${perfume.id === activeId ? ` ${styles['item--active']}` : ''}`}
          onClick={() => onSelect(perfume.id)}
        >
          <span>{perfume.name}</span>
          <i />
        </button>
      </li>
    ))}
  </ul>
}
