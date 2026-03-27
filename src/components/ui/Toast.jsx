import { useEffect } from 'react'
import styles from './Toast.module.css'

const ICONS = {
  success: '✓',
  reward: '🪙',
  info: 'ℹ',
}

export default function Toast({ message, type = 'info', visible, onClose }) {
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div className={[styles.toast, styles[type]].join(' ')} role="status" aria-live="polite">
      <span className={styles.icon}>{ICONS[type]}</span>
      <span className={styles.message}>{message}</span>
      <button className={styles.close} onClick={onClose} aria-label="Закрити">×</button>
    </div>
  )
}
