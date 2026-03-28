import useAppStore from '../store/useAppStore'
import Button from '../components/ui/Button'
import StarField from '../components/map/StarField'
import OrnamentRings from '../components/map/OrnamentRings'
import ConnectorLines from '../components/map/ConnectorLines'
import PlanetNode from '../components/map/PlanetNode'
import MeteorSurprise from '../components/map/MeteorSurprise'
import styles from './AdventureMapScreen.module.css'

// x/y = center point as % of full viewport
const PLANET_META = {
  'logo-orbit':   { emoji: '🪐', name: 'Лого-Орбіта',     subject: 'Грамота, письмо',    color: 'var(--orbita-color)', gradient: 'var(--orbita-gradient)',                     x: 18, y: 17 },
  'logic-zorx':   { emoji: '📐', name: 'Логіка-Зоркс',    subject: 'Математика, логіка', color: 'var(--zorx-color)',   gradient: 'var(--zorx-gradient)',                       x: 78, y: 17 },
  'home-station': { emoji: '🏠', name: 'Домашня Станція', subject: 'Сімейний хаб',       color: 'var(--gold)',         gradient: 'linear-gradient(135deg,#d4940a,#a06000)',    x: 11, y: 50 },
  'training-hub': { emoji: '🛰', name: 'Тренінг-Хаб',     subject: 'Академія',           color: 'var(--purple)',       gradient: 'linear-gradient(135deg,#5240d0,#2a1890)',    x: 85, y: 50 },
  'stem-marik':   { emoji: '🧪', name: 'STEM-Марік',       subject: 'Наука, хімія',       color: 'var(--marik-color)',  gradient: 'var(--marik-gradient)',                      x: 20, y: 78 },
  'art-lumi':     { emoji: '🎨', name: 'Арт-Люмі',         subject: 'Творчість, казки',   color: 'var(--lumi-color)',   gradient: 'var(--lumi-gradient)',                       x: 76, y: 78 },
  cosmodrome:     { emoji: '🚀', name: 'Космопорт Знань',  subject: 'Центр керування',    color: 'var(--blue)',         gradient: 'linear-gradient(135deg,#2060e0,#0a1890)',    x: 50, y: 88 },
}

export default function AdventureMapScreen() {
  const { planets, unlockedPlanets, coins, navigate } = useAppStore()

  return (
    <div className={styles.screen}>
      <StarField />
      <OrnamentRings />
      <ConnectorLines unlockedPlanets={unlockedPlanets} />

      {/* Planet map — full-bleed absolute container */}
      <div className={styles.map}>
        {planets.map((id) => {
          const meta = PLANET_META[id]
          if (!meta) return null
          return (
            <PlanetNode
              key={id}
              id={id}
              meta={meta}
              unlocked={unlockedPlanets.includes(id)}
            />
          )
        })}

        {/* Central hub */}
        <div className={styles.hubCell}>
          <div className={styles.hubCircle}>
            <span className={styles.hubStar}>★</span>
            <span className={styles.hubLabel}>ХАБ</span>
          </div>
        </div>
      </div>

      {/* Header — floats on top */}
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

      <MeteorSurprise />
    </div>
  )
}
