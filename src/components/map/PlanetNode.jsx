import { useState, useEffect, useRef } from 'react'
import useAppStore from '../../store/useAppStore'
import Button from '../ui/Button'
import styles from './PlanetNode.module.css'

const PLANET_QUESTS = {
  'logic-zorx':   ['Робочі аркуші', 'Відеоуроки', 'Інтерактивні пазли', 'Набори для оцінювання'],
  'art-lumi':     ['Арт-терапевтичні картки', 'Аркуші емоцій', 'Посібники для батьків', 'Протоколи спеціалістів'],
  'logo-orbit':   ['Артикуляційні PDF', 'Фонетичні ігри', 'Конструктори історій', 'Трекери прогресу'],
  'stem-marik':   ['Набори експериментів', 'Щоденники природи', 'Космічні активності', 'STEM-челенджі'],
  'home-station': ['Ідеї для ігор', 'Статті для батьків', 'Швидкі активності', 'Сезонні гайди'],
  cosmodrome:     ['Курси підготовки', 'Тести оцінювання', 'Бейджі навичок', 'Звіти для батьків'],
  'training-hub': ['Живі вебінари', 'Шляхи сертифікації', 'Архів воркшопів', 'Прокачка екіпажу'],
}

// SVG progress ring
function ProgressRing({ progress = 0, color, size = 80 }) {
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const dash = circ * progress
  return (
    <svg
      width={size}
      height={size}
      className={styles.ring}
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="4"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={circ / 4}
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function PlanetNode({ id, meta, unlocked, posClass }) {
  const { navigate, completedLessons } = useAppStore()
  const [open, setOpen] = useState(false)
  const nodeRef = useRef(null)

  const quests = PLANET_QUESTS[id] ?? []
  const done = completedLessons.filter((l) => l.startsWith(id)).length
  const progress = quests.length > 0 ? done / quests.length : 0

  // Close popup on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (nodeRef.current && !nodeRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  function handleNodeClick() {
    if (!unlocked) return
    setOpen((v) => !v)
  }

  function handleStart() {
    setOpen(false)
    navigate('course', { planet: id })
  }

  return (
    <div
      ref={nodeRef}
      className={[styles.wrap, styles[posClass], !unlocked ? styles.locked : ''].join(' ')}
      style={{ '--planet-color': meta.color, '--planet-gradient': meta.gradient }}
    >
      {/* Popup */}
      {open && (
        <div className={styles.popup}>
          <div className={styles.popupHeader}>
            <span className={styles.popupEmoji}>{meta.emoji}</span>
            <div>
              <p className={styles.popupTitle}>{meta.name}</p>
              <p className={styles.popupSubject}>{meta.subject}</p>
            </div>
          </div>
          <ul className={styles.questList}>
            {quests.map((q, i) => (
              <li key={i} className={styles.quest}>
                <span className={styles.questDot} />
                {q}
              </li>
            ))}
          </ul>
          <Button variant="gold" size="sm" onClick={handleStart}>
            Розпочати місію
          </Button>
        </div>
      )}

      {/* Orb */}
      <button
        className={styles.orbBtn}
        onClick={handleNodeClick}
        disabled={!unlocked}
        aria-label={meta.name}
      >
        <div className={styles.ringWrap}>
          <ProgressRing progress={progress} color={meta.color} size={96} />
          <div className={styles.orb}>
            {unlocked ? (
              <span className={styles.emoji}>{meta.emoji}</span>
            ) : (
              <span className={styles.lockIcon}>🔒</span>
            )}
          </div>
        </div>
      </button>
      <span className={styles.label}>{meta.name}</span>
    </div>
  )
}
