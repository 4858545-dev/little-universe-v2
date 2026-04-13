import useAppStore from '../../store/useAppStore'
import useAuthStore from '../../store/useAuthStore'
import styles from './AppFooter.module.css'

const NAV = [
  { id: 'adventure-map', emoji: '🗺', label: 'Карта' },
  { id: 'profile',       emoji: '👤', label: 'Профіль' },
]

export default function AppFooter() {
  const { screen, navigate } = useAppStore()
  const { logout } = useAuthStore()

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
      <a
        href="https://forms.gle/YOUR_FORM_ID"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.navBtn}
        style={{ textDecoration: 'none' }}
        aria-label="Залишити відгук"
      >
        <span className={styles.navEmoji}>✨</span>
        <span className={styles.navLabel}>Відгук</span>
      </a>
      <button
        className={styles.navBtn}
        onClick={logout}
        aria-label="Вийти"
      >
        <span className={styles.navEmoji}>⏏</span>
        <span className={styles.navLabel}>Вийти</span>
      </button>
    </nav>
  )
}
