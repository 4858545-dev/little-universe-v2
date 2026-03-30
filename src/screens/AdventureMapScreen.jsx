import { useState } from 'react'
import useAppStore from '../store/useAppStore'
import Button from '../components/ui/Button'
import StarField from '../components/map/StarField'
import OrnamentRings from '../components/map/OrnamentRings'
import ConnectorLines from '../components/map/ConnectorLines'
import PlanetNode from '../components/map/PlanetNode'
import MeteorSurprise from '../components/map/MeteorSurprise'
import { PLANET_META, PLANET_SECTIONS } from '../data/planets'
import styles from './AdventureMapScreen.module.css'

const isMobileViewport = () => typeof window !== 'undefined' && window.innerWidth <= 768

export default function AdventureMapScreen() {
  const { planets, unlockedPlanets, coins, navigate } = useAppStore()
  const [mobileSelected, setMobileSelected] = useState(null)

  const selectedMeta  = mobileSelected ? PLANET_META[mobileSelected] : null
  const selectedQuests = mobileSelected ? (PLANET_SECTIONS[mobileSelected] ?? []) : []
  const starCount = isMobileViewport() ? 120 : 280

  function closeMobileSheet() { setMobileSelected(null) }
  function handleMobileStart() {
    const id = mobileSelected
    closeMobileSheet()
    navigate('course', { planet: id })
  }

  return (
    <div className={styles.screen}>
      {/* StarField — always visible */}
      <StarField count={starCount} />

      {/* ══ DESKTOP layout ══ */}
      <div className={styles.desktopOnly}>
        <OrnamentRings />
        <ConnectorLines unlockedPlanets={unlockedPlanets} />

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

          <div className={styles.hubCell}>
            <div className={styles.hubCircle}>
              <span className={styles.hubStar}>★</span>
              <span className={styles.hubLabel}>ХАБ</span>
            </div>
          </div>
        </div>

        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Карта пригод</h1>
            <span className={styles.subtitle}>
              {unlockedPlanets.length} з {planets.length} секторів відкрито
            </span>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.coins}>🪙 {coins}</span>
            <Button variant="ghost" size="sm" onClick={() => navigate('home')}>← Назад</Button>
          </div>
        </header>
      </div>

      {/* ══ MOBILE layout ══ */}
      <div className={styles.mobileOnly}>
        {/* Compact header */}
        <header className={styles.mobileHeader}>
          <div className={styles.mobileHeaderLeft}>
            {/* Mini hub badge */}
            <div className={styles.mobileHub}>
              <span className={styles.mobileHubStar}>★</span>
            </div>
            <h1 className={styles.mobileTitle}>Карта пригод</h1>
          </div>
          <div className={styles.mobileHeaderRight}>
            <span className={styles.mobileCoins}>🪙 {coins}</span>
            <Button variant="ghost" size="sm" onClick={() => navigate('home')}>← Назад</Button>
          </div>
        </header>

        {/* 2-column planet card grid */}
        <div className={styles.planetGrid}>
          {planets.map((id) => {
            const meta = PLANET_META[id]
            if (!meta) return null
            const unlocked = unlockedPlanets.includes(id)
            return (
              <button
                key={id}
                className={[styles.planetCard, !unlocked ? styles.planetCardLocked : ''].join(' ')}
                style={{ '--planet-color': meta.color, '--planet-gradient': meta.gradient }}
                onClick={() => unlocked && setMobileSelected(id)}
                disabled={!unlocked}
                aria-label={meta.name}
              >
                <div className={styles.cardOrb}>
                  <span className={styles.cardEmoji}>
                    {unlocked ? meta.emoji : '🔒'}
                  </span>
                </div>
                <span className={styles.cardName}>{meta.name}</span>
                <span className={styles.cardStatus}>
                  {unlocked ? '✦ Відкрито' : 'Зачинено'}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ══ MOBILE bottom sheet ══ */}
      {mobileSelected && selectedMeta && (
        <>
          <div className={styles.sheetOverlay} onClick={closeMobileSheet} />
          <div
            className={styles.bottomSheet}
            style={{ '--planet-color': selectedMeta.color, '--planet-gradient': selectedMeta.gradient }}
          >
            <div className={styles.sheetHandle} />
            <div className={styles.sheetHeader}>
              <span className={styles.sheetEmoji}>{selectedMeta.emoji}</span>
              <div className={styles.sheetTitles}>
                <p className={styles.sheetTitle}>{selectedMeta.name}</p>
                <p className={styles.sheetSubject}>{selectedMeta.subject}</p>
              </div>
              <button className={styles.sheetClose} onClick={closeMobileSheet} aria-label="Закрити">✕</button>
            </div>
            <ul className={styles.sheetQuests}>
              {selectedQuests.map((q, i) => (
                <li key={i} className={styles.sheetQuest}>
                  <span className={styles.sheetDot} />
                  {q}
                </li>
              ))}
            </ul>
            <div className={styles.sheetAction}>
              <Button variant="gold" size="lg" onClick={handleMobileStart}>
                Розпочати місію
              </Button>
            </div>
          </div>
        </>
      )}

      <MeteorSurprise />
    </div>
  )
}
