import { useState, useEffect, useRef } from 'react'
import useAppStore from '../store/useAppStore'
import useAuthStore from '../store/useAuthStore'
import { useResources } from '../hooks/useResources'
import lumiPng   from '../assets/characters/lumi.png'
import orbitaPng from '../assets/characters/orbita.png'
import ailaPng   from '../assets/characters/zorx.png'
import marikPng  from '../assets/characters/marik.png'
import lambiPng  from '../assets/characters/lambi.png'
import styles from './AdventureMapScreen.module.css'

/* ═══════════════════════════════════════════
   МАЛЕНЬКИЙ ВСЕСВІТ — COSMIC GALAXY EDITION
   ═══════════════════════════════════════════ */

const PLANETS = [
  {
    id: 'logic-aila',
    name: 'Логіка-Айла',
    emoji: '📐',
    charImg: ailaPng,
    curator: 'Айла',
    curatorRole: 'Куратор математики та логіки',
    color1: '#00E5CC',
    color2: '#00897B',
    glow: 'rgba(0,229,204,0.5)',
    ring: 'rgba(0,229,204,0.15)',
    desc: 'Математика, логіка, просторове мислення та когнітивні головоломки',
    sections: ['Робочі аркуші', 'Відеоуроки', 'Інтерактивні пазли', 'Набори для оцінювання'],
    size: 110,
    orbitRadius: 230,
    speed: 28,
    startAngle: 30,
  },
  {
    id: 'art-lumi',
    name: 'Арт-Люмі',
    emoji: '🎨',
    charImg: lumiPng,
    curator: 'Люмі Лисичка',
    curatorRole: 'Куратор психології та арт-терапії',
    color1: '#FF7E7E',
    color2: '#D32F2F',
    glow: 'rgba(255,126,126,0.5)',
    ring: 'rgba(255,126,126,0.12)',
    desc: 'Психологія, емоційний інтелект та арт-терапія',
    sections: ['Арт-терапевтичні картки', 'Аркуші емоцій', 'Посібники для батьків', 'Протоколи спеціалістів'],
    size: 100,
    orbitRadius: 230,
    speed: 35,
    startAngle: 120,
  },
  {
    id: 'logo-orbit',
    name: 'Лого-Орбіта',
    emoji: '🪐',
    charImg: orbitaPng,
    curator: 'Орбіта Кізонька',
    curatorRole: 'Куратор логопедії та грамотності',
    color1: '#B388FF',
    color2: '#7C4DFF',
    glow: 'rgba(179,136,255,0.5)',
    ring: 'rgba(179,136,255,0.12)',
    desc: 'Логопедія, грамотність та розвиток мовлення',
    sections: ['Артикуляційні PDF', 'Фонетичні ігри', 'Конструктори історій', 'Трекери прогресу'],
    size: 120,
    orbitRadius: 310,
    speed: 44,
    startAngle: 210,
  },
  {
    id: 'stem-marik',
    name: 'STEM-Марік',
    emoji: '🧪',
    charImg: marikPng,
    curator: 'Марік Інопланетянин',
    curatorRole: 'Куратор STEM та науки',
    color1: '#64B5F6',
    color2: '#1565C0',
    glow: 'rgba(100,181,246,0.5)',
    ring: 'rgba(100,181,246,0.12)',
    desc: 'Наукові експерименти, природа та дослідження космосу',
    sections: ['Набори експериментів', 'Щоденники природи', 'Космічні активності', 'STEM-челенджі'],
    size: 95,
    orbitRadius: 380,
    speed: 52,
    startAngle: 300,
  },
  {
    id: 'lambi-heritage',
    name: 'Спадщина-Ламбі',
    emoji: '🐑',
    charImg: lambiPng,
    curator: 'Ламбі Ягня',
    curatorRole: 'Хранитель традицій та спадщини',
    color1: '#F8BBD0',
    color2: '#AD1457',
    glow: 'rgba(248,187,208,0.5)',
    ring: 'rgba(248,187,208,0.12)',
    desc: 'Українські свята, традиції, легенди та культурна спадщина',
    sections: ['Свята та обряди', 'Легенди та казки', 'Традиційні ремесла', 'Пісні та колядки'],
    size: 100,
    orbitRadius: 440,
    speed: 58,
    startAngle: 35,
  },
  {
    id: 'home-station',
    name: 'Домашня Станція',
    emoji: '🏠',
    curator: 'Сімейний Хаб',
    curatorRole: 'Для батьків та вихователів',
    color1: '#FFD54F',
    color2: '#F9A825',
    glow: 'rgba(255,213,79,0.5)',
    ring: 'rgba(255,213,79,0.12)',
    desc: 'Поради для батьків, швидкі ігри вдома та щоденні ритуали',
    sections: ['Ідеї для щоденних ігор', 'Статті для батьків', 'Швидкі активності', 'Сезонні гайди'],
    size: 90,
    orbitRadius: 510,
    speed: 66,
    startAngle: 70,
  },
  {
    id: 'knowledge-spaceport',
    name: 'Космопорт Знань',
    emoji: '🚀',
    curator: 'Центр Керування',
    curatorRole: 'Преміум підготовка до школи',
    color1: '#FF80AB',
    color2: '#C51162',
    glow: 'rgba(255,128,171,0.45)',
    ring: 'rgba(255,128,171,0.1)',
    desc: 'Преміум освітні курси для підготовки дошкільнят',
    sections: ['Курси підготовки', 'Тести оцінювання', 'Бейджі навичок', 'Звіти для батьків'],
    size: 85,
    orbitRadius: 570,
    speed: 74,
    startAngle: 170,
  },
  {
    id: 'training-hub',
    name: 'Тренінг-Хаб',
    emoji: '🛰',
    curator: 'Академія',
    curatorRole: 'Професійний розвиток',
    color1: '#B0BEC5',
    color2: '#546E7A',
    glow: 'rgba(176,190,197,0.4)',
    ring: 'rgba(176,190,197,0.1)',
    desc: 'Вебінари, воркшопи та сертифікації для спеціалістів',
    sections: ['Живі вебінари', 'Шляхи сертифікації', 'Архів воркшопів', 'Прокачка екіпажу'],
    size: 80,
    orbitRadius: 630,
    speed: 86,
    startAngle: 250,
  },
  {
    id: 'about-crew',
    name: 'Про Команду',
    emoji: '👨‍🚀',
    curator: 'Весь екіпаж',
    curatorRole: 'Паспорти персонажів',
    color1: '#FFD54F',
    color2: '#F57F17',
    glow: 'rgba(255,213,79,0.5)',
    ring: 'rgba(255,213,79,0.12)',
    desc: 'Паспорти та фото екіпажу космічного корабля',
    sections: ['Паспорти екіпажу', 'Фото команди', 'Наша місія', 'Контакти'],
    size: 85,
    orbitRadius: 380,
    speed: 54,
    startAngle: 260,
  },
]

