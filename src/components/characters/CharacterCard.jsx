import CharacterAvatar from './CharacterAvatar'
import styles from './CharacterCard.module.css'

const CHAR_DATA = {
  lumi: {
    name: 'Лумі',
    motto: 'Кожна дитина — як маленька зірка',
    tags: ['Творчість', 'Казки', 'Арт'],
    color: 'var(--lumi-color)',
  },
  orbita: {
    name: 'Орбіта',
    motto: 'Кожна історія — це подорож до нової галактики',
    tags: ['Грамота', 'Читання', 'Мовлення'],
    color: 'var(--orbita-color)',
  },
  zorx: {
    name: 'Зоркс',
    motto: 'Кожна задача має своє правильне рішення',
    tags: ['Математика', 'Логіка', 'Числа'],
    color: 'var(--zorx-color)',
  },
  marik: {
    name: 'Марік',
    motto: 'Наука відкриває таємниці Всесвіту',
    tags: ['STEM', 'Фізика', 'Хімія'],
    color: 'var(--marik-color)',
  },
}

export default function CharacterCard({ character, selected, onSelect, index = 0 }) {
  const data = CHAR_DATA[character]
  if (!data) return null

  return (
    <button
      className={[styles.card, selected ? styles.selected : ''].join(' ')}
      style={{ '--char-color': data.color, '--i': index }}
      onClick={() => onSelect(character)}
    >
      <div className={styles.avatarWrap}>
        <CharacterAvatar character={character} size="lg" />
      </div>
      <span className={styles.name}>{data.name}</span>
      <span className={styles.motto}>{data.motto}</span>
      <div className={styles.tags}>
        {data.tags.map((tag) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
      {selected && <span className={styles.check}>✓</span>}
    </button>
  )
}
