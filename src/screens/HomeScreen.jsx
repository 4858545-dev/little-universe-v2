import { useState } from 'react'
import useAppStore from '../store/useAppStore'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import styles from './HomeScreen.module.css'

const COMPANION_META = {
  lumi:   { emoji: '🦊', name: 'Лумі',   color: 'var(--lumi-color)',   greeting: 'Готова до нових пригод?' },
  orbita: { emoji: '🐐', name: 'Орбіта', color: 'var(--orbita-color)', greeting: 'Сьогодні вивчимо щось нове?' },
  zorx:   { emoji: '🌟', name: 'Зоркс',  color: 'var(--zorx-color)',   greeting: 'Вирішимо задачу разом?' },
  marik:  { emoji: '👽', name: 'Марік',  color: 'var(--marik-color)',  greeting: 'Час для дослідів!' },
}

const USER_FLOWS = {
  specialist: {
    label: 'Спеціаліст',
    emoji: '🎓',
    steps: [
      { icon: '🔗', text: 'Стикування' },
      { icon: '🖥',  text: 'Панель керування' },
      { icon: '🌍', text: 'Обрати планету' },
      { icon: '🔍', text: 'Перегляд ресурсів' },
      { icon: '📦', text: 'Взяти на борт' },
      { icon: '🚀', text: 'Прокачка екіпажу' },
    ],
  },
  parent: {
    label: 'Батько',
    emoji: '🏠',
    steps: [
      { icon: '🔗', text: 'Стикування' },
      { icon: '🏡', text: 'Домашня Станція' },
      { icon: '🗺',  text: 'Дослідити планети' },
      { icon: '☄️', text: 'Метеоритний сюрприз' },
      { icon: '🎲', text: 'Збирати та грати' },
      { icon: '🚀', text: 'Космопорт Знань' },
    ],
  },
}

export default function HomeScreen() {
  const { companion, childName, coins, completedLessons, navigate } = useAppStore()
  const [activeTab, setActiveTab] = useState('specialist')
  const meta = COMPANION_META[companion] || COMPANION_META.lumi
  const progress = Math.min(100, completedLessons.length * 20)
  const flow = USER_FLOWS[activeTab]

  return (
    <div className={styles.screen}>
      {/* Header */}
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
        {/* Progress card */}
        <Card className={styles.progressCard}>
          <div className={styles.progressHeader}>
            <span className={styles.progressTitle}>Прогрес місії</span>
            <Badge variant="gold">{completedLessons.length} уроків</Badge>
          </div>
          <ProgressBar value={progress} color="--gold" />
        </Card>

        {/* Mission route / user flow */}
        <div className={styles.flowSection}>
          <p className={styles.flowHeading}>Маршрут місії</p>
          <div className={styles.tabs}>
            {Object.entries(USER_FLOWS).map(([key, f]) => (
              <button
                key={key}
                className={[styles.tab, activeTab === key ? styles.tabActive : ''].join(' ')}
                onClick={() => setActiveTab(key)}
              >
                <span>{f.emoji}</span>
                <span>{f.label}</span>
              </button>
            ))}
          </div>
          <div className={styles.flowSteps}>
            {flow.steps.map((step, i) => (
              <div key={i} className={styles.flowStep} style={{ '--i': i }}>
                <div className={styles.stepOrb}>
                  <span>{step.icon}</span>
                </div>
                <span className={styles.stepText}>{step.text}</span>
                {i < flow.steps.length - 1 && (
                  <span className={styles.stepArrow}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button variant="gold" size="lg" onClick={() => navigate('adventure-map')}>
            🗺 Карта пригод
          </Button>
          <Button variant="ghost" size="md" onClick={() => navigate('profile')}>
            Посвідчення екіпажу
          </Button>
        </div>
      </main>
    </div>
  )
}
