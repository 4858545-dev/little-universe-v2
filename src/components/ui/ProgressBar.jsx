import styles from './ProgressBar.module.css'

export default function ProgressBar({ value = 0, color = '--gold', showLabel = false }) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className={styles.track}>
      <div
        className={styles.fill}
        style={{ width: `${clamped}%`, background: `var(${color})` }}
      />
      {showLabel && <span className={styles.label}>{clamped}%</span>}
    </div>
  )
}