const SURPRISES = [
  '🎲 Робочий аркуш-лабіринт — Логічний лабіринт Айли!',
  '🖍 Розмальовка — Палітра емоцій Люмі!',
  '📖 Міні-історія — Скоромовка від Орбіти!',
  '🔬 Швидкий експеримент — Лабораторія Маріка!',
  '🐑 Традиція від Ламбі — дізнайся про свято!',
  '🏡 5-хвилинна гра — Бліцактивність Домашньої Станції!',
  '⭐ Бонусний пазл — Галактична головоломка!',
]

/* ── Star field (div-based, matches reference) ── */
function StarField() {
  const [stars] = useState(() =>
    Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.08 ? Math.random() * 3 + 2 : Math.random() * 1.8 + 0.3,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 6,
      dur: Math.random() * 3 + 2,
    }))
  )
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {stars.map((s) => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.x}%`,
          top: `${s.y}%`,
          width: s.size,
          height: s.size,
          borderRadius: '50%',
          background: s.size > 3 ? '#fff' : s.size > 2 ? '#E8D5FF' : `rgba(255,255,255,${s.opacity})`,
          boxShadow: s.size > 2 ? `0 0 ${s.size * 3}px ${s.size}px rgba(200,180,255,0.3)` : 'none',
          animation: `starTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
        }} />
      ))}
    </div>
  )
}

/* ── Nebula layer ── */
function NebulaLayer() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <div style={{
        position: 'absolute',
        width: '140%',
        height: '140%',
        top: '-20%',
        left: '-20%',
        background: `
          radial-gradient(ellipse 600px 400px at 20% 30%, rgba(88,28,135,0.18) 0%, transparent 70%),
          radial-gradient(ellipse 500px 500px at 75% 20%, rgba(30,58,138,0.15) 0%, transparent 60%),
          radial-gradient(ellipse 400px 300px at 60% 75%, rgba(6,78,59,0.12) 0%, transparent 65%),
          radial-gradient(ellipse 350px 350px at 15% 80%, rgba(127,29,29,0.1) 0%, transparent 60%),
          radial-gradient(ellipse 600px 200px at 50% 50%, rgba(67,56,202,0.08) 0%, transparent 70%)
        `,
        animation: 'nebulaDrift 60s ease-in-out infinite alternate',
      }} />
    </div>
  )
}

/* ── 3D Planet orb (matches reference exactly) ── */
function PlanetOrb({ planet, hovered, onClick, onHover, onLeave, style: extraStyle, sizeOverride }) {
  const sz = sizeOverride ?? planet.size
  return (
    <div
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onTouchStart={onHover}
      onTouchEnd={() => setTimeout(onLeave, 300)}
      style={{
        width: sz,
        height: sz,
        minWidth: Math.max(sz, 44),
        minHeight: Math.max(sz, 44),
        borderRadius: '50%',
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s',
        transform: hovered ? 'scale(1.15)' : 'scale(1)',
        ...extraStyle,
      }}
    >
      {/* glow */}
      <div style={{
        position: 'absolute',
        inset: hovered ? -18 : -10,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${planet.glow} 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0.5,
        transition: 'all 0.4s',
        animation: 'planetPulse 3s ease-in-out infinite alternate',
      }} />
      {/* body — overflow:hidden + border-radius clips everything to circle */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background: `radial-gradient(circle at 35% 30%, ${planet.color1} 0%, ${planet.color2} 60%, rgba(0,0,0,0.5) 100%)`,
        boxShadow: `
          inset -${sz * 0.15}px -${sz * 0.1}px ${sz * 0.3}px rgba(0,0,0,0.5),
          inset ${sz * 0.05}px ${sz * 0.05}px ${sz * 0.2}px rgba(255,255,255,0.15),
          0 0 ${hovered ? 40 : 20}px ${planet.glow}
        `,
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* character image or emoji — centered, clipped by sphere */}
        {planet.charImg ? (
          <img
            src={planet.charImg}
            alt={planet.name}
            style={{
              height: sz * (planet.id === 'stem-marik' ? 0.80 : 0.65),
              width: sz * (planet.id === 'stem-marik' ? 0.80 : 0.65),
              objectFit: 'contain',
              objectPosition: 'center',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.7))',
              userSelect: 'none',
              pointerEvents: 'none',
              display: 'block',
              position: 'relative', zIndex: 1,
            }}
          />
        ) : (
          <span style={{
            fontSize: sz * 0.38,
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
            lineHeight: 1,
            position: 'relative', zIndex: 1,
          }}>
            {planet.emoji}
          </span>
        )}
        {/* surface highlight overlay — on top of character */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(circle at 60% 25%, rgba(255,255,255,0.10) 0%, transparent 45%),
            radial-gradient(circle at 25% 70%, rgba(0,0,0,0.15) 0%, transparent 35%)
          `,
          pointerEvents: 'none', zIndex: 2,
        }} />
        {/* atmosphere rim */}
        <div style={{
          position: 'absolute', inset: -2, borderRadius: '50%',
          border: `1.5px solid ${planet.color1}30`,
          pointerEvents: 'none', zIndex: 2,
        }} />
      </div>
      {/* ring for logo-orbit and knowledge-spaceport */}
      {(planet.id === 'logo-orbit' || planet.id === 'knowledge-spaceport') && (
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: sz * 1.6,
          height: sz * 0.35,
          marginTop: -sz * 0.175,
          marginLeft: -sz * 0.8,
          borderRadius: '50%',
          border: `2px solid ${planet.color1}30`,
          transform: 'rotateX(75deg)',
          boxShadow: `0 0 8px ${planet.color1}15`,
        }} />
      )}
    </div>
  )
}

const glassCard = (extra = {}) => ({
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
  ...extra,
})

const TYPE_EMOJI = { pdf: '📄', video: '🎬', interactive: '🧩' }
const TYPE_LABEL = { pdf: 'PDF', video: 'Відео', interactive: 'Інтерактив' }

// Burst directions for 6 star particles
const BURST_DIRS = [
  { bx: '0px',    by: '-44px' },
  { bx: '38px',   by: '-22px' },
  { bx: '38px',   by:  '22px' },
  { bx: '0px',    by:  '44px' },
  { bx: '-38px',  by:  '22px' },
  { bx: '-38px',  by: '-22px' },
]

function ResourceCard({ r, planetColor }) {
  const [claimed, setClaimed] = useState(false)
  const [bursting, setBursting] = useState(false)

  function handleDownload() {
    if (!r.url) return
    window.open(r.url, '_blank', 'noopener')
    setClaimed(true)
    setBursting(true)
    setTimeout(() => setBursting(false), 1500)
    setTimeout(() => setClaimed(false), 2000)
  }

  return (
    <div style={{
      ...glassCard(),
      padding: '20px 18px 18px',
      display: 'flex', flexDirection: 'column', gap: 10,
      position: 'relative', overflow: 'visible',
      borderLeft: `4px solid ${planetColor}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>📄</span>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.4 }}>{r.title}</div>
        </div>
        <span style={{
          fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 6, flexShrink: 0,
          ...(r.is_free
            ? {
                background: 'rgba(244,185,66,0.12)',
                border: '1px solid rgba(244,185,66,0.4)',
                color: '#f4b942',
                boxShadow: '0 0 8px rgba(244,185,66,0.15)',
              }
            : {
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.4)',
              }),
        }}>{r.is_free ? 'Безкоштовно' : 'Преміум'}</span>
      </div>
      {r.description && (
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.55 }}>{r.description}</div>
      )}
      <div style={{ position: 'relative', marginTop: 'auto' }}>
        <button
          onClick={handleDownload}
          style={{
            width: '100%', padding: '7px 0', borderRadius: 10,
            background: claimed ? 'rgba(244,185,66,0.12)' : `${planetColor}12`,
            border: `1px solid ${claimed ? 'rgba(244,185,66,0.35)' : planetColor + '25'}`,
            fontSize: 11, fontWeight: 800,
            color: claimed ? '#f4b942' : planetColor,
            cursor: r.url ? 'pointer' : 'default', fontFamily: 'inherit',
            transition: 'color 0.25s, background 0.25s, border-color 0.25s',
          }}
        >{claimed ? '✓ Місію виконано!' : '⬇ Взяти на борт'}</button>
        {/* Star burst particles */}
        {bursting && BURST_DIRS.map((d, i) => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 14, height: 14,
            fontSize: 12, lineHeight: '14px', textAlign: 'center',
            pointerEvents: 'none', zIndex: 50,
            '--bx': d.bx, '--by': d.by,
            animation: `starBurst 1.2s ease-out ${i * 0.05}s both`,
          }}>⭐</div>
        ))}
      </div>
    </div>
  )
}

