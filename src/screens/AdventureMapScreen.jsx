import useAppStore from '../store/useAppStore'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import styles from './AdventureMapScreen.module.css'

const PLANET_META = {
  orbita:           { emoji: '🐐', name: 'Лого-Орбіта',     subject: 'Грамота, письмо',     color: 'var(--orbita-color)', pos: 'topLeft' },
  zorx:             { emoji: '🌟', name: 'Логіка-Зоркс',    subject: 'Математика, логіка',  color: 'var(--zorx-color)',   pos: 'topRight' },
  lumi:             { emoji: '🦊', name: 'Мистецтво-Люмі',  subject: 'Творчість, казки',    color: 'var(--lumi-color)',   pos: 'bottomRight' },
  marik:            { emoji: '👽', name: 'STEM-Марік',       subject: 'Наука, хімія',        color: 'var(--marik-color)',  pos: 'bottomLeft' },
  'home-station':   { emoji: '🏠', name: 'Домашня станція', subject: 'Батьки, поради',      color: 'var(--gold)',         pos: 'midLeft' },
  'learning-center':{ emoji: '📚', name: 'Навч. центр',     subject: 'Вебінари',            color: 'var(--purple)',       pos: 'midRight' },
  cosmodrome:       { emoji: '🚀', name: 'Космодром знань', subject: 'ПДШ преміум',         color: 'var(--blue)',         pos: 'bottomCenter' },
}

export default function AdventureMapScreen() {
  const { planets, unlockedPlanets, navigate } = useAppStore()

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <h1 className={styles.title}>Карта пригод</h1>
        <Button variant="ghost" size="sm" onClick={() => navigate('home')}>← Назад</Button>
      </header>

      <div className={styles.map}>
        {planets.map((id) => {
          const meta = PLANET_META[id]
          if (!meta) return null
          const unlocked = unlockedPlanets.includes(id)
          return (
            <button
              key={id}
              className={[styles.planet, styles[meta.pos], !unlocked ? styles.locked : ''].join(' ')}
              style={{ '--planet-color': meta.color }}
              onClick={() => unlocked && navigate('course', { planet: id })}
              disabled={!unlocked}
            >
              <span className={styles.planetEmoji}>{meta.emoji}</span>
              <span className={styles.planetName}>{meta.name}</span>
              <span className={styles.planetSubject}>{meta.subject}</span>
              {!unlocked && <Badge variant="purple">Зачинено</Badge>}
            </button>
          )
        })}

        <div className={styles.hub}>
          <span>★</span>
          <span>ХАБ</span>
        </div>
      </div>
    </div>
  )
}
