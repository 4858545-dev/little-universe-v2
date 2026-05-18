import { useState } from 'react'
import useAppStore from '../../store/useAppStore'
import useProgressStore from '../../store/useProgressStore'
import Badge from '../ui/Badge'
import styles from './ResourceCard.module.css'

const TIER_BADGE = {
  free:       { variant: 'teal',   label: 'Безкоштовно' },
  premium:    { variant: 'gold',   label: 'Преміум' },
  specialist: { variant: 'purple', label: 'Спеціаліст' },
}

const TYPE_EMOJI = {
  pdf:        '📄',
  video:      '🎬',
  printable:  '🖨',
  guide:      '📖',
  assessment: '📋',
  worksheet:  '📝',
}

export default function ResourceCard({ id, title, type, tier = 'free', description = '', emoji, url, style: extraStyle, compact }) {
  const { showToast } = useAppStore()
  const { markResourceComplete, isResourceComplete } = useProgressStore()
  const [coinPop, setCoinPop] = useState(false)

  const badge = TIER_BADGE[tier] ?? TIER_BADGE.free
  const typeEmoji = emoji ?? TYPE_EMOJI[type] ?? '📦'
  const alreadyDone = id ? isResourceComplete(id) : false

  function handleTakeOnBoard() {
    console.log('Download clicked, id:', id, 'alreadyDone:', alreadyDone)
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      showToast({ message: '📦 Завантажено!', type: 'reward' })
    }

    if (id && !alreadyDone) {
      markResourceComplete(id)
      setCoinPop(true)
      setTimeout(() => setCoinPop(false), 1000)
    }
  }

  return (
    <div className={[styles.card, compact ? styles.compact : ''].join(' ')} style={extraStyle}>
      <div className={styles.top}>
        <span className={styles.typeEmoji}>{typeEmoji}</span>
        <Badge variant={badge.variant}>{badge.label}</Badge>
      </div>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.desc}>{description}</p>}
      <div className={styles.btnWrap}>
        <button
          className={[styles.takeBtn, alreadyDone ? styles.done : ''].join(' ')}
          onClick={handleTakeOnBoard}
        >
          {alreadyDone ? '✓ На борту' : 'Взяти на борт'}
        </button>
        {coinPop && <span className={styles.coinPop}>+10 🪙</span>}
      </div>
    </div>
  )
}