const PLANET_GREETINGS = {
  'stem-marik':     'Привіт! Я Марік! Починаємо STEM-пригоду! 🚀',
  'art-lumi':       'Привіт! Я Люмі! Починаємо творчу пригоду! 🎨',
  'logo-orbit':     'Привіт! Я Орбіта! Починаємо мовну пригоду! 📖',
  'logic-aila':     'Привіт! Я Айла! Починаємо логічну пригоду! 🧩',
  'lambi-heritage': 'Привіт! Я Ламбі! Починаємо культурну пригоду! 🧵',
  'about-crew':     'Привіт! Ми — екіпаж Маленького Всесвіту! 👨‍🚀',
  'home-station':   'Привіт! Тут затишно і корисно для всієї родини! 🏠',
  'training-hub':   'Привіт! Тут зростають справжні фахівці! 🛰',
  cosmodrome:       'Привіт! Готуємось до старту разом! 🚀',
}

function PlanetDetailView({ p, isMobile, backToLanding }) {
  const { resources, loading } = useResources(p.id)
  const greeting = PLANET_GREETINGS[p.id]

  return (
    <>
      <div style={{
        textAlign: 'center', padding: '40px 24px 32px',
        position: 'relative', zIndex: 1,
        background: `radial-gradient(ellipse 500px 300px at 50% 80%, ${p.glow.replace('0.5', '0.08').replace('0.45', '0.08').replace('0.4', '0.08')} 0%, transparent 70%)`,
        animation: 'fadeSlideUp 0.5s ease-out',
      }}>
        <button onClick={backToLanding} style={{
          position: 'absolute', top: 16, left: 20,
          padding: '6px 14px', borderRadius: 12,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
          fontWeight: 700, fontSize: 12, fontFamily: 'inherit',
          minHeight: 44, display: 'flex', alignItems: 'center',
        }}>← Назад</button>

        <PlanetOrb
          planet={{ ...p, size: 100 }}
          hovered={true}
          onClick={() => {}}
          onHover={() => {}}
          onLeave={() => {}}
          style={{ margin: '0 auto 16px', position: 'relative' }}
        />

        <h2 style={{
          fontSize: 32, fontWeight: 900, marginBottom: 4,
          fontFamily: "'Comfortaa', sans-serif",
          background: `linear-gradient(135deg, ${p.color1} 0%, ${p.color2} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: `drop-shadow(0 0 12px ${p.glow.replace('0.5','0.25').replace('0.45','0.25').replace('0.4','0.25')})`,
        }}>Планета {p.name}</h2>
        <div style={{ fontSize: 16, fontWeight: 400, color: 'rgba(155,168,204,0.9)', marginBottom: 4 }}>
          {p.curator} — {p.curatorRole}
        </div>
        <p style={{ fontSize: 15, color: 'rgba(93,106,138,0.95)', marginTop: 8, maxWidth: 600, margin: '8px auto 0', lineHeight: 1.6 }}>
          {p.desc}
        </p>
      </div>

      {/* Breadcrumb */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '10px 24px', position: 'relative', zIndex: 1,
        maxWidth: 900, margin: '0 auto', width: '100%',
      }}>
        <button onClick={backToLanding} style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          fontFamily: 'inherit', fontSize: 13, color: 'rgba(232,224,240,0.5)',
          transition: 'color 0.2s',
        }}>🪐 Карта пригод</button>
        <span style={{ fontSize: 14, color: 'rgba(232,224,240,0.25)', lineHeight: 1 }}>›</span>
        <span style={{ fontSize: 13, color: p.color1, fontFamily: 'inherit', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {p.name}
        </span>
      </div>

      {/* Character greeting */}
      {greeting && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          padding: isMobile ? '16px 16px' : '20px 24px',
          maxWidth: 900, margin: '0 auto', width: '100%',
          position: 'relative', zIndex: 1, boxSizing: 'border-box',
        }}>
          <img src={p.charImg} alt={p.curator} draggable={false} style={{
            width: isMobile ? 88 : 120, height: isMobile ? 88 : 120,
            objectFit: 'contain', flexShrink: 0,
            filter: `drop-shadow(0 4px 16px ${p.glow.replace('0.5','0.6').replace('0.45','0.6').replace('0.4','0.6')})`,
            animation: 'floatMeteorite 4s ease-in-out infinite',
          }} />
          <div style={{
            position: 'relative',
            background: 'rgba(10,18,40,0.65)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: `1px solid ${p.color1}40`,
            borderRadius: 16, padding: '14px 18px',
            boxShadow: `0 0 24px ${p.glow.replace('0.5','0.12').replace('0.45','0.12').replace('0.4','0.12')}`,
            flex: 1,
          }}>
            {/* Triangle pointer */}
            <div style={{
              position: 'absolute', left: -10, top: '50%', transform: 'translateY(-50%)',
              width: 0, height: 0,
              borderTop: '10px solid transparent', borderBottom: '10px solid transparent',
              borderRight: `10px solid ${p.color1}40`,
            }} />
            <div style={{
              position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)',
              width: 0, height: 0,
              borderTop: '9px solid transparent', borderBottom: '9px solid transparent',
              borderRight: '9px solid rgba(10,18,40,0.65)',
            }} />
            <p style={{
              fontFamily: "'Nunito', sans-serif", fontSize: isMobile ? 13 : 15,
              fontWeight: 700, color: '#e8edf8', margin: 0, lineHeight: 1.55,
            }}>{greeting}</p>
          </div>
        </div>
      )}

      <div style={{ margin: '24px 0', padding: '0 24px 60px', position: 'relative', zIndex: 1 }}>
        {/* Section label with accent line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 3, height: 18, borderRadius: 2, background: p.color1, flexShrink: 0 }} />
          <div style={{
            fontWeight: 800, fontSize: 11, color: 'rgba(179,136,255,0.6)',
            textTransform: 'uppercase', letterSpacing: 2,
          }}>Розділи контенту</div>
        </div>

        <div style={
          !isMobile
            ? { display: 'flex', flexDirection: 'row', gap: 12 }
            : { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }
        }>
          {p.sections.map((s, i) => (
            <div key={s} style={{
              ...glassCard(),
              padding: '12px 14px',
              display: 'flex',
              flexDirection: isMobile ? 'row' : 'column',
              alignItems: isMobile ? 'center' : 'flex-start',
              gap: 10,
              flex: isMobile ? undefined : 1,
              opacity: 0.6,
              animation: `fadeSlideUp 0.5s ease-out ${i * 0.1}s both`,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: `linear-gradient(135deg, ${p.color1}20, ${p.color2}30)`,
                border: `1px solid ${p.color1}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 900, color: p.color1,
                flexShrink: 0,
              }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>{s}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>
                  PDF · відео · інтерактив
                </div>
              </div>
              {/* Coming soon badge */}
              <div style={{
                fontSize: isMobile ? 7 : 9,
                fontWeight: 800, letterSpacing: isMobile ? 0.5 : 1,
                textTransform: 'uppercase',
                padding: isMobile ? '2px 5px' : '2px 7px', borderRadius: 5,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.3)',
                flexShrink: 0,
                alignSelf: isMobile ? 'center' : 'flex-start',
                whiteSpace: 'nowrap',
              }}>{isMobile ? 'Скоро' : 'Незабаром'}</div>
            </div>
          ))}
        </div>

        {/* ── Real resources from Supabase ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 32, marginBottom: 16 }}>
          <div style={{ width: 3, height: 18, borderRadius: 2, background: p.color1, flexShrink: 0 }} />
          <div style={{
            fontWeight: 800, fontSize: 11, color: 'rgba(179,136,255,0.6)',
            textTransform: 'uppercase', letterSpacing: 2,
          }}>Ресурси</div>
        </div>

        {loading ? (
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, fontWeight: 600, padding: '20px 0' }}>
            Завантаження...
          </div>
        ) : resources.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {resources.map((r, i) => (
              <div key={r.id} style={{ animation: `fadeSlideUp 0.5s ease-out ${i * 0.08}s both` }}>
                <ResourceCard r={r} planetColor={p.color1} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            ...glassCard(), padding: '32px 28px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>🚀</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
              Контент вже в розробці
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, maxWidth: 380, margin: '0 auto' }}>
              Контент для цієї планети вже в розробці. Незабаром тут з'являться нові місії!
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default function AdventureMapScreen() {
  const { coins, showToast, navigate, unlockedPlanets } = useAppStore()
  const { logout } = useAuthStore()
  const UNLOCKED = new Set(unlockedPlanets)
  const [view, setView] = useState('landing')
  const [activePlanet, setActivePlanet] = useState(null)
  const [meteorite, setMeteorite] = useState(null)
  const [hoveredPlanet, setHoveredPlanet] = useState(null)
  const [time, setTime] = useState(0)
  const [meteoritePos, setMeteoritePos] = useState({ x: 85, y: 15 })
  const [winSize, setWinSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  const frameRef = useRef(null)
  const hasAnimated = useRef(false)
  const scrollRef = useRef(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    const onResize = () => setWinSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Mark entry animation as done after it plays — no re-trigger on nav back
  useEffect(() => {
    const t = setTimeout(() => { hasAnimated.current = true }, 2200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    let t = 0
    const tick = () => {
      t += 0.003
      setTime(t)
      setMapReady(true)
      setMeteoritePos({
        x: 83 + Math.sin(t * 1.1) * 5,
        y: 13 + Math.cos(t * 0.8) * 4 + Math.sin(t * 2) * 1.5,
      })
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  function triggerMeteorite() {
    const pick = SURPRISES[Math.floor(Math.random() * SURPRISES.length)]
    setMeteorite(pick)
  }

  function claimMeteorite() {
    showToast({ message: `🎁 ${meteorite}`, type: 'reward' })
    setMeteorite(null)
  }

  const isMobile = winSize.w <= 768
  const isSmallMobile = winSize.w <= 480
  const NAV_H = 0
  const HERO_H = isMobile ? 90 : 140  // approximate hero section height (no navbar)
  const MAX_ORBIT = 900
  const orbitScale = isMobile
    ? Math.max(0.28, Math.min(winSize.w, winSize.h - NAV_H - HERO_H) / MAX_ORBIT)
    : Math.max(0.38, (winSize.w * 0.45) / MAX_ORBIT)
  const planetScale = isMobile ? 0.7 : 1.0
  const SUN_TOP = '50%'   // dead center of the orbital container (hero is now above it)

  function scrollTop() {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
    window.scrollTo(0, 0)
  }

  function openPlanet(p) {
    scrollTop()
    setActivePlanet(p)
    setView('planet')
  }

  function backToLanding() {
    scrollTop()
    setView('landing')
    setActivePlanet(null)
  }

  if (!mapReady) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(145deg, #05050F 0%, #0A0A1A 30%, #0D0B1E 60%, #080818 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 16, fontFamily: "'Nunito', sans-serif",
      }}>
        <style>{`
          @keyframes rocketPulse {
            0%, 100% { transform: scale(1) translateY(0); opacity: 0.7; }
            50%       { transform: scale(1.15) translateY(-6px); opacity: 1; }
          }
        `}</style>
        <div style={{ fontSize: 52, animation: 'rocketPulse 1.4s ease-in-out infinite' }}>🚀</div>
        <div style={{
          fontSize: 14, fontWeight: 600, letterSpacing: 1.5,
          color: 'rgba(232,224,240,0.4)', textTransform: 'uppercase',
        }}>Запуск двигунів...</div>
      </div>
    )
  }

  return (
    <div ref={scrollRef} style={{
      fontFamily: "'Nunito', 'Comfortaa', sans-serif",
      background: 'linear-gradient(145deg, #05050F 0%, #0A0A1A 30%, #0D0B1E 60%, #080818 100%)',
      minHeight: '100vh',
      color: '#E8E0F0',
      position: 'relative',
      overflowX: 'hidden',
      overflowY: 'auto',
    }}>
      {/* Keyframes injected once */}
      <style>{`
        @keyframes starTwinkle {
          0%   { opacity: 0.15; transform: scale(0.7); }
          100% { opacity: 1;    transform: scale(1.3); }
        }
        @keyframes planetPulse {
          0%   { transform: scale(1);    opacity: 0.5; }
          100% { transform: scale(1.08); opacity: 0.8; }
        }
        @keyframes nebulaDrift {
          0%   { transform: translate(0,0)     rotate(0deg); }
          100% { transform: translate(30px,-20px) rotate(3deg); }
        }
        @keyframes floatMeteorite {
          0%,100% { transform: translateY(0)    rotate(-8deg); }
          50%     { transform: translateY(-10px) rotate(8deg); }
        }
        @keyframes popCosmic {
          0%   { transform: translate(-50%,-50%) scale(0.3); opacity: 0; }
          60%  { transform: translate(-50%,-50%) scale(1.05); }
          100% { transform: translate(-50%,-50%) scale(1);   opacity: 1; }
        }
        @keyframes glowLine {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0);    }
        }
        @keyframes sunRaysRotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes sunCorePulse {
          0%, 100% { transform: scale(1.0); }
          50%      { transform: scale(1.05); }
        }
        @keyframes startPulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.06); }
        }
        @keyframes sunReveal {
          0%   { opacity: 0; transform: translate(-50%,-50%) scale(0.4); filter: blur(8px); }
          60%  { transform: translate(-50%,-50%) scale(1.08); filter: blur(0); }
          100% { opacity: 1; transform: translate(-50%,-50%) scale(1); filter: blur(0); }
        }
        @keyframes planetReveal {
          0%   { opacity: 0; transform: translateY(12px) scale(0.7); }
          100% { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes starBurst {
          0%   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
          100% { opacity: 0; transform: translate(
                  calc(-50% + var(--bx)),
                  calc(-50% + var(--by))
                ) scale(0.3); }
        }
        @keyframes sparkleOrbit {
          0%   { transform: rotate(var(--sa)) translateX(var(--sr)) scale(1);   opacity: 0.9; }
          50%  { opacity: 1; }
          100% { transform: rotate(calc(var(--sa) + 360deg)) translateX(var(--sr)) scale(1); opacity: 0.9; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(179,136,255,0.3); border-radius: 10px; }
        ::-webkit-scrollbar-track { background: transparent; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <StarField />
      <NebulaLayer />

      {/* ─── FLOATING HUD — coins + meteor button, top-right ─── */}
      {view === 'landing' && (
        <div style={{
          position: 'fixed', top: 12, right: 12, zIndex: 100,
          display: 'flex', gap: 8, alignItems: 'center',
        }}>
          {/* BETA badge */}
          <span style={{
            padding: isSmallMobile ? '4px 8px' : '5px 12px', borderRadius: 24,
            background: 'rgba(244,185,66,0.12)',
            border: '1.5px solid rgba(244,185,66,0.35)',
            color: '#f4b942', fontWeight: 800,
            fontSize: isSmallMobile ? 9 : 10,
            letterSpacing: '1.5px', textTransform: 'uppercase',
          }}>BETA 🚀</span>
          <span style={{
            padding: isSmallMobile ? '5px 10px' : '7px 14px', borderRadius: 24,
            background: 'rgba(255,213,79,0.1)',
            border: '1.5px solid rgba(255,213,79,0.25)',
            color: '#FFD54F', fontWeight: 800, fontSize: isSmallMobile ? 11 : 13,
          }}>🪙 {coins}</span>
          {!isSmallMobile && (
            <button onClick={triggerMeteorite} style={{
              padding: '7px 18px', borderRadius: 24, fontFamily: 'inherit',
              background: 'linear-gradient(135deg, rgba(255,152,0,0.25), rgba(255,87,34,0.2))',
              border: '1.5px solid rgba(255,152,0,0.35)',
              color: '#FFB74D', cursor: 'pointer', fontWeight: 700, fontSize: 13,
              transition: 'all 0.3s',
            }}>☄️ Метеорит</button>
          )}
          <button onClick={() => navigate('about')} style={{
            padding: isSmallMobile ? '5px 10px' : '7px 14px', borderRadius: 24, fontFamily: 'inherit',
            background: 'rgba(100,255,218,0.08)',
            border: '1.5px solid rgba(100,255,218,0.2)',
            color: '#64FFDA', cursor: 'pointer', fontWeight: 700, fontSize: isSmallMobile ? 11 : 13,
            transition: 'all 0.3s',
          }}>{isSmallMobile ? '👥' : '👥 Про команду'}</button>
          <button onClick={logout} title="Вийти" style={{
            padding: isSmallMobile ? '5px 8px' : '7px 12px', borderRadius: 24, fontFamily: 'inherit',
            background: 'rgba(255,255,255,0.04)',
            border: '1.5px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontWeight: 700,
            fontSize: isSmallMobile ? 12 : 14,
            transition: 'all 0.3s', lineHeight: 1,
          }}>⏏</button>
        </div>
      )}

      {/* ─── FLOATING METEORITE ─── */}
      {view === 'landing' && !isSmallMobile && (
        <div onClick={triggerMeteorite} style={{
          position: 'fixed', zIndex: 90, cursor: 'pointer',
          left: `${meteoritePos.x}%`, top: `${meteoritePos.y}%`,
          filter: 'drop-shadow(0 0 20px rgba(255,152,0,0.6))',
          userSelect: 'none', transition: 'left 0.5s, top 0.5s',
        }}>
          <div style={{ fontSize: 36, animation: 'floatMeteorite 3s ease-in-out infinite' }}>☄️</div>
        </div>
      )}

      {/* ─── METEORITE POPUP ─── */}
      {meteorite && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
        }} onClick={() => setMeteorite(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{
            ...glassCard(),
            background: 'linear-gradient(145deg, rgba(30,20,50,0.95), rgba(20,15,40,0.95))',
            border: '1.5px solid rgba(255,152,0,0.3)',
            padding: '36px 44px', maxWidth: 400, textAlign: 'center',
            animation: 'popCosmic 0.5s cubic-bezier(0.34,1.56,0.64,1)',
            boxShadow: '0 0 60px rgba(255,152,0,0.15), 0 20px 60px rgba(0,0,0,0.5)',
            position: 'absolute', top: '50%', left: '50%',
          }}>
            <div style={{ fontSize: 52, marginBottom: 14, animation: 'floatMeteorite 2s ease-in-out infinite' }}>☄️</div>
            <div style={{
              fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase',
              background: 'linear-gradient(90deg, #FF9800, #FFD54F, #FF9800)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              animation: 'glowLine 3s linear infinite', marginBottom: 12,
            }}>Метеоритний сюрприз!</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#F0E6FF', lineHeight: 1.5 }}>{meteorite}</div>
            <button onClick={claimMeteorite} style={{
              marginTop: 20, padding: '10px 28px', borderRadius: 24,
              background: 'linear-gradient(135deg, #FF9800, #F57C00)',
              border: 'none', color: '#fff', fontWeight: 800, fontSize: 13,
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 4px 20px rgba(255,152,0,0.3)',
            }}>⬇ Взяти на борт</button>
          </div>
        </div>
      )}

      {/* ═══════════════════════
         LANDING — SOLAR SYSTEM
         ═══════════════════════ */}
      {view === 'landing' && (
        <>
          {/* ─── HERO — normal flow, above orbital ─── */}
          <div style={{
            textAlign: 'center',
            padding: isMobile ? '70px 16px 8px' : '40px 20px 24px',
            position: 'relative', zIndex: 1,
            animation: 'fadeSlideUp 0.8s ease-out',
          }}>
            <div style={{
              display: 'inline-block', padding: '4px 18px', borderRadius: 24,
              border: '1px solid rgba(179,136,255,0.25)',
              background: 'rgba(179,136,255,0.08)',
              fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase',
              color: '#B388FF', marginBottom: 12,
            }}>✦ Освітній Командний Центр ✦</div>
            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 54px)', fontWeight: 900, lineHeight: 1.05,
              fontFamily: "'Comfortaa', sans-serif", marginBottom: 8,
              background: 'linear-gradient(135deg, #E8D5FF 0%, #64FFDA 40%, #FFD54F 70%, #FF80AB 100%)',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              animation: 'glowLine 8s linear infinite',
            }}>Маленький Всесвіт</h1>
            <p style={{
              fontSize: 'clamp(12px, 1.4vw, 15px)', color: 'rgba(232,224,240,0.5)',
              maxWidth: 480, margin: '0 auto', lineHeight: 1.6, fontWeight: 600,
            }}>Освітній хаб для спеціалістів та батьків</p>
          </div>

          {/* ─── ORBITAL — fills viewport height, starts after hero ─── */}
          <div style={{
            position: 'relative', width: '100%',
            height: 'calc(100vh - 54px)',
            overflow: 'hidden', zIndex: 1,
          }}>
            {/* Orbit rings — centered at SUN_TOP */}
            {PLANETS.map((p) => {
              const rPx = p.orbitRadius * orbitScale
              return (
                <div key={`orbit-${p.id}`} style={{
                  position: 'absolute',
                  top: SUN_TOP, left: '50%',
                  width: rPx * 2,
                  height: rPx * 2,
                  marginTop: -rPx,
                  marginLeft: -rPx,
                  borderRadius: '50%',
                  border: `1px solid ${p.ring}`,
                  pointerEvents: 'none',
                }} />
              )
            })}

            {/* Planets — positioned from SUN_TOP center */}
            {PLANETS.map((p) => {
              const isLocked = !UNLOCKED.has(p.id)
              const scaledSize = p.size * planetScale
              const angle = p.startAngle + (time * 360) / p.speed
              const rad = (angle * Math.PI) / 180
              const r = p.orbitRadius * orbitScale
              const x = Math.cos(rad) * r
              const y = Math.sin(rad) * r * 0.55 // perspective squish
              const pIdx = PLANETS.indexOf(p)
              return (
                <div key={p.id} style={{
                  position: 'absolute',
                  top: SUN_TOP, left: '50%',
                  marginLeft: x - scaledSize / 2,
                  marginTop: y - scaledSize / 2,
                  zIndex: Math.round(y + 500),
                  transition: 'margin 0.05s linear',
                  opacity: isLocked ? 0.45 : 1,
                  animation: hasAnimated.current
                    ? 'none'
                    : `planetReveal 0.5s ease-out ${0.4 + pIdx * 0.12}s both`,
                }}>
                  <PlanetOrb
                    planet={p}
                    hovered={hoveredPlanet === p.id}
                    onClick={() => isLocked
                      ? showToast({ message: 'Цей сектор готується до запуску 🚀', type: 'info' })
                      : openPlanet(p)
                    }
                    onHover={() => setHoveredPlanet(p.id)}
                    onLeave={() => setHoveredPlanet(null)}
                    sizeOverride={scaledSize}
                  />
                  {/* Lock icon overlay */}
                  {isLocked && (
                    <div style={{
                      position: 'absolute', top: '18%', left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: isMobile ? 14 : 18,
                      pointerEvents: 'none', zIndex: 10,
                      filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.8))',
                    }}>🔒</div>
                  )}
                  {/* Hover sparkle particles — unlocked planets only */}
                  {!isLocked && hoveredPlanet === p.id && (
                    <>
                      {[
                        { sa: '0deg',   sr: `${scaledSize * 0.72}px`, delay: '0s' },
                        { sa: '90deg',  sr: `${scaledSize * 0.72}px`, delay: '0.18s' },
                        { sa: '180deg', sr: `${scaledSize * 0.72}px`, delay: '0.36s' },
                        { sa: '270deg', sr: `${scaledSize * 0.72}px`, delay: '0.54s' },
                      ].map((sp, si) => (
                        <div key={si} style={{
                          position: 'absolute',
                          top: '50%', left: '50%',
                          width: 6, height: 6,
                          borderRadius: '50%',
                          background: p.color1,
                          boxShadow: `0 0 6px ${p.glow}`,
                          pointerEvents: 'none',
                          transformOrigin: '0 0',
                          '--sa': sp.sa,
                          '--sr': sp.sr,
                          animation: `sparkleOrbit 1.4s linear ${sp.delay} infinite`,
                          zIndex: 20,
                        }} />
                      ))}
                    </>
                  )}
                  {/* label */}
                  <div style={{
                    position: 'absolute', top: '100%', left: '50%',
                    transform: 'translateX(-50%)', marginTop: 6, whiteSpace: 'nowrap',
                    textAlign: 'center', pointerEvents: 'none',
                    opacity: hoveredPlanet === p.id ? 1 : 0.6,
                    transition: 'opacity 0.3s',
                  }}>
                    <div style={{
                      fontSize: isMobile ? 9 : 12, fontWeight: 800, color: p.color1,
                      textShadow: `0 0 12px ${p.glow}`,
                    }}>{p.name}</div>
                    {!isMobile && <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
                      {p.curator}
                    </div>}
                    {/* ПОЧНИ ТУТ badge — stem-marik only */}
                    {p.id === 'stem-marik' && (
                      <div style={{
                        marginTop: 4, display: 'inline-block',
                        padding: isMobile ? '2px 6px' : '3px 8px',
                        borderRadius: 20,
                        background: 'rgba(244,185,66,0.15)',
                        border: '1.5px solid rgba(244,185,66,0.5)',
                        color: '#f4b942', fontWeight: 800,
                        fontSize: isMobile ? 7 : 9,
                        letterSpacing: '0.8px', textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        animation: 'startPulse 2s ease-in-out infinite',
                        pointerEvents: 'none',
                      }}>ПОЧНИ ТУТ ★</div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Sun — rendered AFTER planets so it sits on top in DOM order */}
            {(() => {
              const sunSz = isMobile ? 58 : 84
              return (
                <div
                  onClick={() => navigate('home-station')}
                  style={{
                    position: 'absolute', top: SUN_TOP, left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000, cursor: 'pointer',
                    width: sunSz, height: sunSz,
                    animation: hasAnimated.current ? 'none' : 'sunReveal 0.7s cubic-bezier(0.34,1.56,0.64,1) both',
                  }}
                >
                  {/* Rotating rays — centered on sun core */}
                  <div style={{
                    position: 'absolute',
                    top: sunSz / 2, left: sunSz / 2,
                    width: 0, height: 0,
                    animation: 'sunRaysRotate 20s linear infinite',
                    pointerEvents: 'none',
                  }}>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} style={{
                        position: 'absolute',
                        width: sunSz * 0.35,
                        height: sunSz * 0.85,
                        left: -(sunSz * 0.175),
                        top: -(sunSz * 0.5 + sunSz * 0.85),
                        transformOrigin: `50% ${sunSz * 0.85 + sunSz * 0.5}px`,
                        transform: `rotate(${i * 45}deg)`,
                        background: 'radial-gradient(ellipse 50% 100% at 50% 100%, rgba(255,213,79,0.55) 0%, rgba(255,152,0,0.15) 55%, transparent 100%)',
                        borderRadius: '50% 50% 20% 20%',
                        filter: 'blur(3px)',
                      }} />
                    ))}
                  </div>

                  {/* Outer glow halo */}
                  <div style={{
                    position: 'absolute',
                    top: -(sunSz * 0.35), left: -(sunSz * 0.35),
                    width: sunSz * 1.7, height: sunSz * 1.7,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,213,79,0.20) 0%, transparent 70%)',
                    animation: 'planetPulse 4s ease-in-out infinite alternate',
                    pointerEvents: 'none',
                  }} />

                  {/* Sun core — clean golden sphere */}
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    background: 'radial-gradient(circle at 38% 32%, rgba(255,245,120,0.95) 0%, rgba(255,213,79,0.88) 30%, rgba(255,152,0,0.75) 60%, rgba(200,80,0,0.45) 85%, transparent 100%)',
                    boxShadow: '0 0 30px rgba(255,213,79,0.4), 0 0 60px rgba(255,152,0,0.18), inset -4px -4px 10px rgba(0,0,0,0.2), inset 3px 3px 8px rgba(255,255,200,0.15)',
                    animation: 'sunCorePulse 3s ease-in-out infinite',
                  }} />

                  {/* Label below sun */}
                  <div style={{
                    position: 'absolute', top: '100%', left: '50%',
                    transform: 'translateX(-50%)', marginTop: 8, whiteSpace: 'nowrap',
                    textAlign: 'center', pointerEvents: 'none',
                  }}>
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
                      Центр Всесвіту
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>

          {/* ─── PLANET CARDS GRID ─── */}
          <div
            onClick={() => document.getElementById('planet-cards')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              textAlign: 'center', marginBottom: 20, marginTop: isMobile ? 16 : 0, position: 'relative', zIndex: 1,
              cursor: 'pointer',
            }}
          >
            <span style={{
              fontSize: 12, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase',
              color: 'rgba(179,136,255,0.5)',
            }}>✦ Обери свою планету ✦</span>
          </div>

          <div id="planet-cards" style={{
            display: 'grid',
            gridTemplateColumns: winSize.w <= 640 ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 12, padding: winSize.w <= 640 ? '0 12px 40px' : '0 24px 40px',
            position: 'relative', zIndex: 1,
          }}>
            {PLANETS.map((p, idx) => {
              const isLocked = !UNLOCKED.has(p.id)
              const isHov = hoveredPlanet === p.id
              return (
                <div
                  key={p.id}
                  onClick={() => isLocked
                    ? showToast({ message: 'Цей сектор готується до запуску 🚀', type: 'info' })
                    : openPlanet(p)
                  }
                  onMouseEnter={() => setHoveredPlanet(p.id)}
                  onMouseLeave={() => setHoveredPlanet(null)}
                  style={{
                    ...glassCard(),
                    padding: winSize.w <= 640 ? '16px 16px' : '22px 24px',
                    cursor: isLocked ? 'default' : 'pointer',
                    opacity: isLocked ? 0.55 : 1,
                    border: `1px solid ${isHov && !isLocked ? p.color1 + '50' : 'rgba(255,255,255,0.06)'}`,
                    boxShadow: isHov && !isLocked
                      ? `0 8px 40px ${p.glow.replace('0.5', '0.15').replace('0.45', '0.15').replace('0.4', '0.15')}, inset 0 1px 0 rgba(255,255,255,0.05)`
                      : '0 2px 12px rgba(0,0,0,0.2)',
                    transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                    transform: isHov && !isLocked ? 'translateY(-4px)' : 'none',
                    animation: `fadeSlideUp 0.6s ease-out ${idx * 0.07}s both`,
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {/* subtle glow corner */}
                  <div style={{
                    position: 'absolute', top: -30, right: -30, width: 120, height: 120,
                    background: `radial-gradient(circle, ${p.glow.replace('0.5', '0.08').replace('0.45', '0.08').replace('0.4', '0.08')} 0%, transparent 70%)`,
                    borderRadius: '50%',
                  }} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: `radial-gradient(circle at 35% 30%, ${p.color1}, ${p.color2})`,
                      boxShadow: `0 0 16px ${p.glow.replace('0.5', '0.3').replace('0.45', '0.3').replace('0.4', '0.3')}, inset -4px -3px 8px rgba(0,0,0,0.3)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, flexShrink: 0,
                    }}>{p.emoji}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <div style={{ fontSize: 17, fontWeight: 800, color: p.color1 }}>{p.name}</div>
                      {isLocked && <span style={{ fontSize: 14, opacity: 0.7 }}>🔒</span>}
                      <div style={{
                        fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)',
                        textTransform: 'uppercase', letterSpacing: 1, width: '100%',
                      }}>{p.curator}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, fontWeight: 600, marginBottom: 14 }}>
                    {p.desc}
                  </div>

                  {isLocked ? (
                    <div style={{
                      fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.25)',
                      letterSpacing: 1, textTransform: 'uppercase',
                    }}>Незабаром</div>
                  ) : (
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {p.sections.map((s) => (
                        <span key={s} style={{
                          padding: '3px 10px', borderRadius: 8,
                          background: `${p.color1}10`,
                          border: `1px solid ${p.color1}20`,
                          fontSize: 10, fontWeight: 700, color: `${p.color1}AA`,
                        }}>★ {s}</span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* ─── MICROCOPY GUIDE ─── */}
          <div style={{
            margin: winSize.w <= 640 ? '0 12px 60px' : '0 24px 60px', padding: '24px',
            ...glassCard(), position: 'relative', zIndex: 1,
          }}>
            <div style={{
              fontWeight: 800, fontSize: 14, marginBottom: 14,
              background: 'linear-gradient(135deg, #B388FF, #64FFDA)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>🗣 Космічний сленг — Гайд по мікрокопі</div>
            <div style={{ display: 'grid', gridTemplateColumns: winSize.w <= 640 ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8 }}>
              {[
                ['Увійти',      'Стикування',         '🔐'],
                ['Завантажити', 'Взяти на борт',       '⬇'],
                ['Навчання',    'Прокачка екіпажу',    '🎓'],
                ['Пошук',       'Галактичний пошук',   '🔍'],
                ['Профіль',     'Посвідчення екіпажу', '👤'],
                ['Вийти',       'Відстикування',       '🚪'],
                ['Обране',      'Зоряна карта',        '⭐'],
                ['Сповіщення',  'Передачі',            '📡'],
              ].map(([from, to, icon]) => (
                <div key={from} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 10px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.02)',
                }}>
                  <span>{icon}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}>{from}</span>
                  <span style={{ fontSize: 12, color: 'rgba(179,136,255,0.3)' }}>→</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.7)' }}>{to}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── FOOTER ─── */}
          <footer style={{
            position: 'relative', zIndex: 1,
            borderTop: '1px solid transparent',
            backgroundImage: 'linear-gradient(#0A0A1A, #0A0A1A), linear-gradient(90deg, #f4b942, #7b6ef6, #34d4c8)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            background: 'rgba(10,18,40,0.7)',
            borderTopColor: 'transparent',
          }}>
            {/* gradient top border */}
            <div style={{
              height: 1,
              background: 'linear-gradient(90deg, rgba(244,185,66,0.4), rgba(123,110,246,0.4), rgba(52,212,200,0.4))',
              marginBottom: 0,
            }} />
            <div style={{
              maxWidth: 900, margin: '0 auto',
              padding: isMobile ? '28px 20px 36px' : '32px 24px 40px',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 16, textAlign: 'center',
            }}>
              {/* Logo + tagline */}
              <div>
                <div style={{
                  fontFamily: "'Comfortaa', sans-serif", fontWeight: 700,
                  fontSize: 15, color: 'rgba(232,224,240,0.85)',
                  marginBottom: 4,
                }}>🌌 Маленький Всесвіт</div>
                <div style={{
                  fontSize: 12, color: 'rgba(155,168,204,0.6)',
                  fontWeight: 600, letterSpacing: 0.3,
                }}>Освітній хаб для спеціалістів та батьків</div>
              </div>

              {/* Links row */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
                gap: isMobile ? '10px 16px' : '10px 24px',
                alignItems: 'center',
              }}>
                <button
                  onClick={() => navigate('about')}
                  style={{
                    background: 'none', border: 'none', padding: 0,
                    fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 600,
                    color: 'rgba(155,168,204,0.7)', cursor: 'pointer',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#e8edf8' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(155,168,204,0.7)' }}
                >Про команду</button>
                <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 11 }}>·</span>
                <a
                  href="https://forms.gle/1VfZ618G1WT1xE3z8"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 600,
                    color: '#f4b942', textDecoration: 'none',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.75' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                >Залишити відгук ✨</a>
                <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 11 }}>·</span>
                <a
                  href="https://www.instagram.com/little_universe_kids/"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{ color: 'rgba(155,168,204,0.7)', display: 'inline-flex', alignItems: 'center', transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#e8edf8' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(155,168,204,0.7)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.8"/>
                    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/>
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
                  </svg>
                </a>
                <a
                  href="https://t.me/+KBg-YoLiqTVmNmJi"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Telegram"
                  style={{ color: 'rgba(155,168,204,0.7)', display: 'inline-flex', alignItems: 'center', transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#e8edf8' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(155,168,204,0.7)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M21.8 3.2L2.6 10.7c-1.3.5-1.3 1.3-.2 1.6l4.8 1.5 11.1-7c.5-.3 1 0 .6.4L9.8 16l-.4 5c.6 0 .8-.3 1.1-.6l2.7-2.6 4.9 3.6c.9.5 1.6.2 1.8-.8L22.8 4.3c.3-1.2-.5-1.7-1-1.1z" fill="currentColor"/>
                  </svg>
                </a>
                <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 11 }}>·</span>
                <a
                  href="mailto:hello@littleuniverse.app"
                  style={{
                    fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 600,
                    color: 'rgba(155,168,204,0.7)', textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#e8edf8' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(155,168,204,0.7)' }}
                >Підтримка: hello@littleuniverse.app</a>
              </div>

              {/* Copyright */}
              <div style={{
                fontSize: 11, color: 'rgba(255,255,255,0.2)',
                fontFamily: "'Nunito', sans-serif", fontWeight: 600, letterSpacing: 0.4,
              }}>© 2026 Маленький Всесвіт. Всі права захищені.</div>
            </div>
          </footer>
        </>
      )}

      {/* ═══════════════════
         PLANET DETAIL VIEW
         ═══════════════════ */}
      {view === 'planet' && activePlanet && (
        <PlanetDetailView
          p={activePlanet}
          isMobile={isMobile}
          backToLanding={backToLanding}
        />
      )}
    </div>
  )
}
