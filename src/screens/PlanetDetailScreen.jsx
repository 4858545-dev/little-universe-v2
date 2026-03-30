import { useState } from 'react'
import useAppStore from '../store/useAppStore'
import CharacterAvatar from '../components/characters/CharacterAvatar'
import ResourceCard from '../components/cards/ResourceCard'
import { PLANET_META, PLANET_SECTIONS } from '../data/planets'
import styles from './PlanetDetailScreen.module.css'

// ── Mock resource data (inline — no separate file needed) ──────────────────
const MOCK_RESOURCES = {
  'logo-orbit': {
    'Артикуляційні PDF': [
      { emoji: '📄', title: 'Звук [Р] — підготовчі вправи', type: 'pdf', tier: 'free' },
      { emoji: '📄', title: 'Постановка [Ш] та [Ж]', type: 'pdf', tier: 'free' },
      { emoji: '🖨', title: 'Артикуляційна гімнастика', type: 'printable', tier: 'free' },
      { emoji: '📋', title: 'Диференціація [С–З]', type: 'assessment', tier: 'premium' },
    ],
    'Фонетичні ігри': [
      { emoji: '🎮', title: 'Гра «Хто швидший?»', type: 'printable', tier: 'free' },
      { emoji: '🃏', title: 'Картки фонетичного лото', type: 'printable', tier: 'free' },
      { emoji: '🎲', title: 'Звукова доріжка', type: 'guide', tier: 'free' },
      { emoji: '📋', title: 'Вправи з наголосом', type: 'worksheet', tier: 'premium' },
    ],
    'Конструктори історій': [
      { emoji: '📚', title: 'Картки-стартери для казок', type: 'printable', tier: 'free' },
      { emoji: '🌀', title: 'Сюжетна мозаїка', type: 'printable', tier: 'free' },
      { emoji: '🎭', title: 'Рольові ситуації', type: 'guide', tier: 'premium' },
    ],
    'Трекери прогресу': [
      { emoji: '📊', title: 'Щотижневий трекер звуків', type: 'printable', tier: 'free' },
      { emoji: '🗂', title: 'Портфоліо дитини', type: 'guide', tier: 'premium' },
      { emoji: '✅', title: 'Чек-лист корекції', type: 'assessment', tier: 'specialist' },
    ],
  },
  'logic-zorx': {
    'Робочі аркуші': [
      { emoji: '📝', title: 'Додавання до 10', type: 'worksheet', tier: 'free' },
      { emoji: '📝', title: 'Порівняння чисел', type: 'worksheet', tier: 'free' },
      { emoji: '📝', title: 'Лічба до 20', type: 'worksheet', tier: 'free' },
      { emoji: '📝', title: 'Геометричні фігури', type: 'worksheet', tier: 'premium' },
    ],
    'Відеоуроки': [
      { emoji: '🎬', title: 'Числа від 1 до 5', type: 'video', tier: 'free' },
      { emoji: '🎬', title: 'Що таке більше і менше', type: 'video', tier: 'free' },
      { emoji: '🎬', title: 'Просторова логіка', type: 'video', tier: 'premium' },
    ],
    'Інтерактивні пазли': [
      { emoji: '🧩', title: 'Числові пазли 1–10', type: 'printable', tier: 'free' },
      { emoji: '🧩', title: 'Логічні ланцюжки', type: 'printable', tier: 'free' },
      { emoji: '🧩', title: 'Матриці з фігурами', type: 'printable', tier: 'premium' },
    ],
    'Набори для оцінювання': [
      { emoji: '📋', title: 'Вхідне оцінювання — математика', type: 'assessment', tier: 'specialist' },
      { emoji: '📋', title: 'Карта навичок 4–5 р.', type: 'assessment', tier: 'specialist' },
    ],
  },
  'home-station': {
    'Ідеї для ігор': [
      { emoji: '🎯', title: 'Ігри на кухні', type: 'guide', tier: 'free' },
      { emoji: '🎨', title: 'Творчі хвилинки', type: 'guide', tier: 'free' },
      { emoji: '🌿', title: 'Природа вдома', type: 'guide', tier: 'free' },
    ],
    'Статті для батьків': [
      { emoji: '📖', title: 'Як розвивати мовлення вдома', type: 'guide', tier: 'free' },
      { emoji: '📖', title: 'Ритуали перед сном', type: 'guide', tier: 'free' },
      { emoji: '📖', title: 'Дитяча тривога: поради', type: 'guide', tier: 'premium' },
    ],
    'Швидкі активності': [
      { emoji: '⚡', title: '5-хвилинні ігри', type: 'guide', tier: 'free' },
      { emoji: '⚡', title: 'Рухавки для дому', type: 'printable', tier: 'free' },
    ],
    'Сезонні гайди': [
      { emoji: '🍂', title: 'Осінні активності', type: 'guide', tier: 'free' },
      { emoji: '❄️', title: 'Зимові традиції', type: 'guide', tier: 'free' },
      { emoji: '🌸', title: 'Весняні ігри', type: 'guide', tier: 'premium' },
    ],
  },
  'training-hub': {
    'Живі вебінари': [
      { emoji: '🎥', title: 'АВА терапія: основи', type: 'video', tier: 'specialist' },
      { emoji: '🎥', title: 'Сенсорна інтеграція', type: 'video', tier: 'specialist' },
      { emoji: '🎥', title: 'Робота з тривогою у дітей', type: 'video', tier: 'premium' },
    ],
    'Шляхи сертифікації': [
      { emoji: '📜', title: 'Сертифікат «Логопед +»', type: 'guide', tier: 'specialist' },
      { emoji: '📜', title: 'Курс «Арт-терапія»', type: 'guide', tier: 'specialist' },
    ],
    'Архів воркшопів': [
      { emoji: '📁', title: 'Воркшоп: казкотерапія', type: 'video', tier: 'premium' },
      { emoji: '📁', title: 'Воркшоп: STEM для дошкільнят', type: 'video', tier: 'premium' },
      { emoji: '📁', title: 'Воркшоп: ігрова терапія', type: 'video', tier: 'specialist' },
    ],
    'Прокачка екіпажу': [
      { emoji: '🚀', title: 'База знань спеціаліста', type: 'guide', tier: 'specialist' },
      { emoji: '🚀', title: 'Шаблони документації', type: 'pdf', tier: 'specialist' },
    ],
  },
  'stem-marik': {
    'Набори експериментів': [
      { emoji: '🔬', title: 'Дощ у склянці', type: 'guide', tier: 'free' },
      { emoji: '🔬', title: 'Вулкан із соди', type: 'guide', tier: 'free' },
      { emoji: '🔬', title: 'Рослина під мікроскопом', type: 'guide', tier: 'free' },
      { emoji: '🔬', title: 'Кристали солі', type: 'guide', tier: 'premium' },
    ],
    'Щоденники природи': [
      { emoji: '🌿', title: 'Мій щоденник природи', type: 'printable', tier: 'free' },
      { emoji: '🌿', title: 'Спостереження за птахами', type: 'printable', tier: 'free' },
      { emoji: '🌿', title: 'Осінній гербарій', type: 'guide', tier: 'free' },
    ],
    'Космічні активності': [
      { emoji: '🚀', title: 'Модель Сонячної системи', type: 'printable', tier: 'free' },
      { emoji: '🌙', title: 'Фази Місяця', type: 'printable', tier: 'free' },
      { emoji: '⭐', title: 'Карта зірок для дітей', type: 'printable', tier: 'premium' },
    ],
    'STEM-челенджі': [
      { emoji: '⚡', title: 'Міст із паперу', type: 'guide', tier: 'free' },
      { emoji: '⚡', title: 'Ракета зі скотчу', type: 'guide', tier: 'free' },
      { emoji: '⚡', title: 'Ланцюгова реакція', type: 'guide', tier: 'premium' },
    ],
  },
  'art-lumi': {
    'Арт-терапевтичні картки': [
      { emoji: '🖼', title: 'Картки емоцій (36 шт.)', type: 'printable', tier: 'free' },
      { emoji: '🖼', title: 'Проективні малюнки', type: 'printable', tier: 'premium' },
      { emoji: '🖼', title: 'Мандали для розфарбовування', type: 'printable', tier: 'free' },
    ],
    'Аркуші емоцій': [
      { emoji: '💕', title: 'Колесо емоцій', type: 'printable', tier: 'free' },
      { emoji: '💕', title: 'Де живе ця емоція?', type: 'worksheet', tier: 'free' },
      { emoji: '💕', title: 'Щоденник настрою', type: 'printable', tier: 'free' },
      { emoji: '💕', title: 'Робота зі страхами', type: 'worksheet', tier: 'premium' },
    ],
    'Посібники для батьків': [
      { emoji: '📖', title: 'Як говорити про емоції', type: 'guide', tier: 'free' },
      { emoji: '📖', title: 'Підтримка тривожної дитини', type: 'guide', tier: 'premium' },
    ],
    'Протоколи спеціалістів': [
      { emoji: '📋', title: 'Протокол первинного прийому', type: 'pdf', tier: 'specialist' },
      { emoji: '📋', title: 'Протокол арт-терапевтичної сесії', type: 'pdf', tier: 'specialist' },
      { emoji: '📋', title: 'Карта динаміки дитини', type: 'assessment', tier: 'specialist' },
    ],
  },
  cosmodrome: {
    'Курси підготовки': [
      { emoji: '🎓', title: 'Читання: від звуку до слова', type: 'video', tier: 'premium' },
      { emoji: '🎓', title: 'Математика: перший клас', type: 'video', tier: 'premium' },
      { emoji: '🎓', title: 'Розвиток пам\'яті', type: 'guide', tier: 'free' },
    ],
    'Тести оцінювання': [
      { emoji: '✅', title: 'Готовність до школи (6р.)', type: 'assessment', tier: 'premium' },
      { emoji: '✅', title: 'Рівень читання', type: 'assessment', tier: 'premium' },
      { emoji: '✅', title: 'Концентрація уваги', type: 'assessment', tier: 'specialist' },
    ],
    'Бейджі навичок': [
      { emoji: '🏆', title: 'Бейдж «Читець»', type: 'guide', tier: 'free' },
      { emoji: '🏆', title: 'Бейдж «Лічильник»', type: 'guide', tier: 'free' },
      { emoji: '🏆', title: 'Бейдж «Дослідник»', type: 'guide', tier: 'premium' },
    ],
    'Звіти для батьків': [
      { emoji: '📊', title: 'Прогрес за місяць', type: 'pdf', tier: 'premium' },
      { emoji: '📊', title: 'Рекомендації куратора', type: 'guide', tier: 'premium' },
    ],
  },
}

