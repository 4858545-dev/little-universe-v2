import styles from './Card.module.css'

export default function Card({ glow = false, glowColor, onClick, children, className = '' }) {
  return (
    <div
      onClick={onClick}
      style={glowColor ? { '--card-glow': glowColor } : undefined}
      className={[
        styles.card,
        glow ? styles.glow : '',
        onClick ? styles.clickable : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
