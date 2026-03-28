import styles from './ConnectorLines.module.css'

// Matches PLANET_META x/y in AdventureMapScreen.jsx
const POSITIONS = {
  'logo-orbit':   { x: 18, y: 17 },
  'logic-zorx':   { x: 78, y: 17 },
  'home-station': { x: 11, y: 50 },
  'training-hub': { x: 85, y: 50 },
  'stem-marik':   { x: 20, y: 78 },
  'art-lumi':     { x: 76, y: 78 },
  cosmodrome:     { x: 50, y: 88 },
}

const HUB = { x: 50, y: 47 }

export default function ConnectorLines({ unlockedPlanets }) {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="glow-line">
          <feGaussianBlur stdDeviation="0.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {unlockedPlanets.map((id) => {
        const pos = POSITIONS[id]
        if (!pos) return null
        return (
          <line
            key={id}
            x1={HUB.x}
            y1={HUB.y}
            x2={pos.x}
            y2={pos.y}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.4"
            strokeDasharray="1.2 1.6"
            filter="url(#glow-line)"
            className={styles.line}
          />
        )
      })}
    </svg>
  )
}
