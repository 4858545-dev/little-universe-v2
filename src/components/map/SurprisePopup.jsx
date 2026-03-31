import useAppStore from '../../store/useAppStore'
import styles from './SurprisePopup.module.css'

export default function SurprisePopup({ reward, onClose }) {
  const { showToast } = useAppStore()

  function handleClaim() {
    showToast({ message: reward, type: 'reward' })
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Метеоритний сюрприз"
      >
        <span className={styles.meteorIcon}>☄️</span>
        <h2 className={styles.title}>Метеоритний сюрприз!</h2>
        <div className={styles.divider} />
        <p className={styles.rewardText}>{reward}</p>
        <button className={styles.claimBtn} onClick={handleClaim}>
          Забрати нагороду
        </button>
      </div>
    </div>
  )
}
