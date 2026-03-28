import styles from './ConnectorLines.module.css'

// Relative positions (% of map container) matching the 3-col 4-row CSS grid
// Columns: ~17% | ~50% | ~83%  Rows: ~12.5% | ~37.5% | ~62.5% | ~87.5%
const POSITIONS = {
  'logo-orbit':   { x: 17, y: 12.5 },
  'logic-zorx':   { x: 83, y: 12.5 },
  'home-station': { x: 17, y: 37.5 },
  'training-hub': { x: 83, y: 37.5 },
  'art-lumi':     { x: 83, y: 62.5 },
  'stem-marik':   { x: 17, y: 62.5 },
  cosmodrome:     { x: 50, y: 87.5 },
}

const HUB = { x: 50, y: 46 }

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
