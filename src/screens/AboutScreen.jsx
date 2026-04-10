import useAppStore from '../store/useAppStore'
import styles from './AboutScreen.module.css'

const TEAM = [
  {
    initials: 'ГШ',
    name: 'Ганна Швець',
    callsign: 'Навігаторка розвитку',
    role: 'Педагог, Психологиня та Методистка місій',
    sector: 'Емоційний інтелект, розвиток, структура навчання',
    description:
      'Контролює баланс між пригодою та гармонійним розвитком. Перевіряє, щоб кожна місія відповідала віку та підтримувала емоційний стан дитини.',
    superpower: 'перетворює навчання на безпечний і підтримуючий простір',
    color: '#34d4c8',
    glow: 'rgba(52,212,200,0.25)',
  },
  {
    initials: 'АК',
    name: 'Анна Кіпря',
    callsign: 'Архітекторка історій',
    role: 'Письменниця, сценаристка, наративна дизайнерка',
    sector: 'Казки, уява, сюжетні місії',
    description:
      'Відповідає за створення історій у яких проходять усі навчальні місії. Перекладає складні ідеї на мову захопливих сюжетів.',
    superpower: 'перетворює навчання на захопливі і веселі пригоди',
    color: '#f4b942',
    glow: 'rgba(244,185,66,0.25)',
  },
]

export default function AboutScreen() {
  const { navigate } = useAppStore()

  return (
    <div className={styles.screen}>
      {/* Stars */}
      <div className={styles.stars} aria-hidden="true">
        {Array.from({ length: 70 }).map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${(Math.random() * 4).toFixed(2)}s`,
              width: Math.random() > 0.75 ? 3 : 2,
              height: Math.random() > 0.75 ? 3 : 2,
            }}
          />
        ))}
      </div>

      <div className={styles.inner}>
        <button className={styles.backBtn} onClick={() => navigate('adventure-map')}>
          ← Карта пригод
        </button>

        <div className={styles.badge}>✦ Екіпаж місії ✦</div>
        <h1 className={styles.title}>Про команду</h1>
        <p className={styles.subtitle}>
          Люди, які створюють Маленький Всесвіт
        </p>

        <div className={styles.cards}>
          {TEAM.map((m) => (
            <div
              key={m.initials}
              className={styles.card}
              style={{ '--member-color': m.color, '--member-glow': m.glow }}
            >
              {/* Glow corner */}
              <div className={styles.cardGlow} />

              {/* Avatar */}
              <div className={styles.avatar}>
                {m.initials}
              </div>

              <div className={styles.callsign}>{m.callsign}</div>
              <h2 className={styles.name}>{m.name}</h2>

              <div className={styles.meta}>
                <span className={styles.metaIcon}>🚀</span>
                <span>{m.role}</span>
              </div>
              <div className={styles.meta}>
                <span className={styles.metaIcon}>🌍</span>
                <span>{m.sector}</span>
              </div>

              <p className={styles.desc}>{m.description}</p>

              <div className={styles.superpower}>
                <span className={styles.superpowerLabel}>Суперсила: </span>
                {m.superpower}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
