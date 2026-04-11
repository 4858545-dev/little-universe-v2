import { useState, useEffect } from 'react'
import useAppStore from '../store/useAppStore'
import CharacterAvatar from '../components/characters/CharacterAvatar'
import ResourceCard from '../components/cards/ResourceCard'
import { useResources } from '../hooks/useResources'
import { PLANET_META, PLANET_SECTIONS } from '../data/planets'
import styles from './PlanetDetailScreen.module.css'

// Planets backed by real Supabase data (planet_id values in resources table)
// Internal planet key → supabase planet_id
const SUPABASE_PLANETS = {
  'stem-marik': 'marik',
  'art-lumi': 'lumi',
}

// ── Mock resource data (non-Supabase planets) ──────────────────────────────
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

// Group resources by age range label
function groupByAge(resources) {
  const groups = {}
  for (const r of resources) {
    const key = `${r.age_min}–${r.age_max} років`
    if (!groups[key]) groups[key] = []
    groups[key].push(r)
  }
  return groups
}

// Polished empty state for planets without content yet
function EmptyState({ planetColor }) {
  return (
    <div className={styles.emptyCard} style={{ '--planet-color': planetColor }}>
      <div className={styles.emptyIcon} aria-hidden="true">🌌</div>
      <p className={styles.emptyText}>
        Цей сектор готується до запуску. Наша команда працює над матеріалами.
        Слідкуйте за оновленнями!
      </p>
    </div>
  )
}

// Supabase-backed planet view with age grouping
function SupabasePlanetContent({ supabasePlanetId, planetColor }) {
  const { resources, loading } = useResources(supabasePlanetId)

  if (loading) {
    return <p className={styles.loadingText}>Завантаження...</p>
  }

  if (resources.length === 0) {
    return <EmptyState planetColor={planetColor} />
  }

  // Check if age grouping is needed (multiple distinct age ranges)
  const uniqueRanges = new Set(resources.map((r) => `${r.age_min}-${r.age_max}`))
  const useGrouping = uniqueRanges.size > 1

  if (!useGrouping) {
    return (
      <div className={styles.grid}>
        {resources.map((r) => (
          <ResourceCard
            key={r.id}
            title={r.title}
            type={r.type}
            tier={r.is_free ? 'free' : 'premium'}
            description={r.description}
          />
        ))}
      </div>
    )
  }

  const groups = groupByAge(resources)
  return (
    <div className={styles.ageGroups}>
      {Object.entries(groups).map(([label, items]) => (
        <div key={label} className={styles.ageGroup}>
          <div className={styles.ageGroupLabel} style={{ '--planet-color': planetColor }}>
            {label}
          </div>
          <div className={styles.grid}>
            {items.map((r) => (
              <ResourceCard
                key={r.id}
                title={r.title}
                type={r.type}
                tier={r.is_free ? 'free' : 'premium'}
                description={r.description}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function PlanetDetailScreen() {
  const { screenParams, navigate } = useAppStore()
  const planetId = screenParams?.planet ?? 'art-lumi'
  const meta = PLANET_META[planetId]
  const sections = PLANET_SECTIONS[planetId] ?? []
  const [activeSection, setActiveSection] = useState(sections[0] ?? '')
  const [winW, setWinW] = useState(window.innerWidth)
  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (!meta) {
    return (
      <div className={styles.screen}>
        <button className={styles.backBtn} onClick={() => { window.scrollTo(0, 0); navigate('adventure-map'); }}>
          ← Карта пригод
        </button>
        <p style={{ color: 'var(--text-2)', textAlign: 'center', marginTop: '40px' }}>
          Планету не знайдено
        </p>
      </div>
    )
  }

  const supabasePlanetId = SUPABASE_PLANETS[planetId]
  const isSupabasePlanet = Boolean(supabasePlanetId)

  // For mock planets, get resources for the active tab
  const mockResources = isSupabasePlanet
    ? []
    : (MOCK_RESOURCES[planetId]?.[activeSection] ?? [])

  return (
    <div
      className={styles.screen}
      style={{ '--planet-color': meta.color, '--planet-gradient': meta.gradient }}
    >
      {/* Hero band */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <button className={styles.backBtn} onClick={() => { window.scrollTo(0, 0); navigate('adventure-map'); }}>
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

      {/* Section tabs — only for mock-data planets */}
      {!isSupabasePlanet && (
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
      )}

      {/* Content */}
      {isSupabasePlanet ? (
        <div className={styles.supabaseContent}>
          <SupabasePlanetContent
            supabasePlanetId={supabasePlanetId}
            planetColor={meta.color}
          />
        </div>
      ) : (
        <div className={styles.grid} style={planetId === 'logic-zorx' ? (
          winW >= 768
            ? { display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'stretch' }
            : { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }
        ) : undefined}>
          {mockResources.length === 0 ? (
            <div className={styles.emptyCardWrapper}>
              <EmptyState planetColor={meta.color} />
            </div>
          ) : (
            mockResources.map((r, i) => (
              <ResourceCard
                key={i}
                emoji={r.emoji}
                title={r.title}
                type={r.type}
                tier={r.tier}
                compact={planetId === 'logic-zorx'}
                style={planetId === 'logic-zorx' && winW >= 768 ? { flex: 1 } : undefined}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
