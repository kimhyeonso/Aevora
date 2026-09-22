import { useEffect, useRef, useState } from 'react'
import track from '../../../assets/intro/intro-music.mp3'
import styles from './IntroAudio.module.scss'

export default function IntroAudio() {
  const audioRef = useRef(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    audioRef.current?.play().catch(() => {})
  }, [])

  function toggleMuted() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().catch(() => {})
    setMuted((current) => !current)
  }

  return <>
    <audio ref={audioRef} src={track} loop muted={muted} />
    <button
      type="button"
      className={styles['intro-audio-toggle']}
      onClick={toggleMuted}
      aria-label={muted ? 'Play intro music' : 'Mute intro music'}
      aria-pressed={!muted}
    >
      {muted
        ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="4 9 8 9 12 5 12 19 8 15 4 15 4 9" />
          <line x1="16" y1="9" x2="21.5" y2="15" />
          <line x1="21.5" y1="9" x2="16" y2="15" />
        </svg>
        : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="4 9 8 9 12 5 12 19 8 15 4 15 4 9" />
          <path d="M16 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 6a8.5 8.5 0 0 1 0 12" />
        </svg>}
    </button>
  </>
}
