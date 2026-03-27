import useAppStore from '../store/useAppStore'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import styles from './HomeScreen.module.css'

const COMPANION_META = {
  lumi:   { emoji: '🦊', name: 'Лумі',   color: 'var(--lumi-color)',   greeting: 'Привіт! Готова до нових пригод?' },
  orbita: { emoji: '🐐', name: 'Орбіта', color: 'var(--orbita-color)', greeting: 'Привіт! Сьогодні вивчимо щось нове?' },
  zorx:   { emoji: '🌟', name: 'Зоркс',  color: 'var(--zorx-color)',   greeting: 'Привіт! Вирішимо задачу разом?' },
  marik:  { emoji: '👽', name: 'Марік',  color: 'var(--marik-color)',  greeting: 'Привіт! Час для дослідів!' },
}

export default function HomeScreen() {
  const { companion, childName, coins, completedLessons, navigate } = useAppStore()
  const meta = COMPANION_META[companion] || COMPANION_META.lumi
  const progress = Math.min(100, completedLessons.length * 20)

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.greeting}>
          <span className={styles.companionEmoji}>{meta.emoji}</span>
          <div>
            <p className={styles.greetingText}>{meta.greeting}</p>
            {childName && <p className={styles.childName}>{childName}</p>}
          </div>
        </div>
        <div className={styles.coins}>
          <span>🪙</span>
          <span className={styles.coinsCount}>{coins}</span>
        </div>
      </header>

      <main className={styles.main}>
        <Card className={styles.progressCard}>
          <div className={styles.progressHeader}>
            <span className={styles.progressTitle}>Прогрес місії</span>
            <Badge variant="gold">{completedLessons.length} уроків</Badge>
          </div>
          <ProgressBar value={progress} color="--gold" />
        </Card>

        <div className={styles.actions}>
          <Button variant="gold" size="lg" onClick={() => navigate('adventure-map')}>
            🗺 Карта пригод
          </Button>
          <Button variant="ghost" size="md" onClick={() => navigate('profile')}>
            Мій профіль
          </Button>
        </div>
      </main>
    </div>
  )
}
