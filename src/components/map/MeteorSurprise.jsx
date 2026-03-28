import useAppStore from '../../store/useAppStore'
import styles from './MeteorSurprise.module.css'

const REWARDS = [
  'Казка «Зоркс і зоряна задача» — завантажено!',
  'Активність дня: «Намалюй свою планету»',
  'PDF-розмальовка від Лумі — безкоштовно!',
  'Загадка від Марика: що важить більше — кілограм вати чи кілограм заліза?',
  'Вірш від Орбіти: «Де живуть слова»',
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
