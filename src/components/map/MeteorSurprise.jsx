import useAppStore from '../../store/useAppStore'
import styles from './MeteorSurprise.module.css'

const REWARDS = [
  '🎲 Робочий аркуш-лабіринт — Логічний лабіринт Зоркса!',
  '🖍 Розмальовка — Палітра емоцій Люмі!',
  '📖 Міні-історія — Скоромовка від Орбіти!',
  '🔬 Швидкий експеримент — Лабораторія Маріка!',
  '🏡 5-хвилинна гра — Бліцактивність Домашньої Станції!',
  '⭐ Бонусний пазл — Галактична головоломка!',
]

export default function MeteorSurprise() {
  const { showToast, setMeteorUsed } = useAppStore()

  function handleClick() {
    const reward = REWARDS[Math.floor(Math.random() * REWARDS.length)]
    showToast({ message: `🎁 ${reward}`, type: 'reward' })
    setMeteorUsed()
  }

  return (
    <button
      className={styles.meteor}
      onClick={handleClick}
      aria-label="Метеоритний сюрприз"
      title="Метеоритний сюрприз"
    >
      <span className={styles.icon}>☄️</span>
      <span className={styles.label}>Сюрприз!</span>
    </button>
  )
}
