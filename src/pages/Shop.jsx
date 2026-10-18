import { useState } from 'react'
import { Link } from 'react-router-dom'
import blancheScene from '../assets/home/01blanche.png'
import blancheBottle from '../assets/home/01blancheBottle.png'
import mojaveScene from '../assets/home/02MojaveGhost.png'
import balScene from '../assets/home/03BalDafrique.png'
import roseScene from '../assets/home/04RoseOfOn.png'
import libraryScene from '../assets/home/05Bibliotheque.png'
import mojaveBottle from '../assets/home/02MojaveGhostBottle.png'
import balBottle from '../assets/home/03BalDafriqueBottle.png'
import roseBottle from '../assets/home/04RoseOfOnBottle.png'
import libraryBottle from '../assets/home/05BibliothequeBottle.png'
import styles from './Shop.module.scss'

const perfumes = [
  { id: 'blanche', price: 55000, name: 'BLANCHE', korean: '블랑쉬', mood: '깨끗한 빛으로 채운 아침', description: '하얀 패브릭 위로 내려앉은 부드러운 햇살. 맑고 포근한 분위기로 하루의 첫 순간을 열어보세요.', scene: blancheScene, bottle: blancheBottle, color: '#eeece7' },
  { id: 'mojave', price: 59000, name: 'MOJAVE GHOST', korean: '모하비 고스트', mood: '고요한 사막에 피어난 잔향', description: '햇살이 스며든 모래와 바람의 결. 고요하고 부드러운 분위기를 당신의 일상에 더해보세요.', scene: mojaveScene, bottle: mojaveBottle, color: '#eee9dc' },
  { id: 'bal', price: 65000, name: "BAL D’AFRIQUE", korean: '발 다프리크', mood: '찬란한 순간의 자유로움', description: '따스한 빛과 생동하는 풍경처럼. 평범한 하루에도 특별한 리듬을 선물합니다.', scene: balScene, bottle: balBottle, color: '#e9e5d7' },
  { id: 'rose', price: 72000, name: 'ROSE OF NO MAN’S LAND', korean: '로즈 오브 노 맨즈 랜드', mood: '조용히 피어나는 장미의 온기', description: '섬세하면서도 깊이 있는 장미의 인상. 오래 기억하고 싶은 마음을 향으로 전해보세요.', scene: roseScene, bottle: roseBottle, color: '#ede2df' },
  { id: 'bibliotheque', price: 79000, name: 'BIBLIOTHÈQUE', korean: '비블리오테크', mood: '책장 사이에 머무는 깊은 여운', description: '오래된 책장을 넘기는 느긋한 오후. 당신만의 시간에 차분한 깊이를 더합니다.', scene: libraryScene, bottle: libraryBottle, color: '#e5e0d8' },
]

