import useAppStore from '../store/useAppStore'
import Button from '../components/ui/Button'
import styles from './OnboardingScreen.module.css'

const CHARACTERS = [
  { id: 'lumi',   emoji: '🦊', name: 'Лумі',   subject: 'Творчість та казки',   color: 'var(--lumi-color)' },
  { id: 'orbita', emoji: '🐐', name: 'Орбіта', subject: 'Грамота та мовлення',  color: 'var(--orbita-color)' },
  { id: 'zorx',   emoji: '🌟', name: 'Зоркс',  subject: 'Математика та логіка', color: 'var(--zorx-color)' },
  { id: 'marik',  emoji: '👽', name: 'Марік',  subject: 'STEM та наука',        color: 'var(--marik-color)' },
]

export default function OnboardingScreen() {
  const { companion, setCompanion, navigate } = useAppStore()

  const handleStart = () => {
    if (companion) navigate('home')
  }

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <h1 className={styles.title}>Маленький Всесвіт</h1>
        <p className={styles.subtitle}>Обери свого космічного напарника</p>
      </div>

      <div className={styles.grid}>
        {CHARACTERS.map((char, i) => (
          <button
            key={char.id}
            className={[styles.card, companion === char.id ? styles.selected : ''].join(' ')}
            style={{ '--char-color': char.color, '--i': i }}
            onClick={() => setCompanion(char.id)}
          >
            <span className={styles.emoji}>{char.emoji}</span>
            <span className={styles.name}>{char.name}</span>
            <span className={styles.subject}>{char.subject}</span>
            {companion === char.id && <span className={styles.check}>✓</span>}
          </button>
        ))}
      </div>

      <Button
        variant="gold"
        size="lg"
        disabled={!companion}
        onClick={handleStart}
      >
        Розпочати місію
      </Button>
    </div>
  )
}
