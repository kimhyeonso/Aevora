import styles from './Home.module.scss'

// The "completely different space" the intro's bottle-entry transition warps
// into — deliberately the opposite register of the intro: bright paper tone
// instead of near-black, static instead of scroll-jacked. Placeholder copy;
// the real site content for this page is a separate task.
export default function Home() {
  return <main className={styles.home}>
    <section className={styles.hero}>
      <p className={styles.mark}>AEVORA</p>
      <h1 className={styles.headline}>모든 순간은,<br />향이 된다.</h1>
      <p className={styles.subhead}>숲을 지나온 바람과 비, 그리고 계절이 머문 자리 — 그 기억들을 작은 병 안에 담았습니다.</p>
    </section>
  </main>
}
