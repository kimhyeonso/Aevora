import { useCallback, useMemo, useState } from 'react'
import blancheBg from '../assets/home/01blanche.png'
import blancheBottle from '../assets/home/01blancheBottle.png'
import mojaveBg from '../assets/home/02MojaveGhost.png'
import mojaveBottle from '../assets/home/02MojaveGhostBottle.png'
import balBg from '../assets/home/03BalDafrique.png'
import balBottle from '../assets/home/03BalDafriqueBottle.png'
import roseBg from '../assets/home/04RoseOfOn.png'
import roseBottle from '../assets/home/04RoseOfOnBottle.png'
import bibliothequeBg from '../assets/home/05Bibliotheque.png'
import bibliothequeBottle from '../assets/home/05BibliothequeBottle.png'

export const perfumes = [
  {
    id: 'blanche',
    name: 'BLANCHE',
    subtitle: 'The scent of purity',
    description: '깨끗한 공기와 부드러운 린넨의 기억',
    background: blancheBg,
    bottle: blancheBottle,
    bottleLayout: {
      size: 'min(280px, 24vw)',
      right: 'clamp(35px, 10vw, 240px)',
      bottom: '28.5%',
    },
    color: '#EAE8E2',
    textColor: '#333333',
    navigationColor: '#FFFFFF',
    effect: 'light',
    hero: {
      eyebrow: '01 / BLANCHE',
      title: '하얀 공기가 머무는 곳,',
      accent: '가장 순수한 기억.',
      description: '햇살에 말린 리넨과\n막 샤워를 마친 피부의 포근한 기억.',
      secondaryAction: 'DISCOVER BLANCHE',
      pillars: ['PURITY', 'LINEN', 'SKIN', 'LIGHT'],
    },
  },
  {
    id: 'mojave',
    name: 'MOJAVE GHOST',
    subtitle: 'The beauty of silence',
    description: '고요한 사막에서 피어난 신비로운 향',
    background: mojaveBg,
    bottle: mojaveBottle,
    bottleLayout: {
      size: 'min(250px, 24vw)',
      left: 'clamp(40px, 15vw, 300px)',
      bottom: '3%',
    },
    color: '#D6C7B4',
    textColor: '#47382E',
    effect: 'dust',
    hero: {
      eyebrow: '02 / MOJAVE GHOST',
      title: '고요함 속에서,',
      accent: '가장 선명해지는 존재.',
      description: '메마른 땅 위에 홀로 피어난 꽃처럼\n은은하고 깊게 남는 잔상.',
      secondaryAction: 'DISCOVER MOJAVE GHOST',
      pillars: ['SILENCE', 'DESERT', 'MYSTERY', 'BLOOM'],
    },
  },
  {
    id: 'bal',
    name: "BAL D'AFRIQUE",
    subtitle: 'A celebration of life',
    description: '따뜻한 햇살과 자유로운 리듬의 향',
    background: balBg,
    bottle: balBottle,
    bottleLayout: {
      size: 'min(320px, 24vw)',
      right: 'clamp(28px, 8vw, 210px)',
      bottom: '10%',
    },
    color: '#D8B17A',
    textColor: '#493923',
    effect: 'sunlight',
    hero: {
      eyebrow: "03 / BAL D'AFRIQUE",
      title: '햇살과 리듬이,',
      accent: '더 아름답게 피어난다.',
      description: '따뜻한 햇살과 생동하는 리듬이 어우러진\n자유로운 오후의 기억.',
      secondaryAction: "DISCOVER BAL D'AFRIQUE",
      pillars: ['SUNLIGHT', 'RHYTHM', 'FREEDOM', 'JOY'],
    },
  },
  {
    id: 'rose',
    name: "ROSE OF NO MAN'S LAND",
    subtitle: 'A tribute to compassion',
    description: '부드러운 장미가 남긴 따뜻한 기억',
    background: roseBg,
    bottle: roseBottle,
    bottleLayout: {
      size: 'min(280px, 24vw)',
      right: 'clamp(28px, 16vw, 400px)',
      bottom: '19%',
    },
    color: '#D7B8B7',
    textColor: '#4A3136',
    navigationColor: '#FFF7ED',
    effect: 'petals',
    hero: {
      eyebrow: "04 / ROSE OF NO MAN'S LAND",
      title: '따뜻한 장미가,',
      accent: '마음 깊이 스며든다.',
      description: '다정한 꽃잎처럼 오래 남아\n마음을 감싸는 부드러운 온기.',
      secondaryAction: "DISCOVER ROSE OF NO MAN'S LAND",
      pillars: ['ROSE', 'WARMTH', 'CARE', 'MEMORY'],
    },
  },
  {
    id: 'bibliotheque',
    name: 'BIBLIOTHÈQUE',
    subtitle: 'A world of memories',
    description: '오래된 책과 나무가 간직한 깊은 향',
    background: bibliothequeBg,
    bottle: bibliothequeBottle,
    bottleLayout: {
      size: 'min(300px, 24vw)',
      right: 'clamp(28px, 10vw, 250px)',
      bottom: '13%',
    },
    color: '#49352B',
    textColor: '#F4EDE2',
    effect: 'dim',
    hero: {
      eyebrow: '05 / BIBLIOTHÈQUE',
      title: '오래된 책장 사이,',
      accent: '기억처럼 번지는 향.',
      description: '낡은 종이와 나무, 그리고 시간이 쌓인\n공간의 깊은 여운.',
      secondaryAction: 'DISCOVER BIBLIOTHÈQUE',
      pillars: ['BOOKS', 'WOOD', 'TIME', 'STORIES'],
    },
  },
]

export default function usePerfumeAnimation(initialId = perfumes[0].id) {
  const [activeId, setActiveId] = useState(initialId)

  const activeIndex = useMemo(
    () => Math.max(0, perfumes.findIndex((perfume) => perfume.id === activeId)),
    [activeId],
  )
  const active = perfumes[activeIndex]

  const select = useCallback((id) => setActiveId(id), [])
  const next = useCallback(() => {
    setActiveId((current) => {
      const index = perfumes.findIndex((perfume) => perfume.id === current)
      return perfumes[(index + 1) % perfumes.length].id
    })
  }, [])

  return { perfumes, active, activeIndex, select, next }
}
