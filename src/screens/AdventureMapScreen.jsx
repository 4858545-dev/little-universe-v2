import useAppStore from '../store/useAppStore'
import Button from '../components/ui/Button'
import StarField from '../components/map/StarField'
import OrnamentRings from '../components/map/OrnamentRings'
import ConnectorLines from '../components/map/ConnectorLines'
import PlanetNode from '../components/map/PlanetNode'
import MeteorSurprise from '../components/map/MeteorSurprise'
import styles from './AdventureMapScreen.module.css'

const PLANET_META = {
  orbita:            { emoji: '🐐', name: 'Лого-Орбіта',     subject: 'Грамота, письмо',    color: 'var(--orbita-color)', pos: 'topLeft' },
  zorx:              { emoji: '🌟', name: 'Логіка-Зоркс',    subject: 'Математика, логіка', color: 'var(--zorx-color)',   pos: 'topRight' },
  'home-station':    { emoji: '🏠', name: 'Домашня станція', subject: 'Батьки, поради',     color: 'var(--gold)',         pos: 'midLeft' },
  'learning-center': { emoji: '📚', name: 'Навч. центр',     subject: 'Вебінари',           color: 'var(--purple)',       pos: 'midRight' },
  marik:             { emoji: '👽', name: 'STEM-Марік',       subject: 'Наука, хімія',       color: 'var(--marik-color)',  pos: 'bottomLeft' },
  lumi:              { emoji: '🦊', name: 'Мистецтво-Люмі',  subject: 'Творчість, казки',   color: 'var(--lumi-color)',   pos: 'bottomRight' },
  cosmodrome:        { emoji: '🚀', name: 'Космодром знань', subject: 'ПДШ преміум',        color: 'var(--blue)',         pos: 'bottomCenter' },
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

        {/* Central hub */}
        <div className={styles.hub}>
          <span className={styles.hubStar}>★</span>
          <span className={styles.hubLabel}>ХАБ</span>
        </div>
      </div>

      <MeteorSurprise />
    </div>
  )
}
