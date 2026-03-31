import { useState } from 'react'
import useAppStore from '../../store/useAppStore'
import SurprisePopup from './SurprisePopup'
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
  const { setMeteorUsed } = useAppStore()
  const [popup, setPopup] = useState(null)

  function handleClick() {
    const reward = REWARDS[Math.floor(Math.random() * REWARDS.length)]
    setPopup(`🎁 ${reward}`)
    setMeteorUsed()
  }

  return (
    <>
      <button
        className={styles.meteor}
        onClick={handleClick}
        aria-label="Метеоритний сюрприз"
        title="Метеоритний сюрприз"
      >
        <span className={styles.icon}>☄️</span>
        <span className={styles.label}>Сюрприз!</span>
      </button>
      {popup && <SurprisePopup reward={popup} onClose={() => setPopup(null)} />}
    </>
  )
}