export default function Shop() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = perfumes[activeIndex]
  const changeSlide = (direction) => setActiveIndex((index) => (index + direction + perfumes.length) % perfumes.length)

  return (
    <div className={styles.shop}>
      <header className={styles.header}>
        <nav aria-label="주 메뉴"><Link to="/main">HOME</Link><Link to="/about">ABOUT</Link></nav>
        <Link className={styles.logo} to="/main" aria-label="AEVORA 메인으로">AEVORA</Link>
        <a className={styles.collectionLink} href="#collection">OUR COLLECTION ↗</a>
      </header>
      <main>
        <section className={styles.hero} aria-label="향수 컬렉션 소개">
          <img className={styles.heroImage} src={active.scene} alt="" />
          <div className={styles.heroShade} />
          <button className={`${styles.arrow} ${styles.previous}`} onClick={() => changeSlide(-1)} aria-label="이전 향수">‹</button>
          <div className={styles.heroCopy} aria-live="polite">
            <span className={styles.eyebrow}>THE AEVORA COLLECTION</span>
            <h1>{active.mood}</h1>
            <p>{active.name}</p>
            <a href={`#story-${active.id}`}>향의 이야기 만나보기 <span>↗</span></a>
          </div>
          <button className={`${styles.arrow} ${styles.next}`} onClick={() => changeSlide(1)} aria-label="다음 향수">›</button>
          <div className={styles.pagination}>
            {perfumes.map((perfume, index) => <button key={perfume.id} onClick={() => setActiveIndex(index)} aria-label={`${perfume.korean} 보기`} aria-pressed={index === activeIndex}><span /></button>)}
          </div>
          <span className={styles.heroNumber}>0{activeIndex + 1} / {String(perfumes.length).padStart(2, '0')}</span>
        </section>

        <section className={styles.section} id="collection">
          <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>OUR COLLECTION</span><h2>당신의 순간을 위한 다섯 가지 향</h2></div><span className={styles.count}>EAU DE PARFUM · {String(perfumes.length).padStart(2, '0')}</span></div>
          <div className={styles.products}>
            {perfumes.map((perfume, index) => <a className={styles.product} key={perfume.id} href={`#story-${perfume.id}`}>
              <div className={styles.productImage} style={{ '--product-color': perfume.color }}><span className={styles.productNumber}>0{index + 1}</span><img src={perfume.bottle} alt={`${perfume.korean} 향수 보틀`} loading="lazy" /><span className={styles.productView}>DISCOVER ↗</span></div>
              <p className={styles.productCategory}>AEVORA COLLECTION</p><h3>{perfume.name}</h3><p className={styles.korean}>{perfume.korean}</p><p className={styles.mood}>{perfume.mood}</p><p className={styles.price}>{perfume.price.toLocaleString('ko-KR')}원</p>
            </a>)}
          </div>
        </section>

        <section className={`${styles.section} ${styles.giftSection}`}>
          <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>A SCENT TO REMEMBER</span><h2>마음을 전하는 또 하나의 방법</h2></div></div>
          <div className={styles.gift}>
            <div className={styles.giftImage}><img src={roseScene} alt="장미 향을 떠올리게 하는 따뜻한 풍경" loading="lazy" /><div><span className={styles.eyebrow}>THE ART OF GIVING</span><h3>기억에 남을 선물,<br />오래 머무는 향.</h3></div></div>
            <div className={styles.giftCopy}><span className={styles.eyebrow}>FOR SOMEONE SPECIAL</span><h3>말 대신,<br />향으로 전하는 마음</h3><p>소중한 사람의 취향을 떠올려보세요.<br />다섯 가지 향 속에서 그 사람을 닮은<br />특별한 순간을 만나보세요.</p><a href="#collection">선물할 향 살펴보기 <span>↗</span></a></div>
          </div>
        </section>

        <div className={styles.brandStrip}><span>AEVORA</span><p>모든 순간은, 향이 된다.</p><Link to="/main">브랜드의 세계로 ↗</Link></div>

        <section className={styles.section}>
          <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>SCENT STORIES</span><h2>향이 펼쳐지는 다섯 개의 풍경</h2></div><span className={styles.count}>FIND YOUR OWN SCENT</span></div>
          <div className={styles.stories}>
            {perfumes.map((perfume, index) => <article className={styles.story} id={`story-${perfume.id}`} key={perfume.id}>
              <img src={perfume.scene} alt={`${perfume.korean}의 분위기를 표현한 풍경`} loading="lazy" />
              <div className={styles.storyCopy}><span className={styles.eyebrow}>0{index + 1} / {perfume.korean}</span><h3>{perfume.name}</h3><p>{perfume.description}</p><a href="#collection">컬렉션 보기 ↗</a></div>
            </article>)}
          </div>
        </section>
      </main>
      <footer className={styles.footer}><div><Link className={styles.logo} to="/main">AEVORA</Link><p>일상에 스며들어, 기억으로 남는 향.</p><small>© AEVORA. All rights reserved.</small></div><nav aria-label="하단 메뉴"><Link to="/main">HOME ↗</Link><Link to="/about">ABOUT ↗</Link><a href="#collection">COLLECTION ↑</a></nav></footer>
    </div>
  )
}
