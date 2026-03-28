import styles from './OrnamentRings.module.css'

export default function OrnamentRings() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.ring1} />
      <div className={styles.ring2} />
      <div className={styles.ring3} />
    </div>
  )
}
