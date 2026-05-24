import { useState, useEffect } from 'react'
import useAppStore from '../store/useAppStore'
import CharacterAvatar from '../components/characters/CharacterAvatar'
import ResourceCard from '../components/cards/ResourceCard'
import { useResources } from '../hooks/useResources'
import { PLANET_META, PLANET_SECTIONS } from '../data/planets'
import marikPng  from '../assets/characters/marik.png'
import lumiPng   from '../assets/characters/lumi.png'
import orbitaPng from '../assets/characters/orbita.png'
import ailaPng   from '../assets/characters/zorx.png'
import lambiPng  from '../assets/characters/lambi.png'
import styles from './PlanetDetailScreen.module.css'

// Planets backed by real Supabase data (planet_id values in resources table)
// Internal planet key → supabase planet_id
const SUPABASE_PLANETS = {
  'stem-marik':     'stem-marik',
  'art-lumi':       'art-lumi',
  'logic-aila':     'logic-aila',
  'lambi-heritage': 'lambi-heritage',
  'about-crew':     'about-crew',
  'logo-orbit':     'logo-orbit',
  'home-station':   'home-station',
}

// Character greetings per planet
const GREETINGS = {
  'stem-marik':     { img: marikPng,  alt: 'Марік',  text: 'Привіт! Я Марік! Починаємо STEM-пригоду! 🚀' },
  'art-lumi':       { img: lumiPng,   alt: 'Люмі',   text: 'Привіт! Я Люмі! Починаємо творчу пригоду! 🎨' },
  'logo-orbit':     { img: orbitaPng, alt: 'Орбіта', text: 'Привіт! Я Орбіта! Починаємо мовну пригоду! 📖' },
  'logic-aila':     { img: ailaPng,   alt: 'Айла',   text: 'Привіт! Я Айла! Починаємо логічну пригоду! 🧩' },
  'lambi-heritage': { img: lambiPng,  alt: 'Ламбі',  text: 'Привіт! Я Ламбі! Починаємо культурну пригоду! 🧵' },
  'about-crew':     { img: lumiPng,   alt: 'Люмі',   text: 'Привіт! Ми — екіпаж Маленького Всесвіту! 👨‍🚀' },
  'home-station':   { img: lumiPng,   alt: 'Люмі',   text: 'Привіт! Тут затишно і корисно для всієї родини! 🏠' },
  'training-hub':   { img: orbitaPng, alt: 'Орбіта', text: 'Привіт! Тут зростають справжні фахівці! 🛰' },
  cosmodrome:       { img: marikPng,  alt: 'Марік',  text: 'Привіт! Готуємось до старту разом! 🚀' },
}