export default function PlanetDetailScreen() {
  const { screenParams, navigate } = useAppStore()
  const planetId = screenParams?.planet ?? 'art-lumi'
  const meta = PLANET_META[planetId]
  const sections = PLANET_SECTIONS[planetId] ?? []
  const [activeSection, setActiveSection] = useState(sections[0] ?? '')

  if (!meta) {
    return (
      <div className={styles.screen}>
        <button className={styles.backBtn} onClick={() => navigate('adventure-map')}>
          ← Карта пригод
        </button>
        <p style={{ color: 'var(--text-2)', textAlign: 'center', marginTop: '40px' }}>
          Планету не знайдено
        </p>
      </div>
    )
  }

  const resources = (MOCK_RESOURCES[planetId]?.[activeSection]) ?? []

  return (
    <div
      className={styles.screen}
      style={{ '--planet-color': meta.color, '--planet-gradient': meta.gradient }}
    >
      {/* Hero band */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <button className={styles.backBtn} onClick={() => navigate('adventure-map')}>
            ← Карта пригод
          </button>
          <div className={styles.heroBody}>
            <div className={styles.heroLeft}>
              <span className={styles.heroEmoji}>{meta.emoji}</span>
              <div>
                <h1 className={styles.heroTitle}>{meta.name}</h1>
                <p className={styles.heroCurator}>{meta.curator}</p>
                <p className={styles.heroSubject}>{meta.subject}</p>
              </div>
            </div>
            {meta.characterId && (
              <div className={styles.heroAvatar}>
                <CharacterAvatar character={meta.characterId} size="lg" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section tabs */}
      <div className={styles.tabsRow}>
        {sections.map((sec) => (
          <button
            key={sec}
            className={[styles.tab, activeSection === sec ? styles.tabActive : ''].join(' ')}
            onClick={() => setActiveSection(sec)}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Resource grid */}
      <div className={styles.grid}>
        {resources.length === 0 ? (
          <p className={styles.empty}>Ресурси незабаром з'являться</p>
        ) : (
          resources.map((r, i) => (
            <ResourceCard
              key={i}
              emoji={r.emoji}
              title={r.title}
              type={r.type}
              tier={r.tier}
            />
          ))
        )}
      </div>
    </div>
  )
}
