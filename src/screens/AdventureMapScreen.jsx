import useAppStore from '../store/useAppStore'
import Button from '../components/ui/Button'
import StarField from '../components/map/StarField'
import OrnamentRings from '../components/map/OrnamentRings'
import ConnectorLines from '../components/map/ConnectorLines'
import PlanetNode from '../components/map/PlanetNode'
import MeteorSurprise from '../components/map/MeteorSurprise'
import styles from './AdventureMapScreen.module.css'

const PLANET_META = {
  'logo-orbit':   { emoji: '🪐', name: 'Лого-Орбіта',     subject: 'Грамота, письмо',    color: 'var(--orbita-color)', gradient: 'var(--orbita-gradient)',                        pos: 'topLeft' },
  'logic-zorx':   { emoji: '📐', name: 'Логіка-Зоркс',    subject: 'Математика, логіка', color: 'var(--zorx-color)',   gradient: 'var(--zorx-gradient)',                          pos: 'topRight' },
  'home-station': { emoji: '🏠', name: 'Домашня Станція', subject: 'Сімейний хаб',       color: 'var(--gold)',         gradient: 'linear-gradient(135deg, #d4940a, #a06000)',    pos: 'midLeft' },
  'training-hub': { emoji: '🛰', name: 'Тренінг-Хаб',     subject: 'Академія',           color: 'var(--purple)',       gradient: 'linear-gradient(135deg, #5240d0, #2a1890)',    pos: 'midRight' },
  'stem-marik':   { emoji: '🧪', name: 'STEM-Марік',       subject: 'Наука, хімія',       color: 'var(--marik-color)',  gradient: 'var(--marik-gradient)',                         pos: 'bottomLeft' },
  'art-lumi':     { emoji: '🎨', name: 'Арт-Люмі',         subject: 'Творчість, казки',   color: 'var(--lumi-color)',   gradient: 'var(--lumi-gradient)',                          pos: 'bottomRight' },
  cosmodrome:     { emoji: '🚀', name: 'Космопорт Знань',  subject: 'Центр керування',    color: 'var(--blue)',         gradient: 'linear-gradient(135deg, #2060e0, #0a1890)',    pos: 'bottomCenter' },
}

export default function AdventureMapScreen() {
  const { planets, unlockedPlanets, coins, navigate } = useAppStore()

  return (
    <div className={styles.screen}>
      <StarField />
      <OrnamentRings />
      <ConnectorLines unlockedPlanets={unlockedPlanets} />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Карта пригод</h1>
          <span className={styles.subtitle}>
            {unlockedPlanets.length} з {planets.length} секторів відкрито
          </span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.coins}>🪙 {coins}</span>
          <Button variant="ghost" size="sm" onClick={() => navigate('home')}>
            ← Назад
          </Button>
        </div>
      </header>

      {/* Planet grid */}
      <div className={styles.map}>
        {planets.map((id) => {
          const meta = PLANET_META[id]
          if (!meta) return null
          const unlocked = unlockedPlanets.includes(id)
          return (
            <PlanetNode
              key={id}
              id={id}
              meta={meta}
              unlocked={unlocked}
              posClass={meta.pos}
            />
          )
        })}

        {/* Central hub — transparent grid cell, circle inside */}
        <div className={styles.hubCell}>
          <div className={styles.hubCircle}>
            <span className={styles.hubStar}>★</span>
            <span className={styles.hubLabel}>ХАБ</span>
          </div>
        </div>
      </div>

      <MeteorSurprise />
    </div>
  )
}