// ── Mock resource data (non-Supabase planets) ──────────────────────────────
const MOCK_RESOURCES = {
  'logo-orbit': {
    'Артикуляційні PDF': [
      { id: 'lo-art-1', emoji: '📄', title: 'Звук [Р] — підготовчі вправи', type: 'pdf', tier: 'free' },
      { id: 'lo-art-2', emoji: '📄', title: 'Постановка [Ш] та [Ж]', type: 'pdf', tier: 'free' },
      { id: 'lo-art-3', emoji: '🖨', title: 'Артикуляційна гімнастика', type: 'printable', tier: 'free' },
      { id: 'lo-art-4', emoji: '📋', title: 'Диференціація [С–З]', type: 'assessment', tier: 'premium' },
    ],
    'Фонетичні ігри': [
      { id: 'lo-phon-1', emoji: '🎮', title: 'Гра «Хто швидший?»', type: 'printable', tier: 'free' },
      { id: 'lo-phon-2', emoji: '🃏', title: 'Картки фонетичного лото', type: 'printable', tier: 'free' },
      { id: 'lo-phon-3', emoji: '🎲', title: 'Звукова доріжка', type: 'guide', tier: 'free' },
      { id: 'lo-phon-4', emoji: '📋', title: 'Вправи з наголосом', type: 'worksheet', tier: 'premium' },
    ],
    'Конструктори історій': [
      { id: 'lo-story-1', emoji: '📚', title: 'Картки-стартери для казок', type: 'printable', tier: 'free' },
      { id: 'lo-story-2', emoji: '🌀', title: 'Сюжетна мозаїка', type: 'printable', tier: 'free' },
      { id: 'lo-story-3', emoji: '🎭', title: 'Рольові ситуації', type: 'guide', tier: 'premium' },
    ],
    'Трекери прогресу': [
      { id: 'lo-track-1', emoji: '📊', title: 'Щотижневий трекер звуків', type: 'printable', tier: 'free' },
      { id: 'lo-track-2', emoji: '🗂', title: 'Портфоліо дитини', type: 'guide', tier: 'premium' },
      { id: 'lo-track-3', emoji: '✅', title: 'Чек-лист корекції', type: 'assessment', tier: 'specialist' },
    ],
  },
  'logic-aila': {
    'Робочі аркуші': [
      { id: 'la-work-1', emoji: '📝', title: 'Додавання до 10', type: 'worksheet', tier: 'free' },
      { id: 'la-work-2', emoji: '📝', title: 'Порівняння чисел', type: 'worksheet', tier: 'free' },
      { id: 'la-work-3', emoji: '📝', title: 'Лічба до 20', type: 'worksheet', tier: 'free' },
      { id: 'la-work-4', emoji: '📝', title: 'Геометричні фігури', type: 'worksheet', tier: 'premium' },
    ],
    'Відеоуроки': [
      { id: 'la-vid-1', emoji: '🎬', title: 'Числа від 1 до 5', type: 'video', tier: 'free' },
      { id: 'la-vid-2', emoji: '🎬', title: 'Що таке більше і менше', type: 'video', tier: 'free' },
      { id: 'la-vid-3', emoji: '🎬', title: 'Просторова логіка', type: 'video', tier: 'premium' },
    ],
    'Інтерактивні пазли': [
      { id: 'la-puzz-1', emoji: '🧩', title: 'Числові пазли 1–10', type: 'printable', tier: 'free' },
      { id: 'la-puzz-2', emoji: '🧩', title: 'Логічні ланцюжки', type: 'printable', tier: 'free' },
      { id: 'la-puzz-3', emoji: '🧩', title: 'Матриці з фігурами', type: 'printable', tier: 'premium' },
    ],
    'Набори для оцінювання': [
      { id: 'la-assess-1', emoji: '📋', title: 'Вхідне оцінювання — математика', type: 'assessment', tier: 'specialist' },
      { id: 'la-assess-2', emoji: '📋', title: 'Карта навичок 4–5 р.', type: 'assessment', tier: 'specialist' },
    ],
  },
  'home-station': {
    'Ідеї для ігор': [
      { id: 'hs-play-1', emoji: '🎯', title: 'Ігри на кухні', type: 'guide', tier: 'free' },
      { id: 'hs-play-2', emoji: '🎨', title: 'Творчі хвилинки', type: 'guide', tier: 'free' },
      { id: 'hs-play-3', emoji: '🌿', title: 'Природа вдома', type: 'guide', tier: 'free' },
    ],
    'Статті для батьків': [
      { id: 'hs-art-1', emoji: '📖', title: 'Як розвивати мовлення вдома', type: 'guide', tier: 'free' },
      { id: 'hs-art-2', emoji: '📖', title: 'Ритуали перед сном', type: 'guide', tier: 'free' },
      { id: 'hs-art-3', emoji: '📖', title: 'Дитяча тривога: поради', type: 'guide', tier: 'premium' },
    ],
    'Швидкі активності': [
      { id: 'hs-quick-1', emoji: '⚡', title: '5-хвилинні ігри', type: 'guide', tier: 'free' },
      { id: 'hs-quick-2', emoji: '⚡', title: 'Рухавки для дому', type: 'printable', tier: 'free' },
    ],
    'Сезонні гайди': [
      { id: 'hs-seas-1', emoji: '🍂', title: 'Осінні активності', type: 'guide', tier: 'free' },
      { id: 'hs-seas-2', emoji: '❄️', title: 'Зимові традиції', type: 'guide', tier: 'free' },
      { id: 'hs-seas-3', emoji: '🌸', title: 'Весняні ігри', type: 'guide', tier: 'premium' },
    ],
  },
  'training-hub': {
    'Живі вебінари': [
      { id: 'th-web-1', emoji: '🎥', title: 'АВА терапія: основи', type: 'video', tier: 'specialist' },
      { id: 'th-web-2', emoji: '🎥', title: 'Сенсорна інтеграція', type: 'video', tier: 'specialist' },
      { id: 'th-web-3', emoji: '🎥', title: 'Робота з тривогою у дітей', type: 'video', tier: 'premium' },
    ],
    'Шляхи сертифікації': [
      { id: 'th-cert-1', emoji: '📜', title: 'Сертифікат «Логопед +»', type: 'guide', tier: 'specialist' },
      { id: 'th-cert-2', emoji: '📜', title: 'Курс «Арт-терапія»', type: 'guide', tier: 'specialist' },
    ],
    'Архів воркшопів': [
      { id: 'th-arch-1', emoji: '📁', title: 'Воркшоп: казкотерапія', type: 'video', tier: 'premium' },
      { id: 'th-arch-2', emoji: '📁', title: 'Воркшоп: STEM для дошкільнят', type: 'video', tier: 'premium' },
      { id: 'th-arch-3', emoji: '📁', title: 'Воркшоп: ігрова терапія', type: 'video', tier: 'specialist' },
    ],
    'Прокачка екіпажу': [
      { id: 'th-crew-1', emoji: '🚀', title: 'База знань спеціаліста', type: 'guide', tier: 'specialist' },
      { id: 'th-crew-2', emoji: '🚀', title: 'Шаблони документації', type: 'pdf', tier: 'specialist' },
    ],
  },
  cosmodrome: {
    'Курси підготовки': [
      { id: 'cosm-course-1', emoji: '🎓', title: 'Читання: від звуку до слова', type: 'video', tier: 'premium' },
      { id: 'cosm-course-2', emoji: '🎓', title: 'Математика: перший клас', type: 'video', tier: 'premium' },
      { id: 'cosm-course-3', emoji: '🎓', title: 'Розвиток пам\'яті', type: 'guide', tier: 'free' },
    ],
    'Тести оцінювання': [
      { id: 'cosm-test-1', emoji: '✅', title: 'Готовність до школи (6р.)', type: 'assessment', tier: 'premium' },
      { id: 'cosm-test-2', emoji: '✅', title: 'Рівень читання', type: 'assessment', tier: 'premium' },
      { id: 'cosm-test-3', emoji: '✅', title: 'Концентрація уваги', type: 'assessment', tier: 'specialist' },
    ],
    'Бейджі навичок': [
      { id: 'cosm-badge-1', emoji: '🏆', title: 'Бейдж «Читець»', type: 'guide', tier: 'free' },
      { id: 'cosm-badge-2', emoji: '🏆', title: 'Бейдж «Лічильник»', type: 'guide', tier: 'free' },
      { id: 'cosm-badge-3', emoji: '🏆', title: 'Бейдж «Дослідник»', type: 'guide', tier: 'premium' },
    ],
    'Звіти для батьків': [
      { id: 'cosm-rep-1', emoji: '📊', title: 'Прогрес за місяць', type: 'pdf', tier: 'premium' },
      { id: 'cosm-rep-2', emoji: '📊', title: 'Рекомендації куратора', type: 'guide', tier: 'premium' },
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
    return (
      <div className={styles.skeletonWrapper}>
        <div className={styles.grid}>
          {[0, 1, 2].map((i) => (
            <div key={i} className={styles.skeletonCard}>
              <div className={styles.skeletonTop} />
              <div className={styles.skeletonLine} />
              <div className={styles.skeletonLineShort} />
              <div className={styles.skeletonBtn} />
            </div>
          ))}
        </div>
        <p className={styles.skeletonLabel}>Запуск двигунів...</p>
      </div>
    )
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
            id={r.id}
            title={r.title}
            type={r.type}
            tier={r.is_free ? 'free' : 'premium'}
            description={r.description}
            url={r.url}
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
                id={r.id}
                title={r.title}
                type={r.type}
                tier={r.is_free ? 'free' : 'premium'}
                description={r.description}
                url={r.url}
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
                <CharacterAvatar character={meta.characterId} size="xxl" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Breadcrumb nav */}
      <nav className={styles.breadcrumbs} aria-label="Навігація">
        <button
          className={styles.breadcrumbLink}
          onClick={() => { window.scrollTo(0, 0); navigate('adventure-map'); }}
        >
          🪐 Карта пригод
        </button>
        <span className={styles.breadcrumbSep} aria-hidden="true">›</span>
        <span className={styles.breadcrumbCurrent}>{meta.name}</span>
      </nav>

      {/* Character greeting */}
      {GREETINGS[planetId] && (
        <div className={styles.greeting}>
          <img
            src={GREETINGS[planetId].img}
            alt={GREETINGS[planetId].alt}
            className={styles.greetingImg}
            draggable={false}
          />
          <div className={styles.bubble}>
            <p className={styles.bubbleText}>{GREETINGS[planetId].text}</p>
          </div>
        </div>
      )}

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
        <div className={styles.grid} style={planetId === 'logic-aila' ? (
          winW >= 768
            ? { display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'stretch' }
            : { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }
        ) : undefined}>
          {mockResources.length === 0 ? (
            <div className={styles.emptyCardWrapper}>
              <EmptyState planetColor={meta.color} />
            </div>
          ) : (
            mockResources.map((r) => (
              <ResourceCard
                key={r.id}
                id={r.id}
                emoji={r.emoji}
                title={r.title}
                type={r.type}
                tier={r.tier}
                compact={planetId === 'logic-aila'}
                style={planetId === 'logic-aila' && winW >= 768 ? { flex: 1 } : undefined}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
