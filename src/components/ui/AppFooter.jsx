import useAppStore from '../../store/useAppStore'
import styles from './AppFooter.module.css'

const NAV = [
  { id: 'home',          emoji: '🏠', label: 'Головна' },
  { id: 'adventure-map', emoji: '🗺', label: 'Карта' },
  { id: 'profile',       emoji: '👤', label: 'Профіль' },
]

export default function AppFooter() {
  const { screen, navigate } = useAppStore()

  return (
    <nav className={styles.footer} aria-label="Навігація">
      {NAV.map((n) => (
        <button
          key={n.id}
          className={[styles.navBtn, screen === n.id ? styles.active : ''].join(' ')}
          onClick={() => navigate(n.id)}
          aria-current={screen === n.id ? 'page' : undefined}
        >
          <span className={styles.navEmoji}>{n.emoji}</span>
          <span className={styles.navLabel}>{n.label}</span>
        </button>
      ))}
    </nav>
  )
}
