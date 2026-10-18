import { Link } from 'react-router-dom'
import styles from './About.module.scss'

const About = () => {
  return (
    <main className={styles.page}>
      <section className={styles.notice} aria-labelledby="about-heading">
        <div className={styles.computer} aria-hidden="true">
          <div className={styles.monitor}>
            <div className={styles.screen}>
              <div className={styles.spinner}>
                {Array.from({ length: 8 }, (_, index) => (
                  <span key={index} style={{ '--index': index }} />
                ))}
              </div>
            </div>
            <div className={styles.chin} />
          </div>
          <div className={styles.stand} />
          <div className={styles.base} />
        </div>
        <div className={styles.copy}>
          <h1 id="about-heading"><strong>페이지</strong> 준비 중입니다.</h1>
          <p>
            현재 페이지를 제작하고 있습니다.<br />
            가능한 빠른 시일 내에 업데이트하도록 하겠습니다.<br />
            감사합니다.
          </p>
          <Link to="/main" className={styles.homeButton}>
            홈으로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  )
}

export default About
