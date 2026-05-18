import useAppStore from '../../store/useAppStore'
import useAuthStore from '../../store/useAuthStore'
import styles from './AppFooter.module.css'

const NAV = [
  { id: 'adventure-map', emoji: '🗺', label: 'Карта' },
  { id: 'profile',       emoji: '👤', label: 'Профіль' },
]

function InstagramIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M21.8 3.2L2.6 10.7c-1.3.5-1.3 1.3-.2 1.6l4.8 1.5 11.1-7c.5-.3 1 0 .6.4L9.8 16l-.4 5c.6 0 .8-.3 1.1-.6l2.7-2.6 4.9 3.6c.9.5 1.6.2 1.8-.8L22.8 4.3c.3-1.2-.5-1.7-1-1.1z" fill="currentColor"/>
    </svg>
  )
}

export default function AppFooter() {
  const { screen, navigate } = useAppStore()
  const { logout } = useAuthStore()

  return (
    <footer className={styles.footer}>
      <nav className={styles.navRow} aria-label="Навігація">
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
          href="https://forms.gle/1VfZ618G1WT1xE3z8"
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
      <div className={styles.socialRow}>
        <a
          href="https://www.instagram.com/little_universe_kids"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="Instagram"
        >
          <InstagramIcon />
        </a>
        <a
          href="https://t.me/+KBg-YoLiqTVmNmJi"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="Telegram"
        >
          <TelegramIcon />
        </a>
      </div>
      <p className={styles.copyright}>© 2026 Маленький Всесвіт</p>
    </footer>
  )
}
