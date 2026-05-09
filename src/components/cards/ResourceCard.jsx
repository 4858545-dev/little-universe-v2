import useAppStore from '../../store/useAppStore'
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

export default function ResourceCard({ title, type, tier = 'free', description = '', emoji, url, style: extraStyle, compact }) {
  const { showToast } = useAppStore()
  const badge = TIER_BADGE[tier] ?? TIER_BADGE.free
  const typeEmoji = emoji ?? TYPE_EMOJI[type] ?? '📦'

  function handleTakeOnBoard() {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      showToast({ message: '📦 Завантажено!', type: 'reward' })
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
      <button className={styles.takeBtn} onClick={handleTakeOnBoard}>
        Взяти на борт
      </button>
    </div>
  )
}
