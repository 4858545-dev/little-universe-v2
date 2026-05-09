import lumiPng   from '../../assets/characters/lumi.png'
import orbitaPng from '../../assets/characters/orbita.png'
import ailaPng   from '../../assets/characters/zorx.png'
import marikPng  from '../../assets/characters/marik.png'
import lambiPng  from '../../assets/characters/lambi.png'
import styles from './CharacterAvatar.module.css'

const CHAR_DATA = {
  lumi:   { img: lumiPng,   color: 'var(--lumi-color)',   gradient: 'var(--lumi-gradient)' },
  orbita: { img: orbitaPng, color: 'var(--orbita-color)', gradient: 'var(--orbita-gradient)' },
  aila:   { img: ailaPng,   color: 'var(--aila-color)',   gradient: 'var(--aila-gradient)' },
  marik:  { img: marikPng,  color: 'var(--marik-color)',  gradient: 'var(--marik-gradient)' },
  lambi:  { img: lambiPng,  color: 'var(--lumi-color)',   gradient: 'var(--lumi-gradient)' },
}

const SIZES = { sm: 40, md: 64, lg: 96 }

export default function CharacterAvatar({ character, size = 'md' }) {
  const data = CHAR_DATA[character]
  if (!data) return null
  const px = SIZES[size] ?? SIZES.md

  return (
    <div
      className={styles.border}
      style={{
        '--char-color': data.color,
        '--char-gradient': data.gradient,
        '--size': `${px}px`,
      }}
    >
      <div className={styles.inner}>
        <img
          src={data.img}
          alt={character}
          className={styles.img}
          draggable={false}
        />
      </div>
    </div>
  )
}
