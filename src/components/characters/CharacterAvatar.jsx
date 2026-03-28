import styles from './CharacterAvatar.module.css'

const CHAR_DATA = {
  lumi:   { emoji: '🦊', color: 'var(--lumi-color)',   gradient: 'var(--lumi-gradient)' },
  orbita: { emoji: '🐐', color: 'var(--orbita-color)', gradient: 'var(--orbita-gradient)' },
  zorx:   { emoji: '🌟', color: 'var(--zorx-color)',   gradient: 'var(--zorx-gradient)' },
  marik:  { emoji: '👽', color: 'var(--marik-color)',  gradient: 'var(--marik-gradient)' },
}

const SIZES = { sm: 40, md: 64, lg: 96 }

export default function CharacterAvatar({ character, size = 'md' }) {
  const data = CHAR_DATA[character]
  if (!data) return null
  const px = SIZES[size] ?? SIZES.md

  return (
    <div
      className={styles.border}
      style={{
        '--char-color': data.color,
        '--char-gradient': data.gradient,
        '--size': `${px}px`,
      }}
    >
      <div className={styles.inner}>
        <span className={styles.emoji} style={{ fontSize: `${Math.round(px * 0.45)}px` }}>
          {data.emoji}
        </span>
      </div>
    </div>
  )
}
