import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════
   МАЛЕНЬКИЙ ВСЕСВІТ — COSMIC GALAXY EDITION
   ═══════════════════════════════════════════ */

const PLANETS = [
  {
    id: "logic-zorx",
    name: "Логіка-Зоркс",
    emoji: "📐",
    curator: "Зоркс Зірка",
    curatorRole: "Куратор математики та логіки",
    color1: "#00E5CC",
    color2: "#00897B",
    glow: "rgba(0,229,204,0.5)",
    ring: "rgba(0,229,204,0.15)",
    desc: "Математика, логіка, просторове мислення та когнітивні головоломки",
    sections: ["Робочі аркуші", "Відеоуроки", "Інтерактивні пазли", "Набори для оцінювання"],
    size: 110,
    orbitRadius: 160,
    speed: 28,
    startAngle: 30,
  },
  {
    id: "art-lumi",
    name: "Арт-Люмі",
    emoji: "🎨",
    curator: "Люмі Лисичка",
    curatorRole: "Куратор психології та арт-терапії",
    color1: "#FF7E7E",
    color2: "#D32F2F",
    glow: "rgba(255,126,126,0.5)",
    ring: "rgba(255,126,126,0.12)",
    desc: "Психологія, емоційний інтелект та арт-терапія",
    sections: ["Арт-терапевтичні картки", "Аркуші емоцій", "Посібники для батьків", "Протоколи спеціалістів"],
    size: 100,
    orbitRadius: 230,
    speed: 35,
    startAngle: 120,
  },
  {
    id: "logo-orbit",
    name: "Лого-Орбіта",
    emoji: "🪐",
    curator: "Орбіта Козочка",
    curatorRole: "Куратор логопедії та грамотності",
    color1: "#B388FF",
    color2: "#7C4DFF",
    glow: "rgba(179,136,255,0.5)",
    ring: "rgba(179,136,255,0.12)",
    desc: "Логопедія, грамотність та розвиток мовлення",
    sections: ["Артикуляційні PDF", "Фонетичні ігри", "Конструктори історій", "Трекери прогресу"],
    size: 120,
    orbitRadius: 310,
    speed: 44,
    startAngle: 210,
  },
  {
    id: "stem-marik",
    name: "STEM-Марік",
    emoji: "🧪",
    curator: "Марік Інопланетянин",
    curatorRole: "Куратор STEM та науки",
    color1: "#64B5F6",
    color2: "#1565C0",
    glow: "rgba(100,181,246,0.5)",
    ring: "rgba(100,181,246,0.12)",
    desc: "Наукові експерименти, природа та дослідження космосу",
    sections: ["Набори експериментів", "Щоденники природи", "Космічні активності", "STEM-челенджі"],
    size: 95,
    orbitRadius: 380,
    speed: 52,
    startAngle: 300,
  },
  {
    id: "heritage-lambi",
    name: "Спадщина-Ламбі",
    emoji: "🐑",
    curator: "Ламбі Ягня",
    curatorRole: "Хранитель традицій та спадщини",
    color1: "#F8BBD0",
    color2: "#AD1457",
    glow: "rgba(248,187,208,0.5)",
    ring: "rgba(248,187,208,0.12)",
    desc: "Українські свята, традиції, легенди та культурна спадщина",
    sections: ["Свята та обряди", "Легенди та казки", "Традиційні ремесла", "Пісні та колядки"],
    size: 100,
    orbitRadius: 440,
    speed: 58,
    startAngle: 35,
  },
  {
    id: "home-station",
    name: "Домашня Станція",
    emoji: "🏠",
    curator: "Сімейний Хаб",
    curatorRole: "Для батьків та вихователів",
    color1: "#FFD54F",
    color2: "#F9A825",
    glow: "rgba(255,213,79,0.5)",
    ring: "rgba(255,213,79,0.12)",
    desc: "Поради для батьків, швидкі ігри вдома та щоденні ритуали",
    sections: ["Ідеї для щоденних ігор", "Статті для батьків", "Швидкі активності", "Сезонні гайди"],
    size: 90,
    orbitRadius: 510,
    speed: 66,
    startAngle: 70,
  },
  {
    id: "knowledge-spaceport",
    name: "Космопорт Знань",
    emoji: "🚀",
    curator: "Центр Керування",
    curatorRole: "Преміум підготовка до школи",
    color1: "#FF80AB",
    color2: "#C51162",
    glow: "rgba(255,128,171,0.45)",
    ring: "rgba(255,128,171,0.1)",
    desc: "Преміум освітні курси для підготовки дошкільнят",
    sections: ["Курси підготовки", "Тести оцінювання", "Бейджі навичок", "Звіти для батьків"],
    size: 85,
    orbitRadius: 570,
    speed: 74,
    startAngle: 170,
  },
  {
    id: "training-hub",
    name: "Тренінг-Хаб",
    emoji: "🛰",
    curator: "Академія",
    curatorRole: "Професійний розвиток",
    color1: "#B0BEC5",
    color2: "#546E7A",
    glow: "rgba(176,190,197,0.4)",
    ring: "rgba(176,190,197,0.1)",
    desc: "Вебінари, воркшопи та сертифікації для спеціалістів",
    sections: ["Живі вебінари", "Шляхи сертифікації", "Архів воркшопів", "Прокачка екіпажу"],
    size: 80,
    orbitRadius: 630,
    speed: 86,
    startAngle: 250,
  },
];

const SURPRISES = [
  "🎲 Робочий аркуш-лабіринт — Логічний лабіринт Зоркса!",
  "🖍 Розмальовка — Палітра емоцій Люмі!",
  "📖 Міні-історія — Скоромовка від Орбіти!",
  "🔬 Швидкий експеримент — Лабораторія Маріка!",
  "🐑 Традиція від Ламбі — дізнайся про свято!",
  "🏡 5-хвилинна гра — Бліцактивність Домашньої Станції!",
  "⭐ Бонусний пазл — Галактична головоломка!",
];

const FLOWS = {
  specialist: [
    { step: "Стикування (Вхід)", icon: "🚀", detail: "SSO / Email авторизація з вибором ролі" },
    { step: "Панель керування", icon: "📊", detail: "Персоналізовані рекомендації планет" },
    { step: "Обрати планету", icon: "🪐", detail: "Перехід до розділу контенту для спеціалістів" },
    { step: "Перегляд ресурсів", icon: "📂", detail: "Фільтрація за віком, темою, складністю" },
    { step: "Взяти на борт", icon: "⬇️", detail: "Завантаження PDF, наборів, протоколів" },
    { step: "Прокачка екіпажу", icon: "🎓", detail: "Доступ до вебінарів та сертифікацій" },
  ],
  parent: [
    { step: "Стикування (Вхід)", icon: "🚀", detail: "Простий вхід через email або соцмережі" },
    { step: "Домашня Станція", icon: "🏠", detail: "Щоденна активність + порада для батьків" },
    { step: "Дослідити планети", icon: "🌍", detail: "Перегляд контенту за інтересами" },
    { step: "Метеоритний сюрприз", icon: "☄️", detail: "Випадкова активність дня" },
    { step: "Збирати та грати", icon: "🎯", detail: "Зберігати улюблене, відстежувати прогрес" },
    { step: "Курси Космопорту", icon: "🚀", detail: "Запис на преміум підготовку до школи" },
  ],
};

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
  );
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: s.size > 3 ? "#fff" : s.size > 2 ? "#E8D5FF" : `rgba(255,255,255,${s.opacity})`,
            boxShadow: s.size > 2 ? `0 0 ${s.size * 3}px ${s.size}px rgba(200,180,255,0.3)` : "none",
            animation: `starTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

function NebulaLayer() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      <div
        style={{
          position: "absolute",
          width: "140%",
          height: "140%",
          top: "-20%",
          left: "-20%",
          background: `
            radial-gradient(ellipse 600px 400px at 20% 30%, rgba(88,28,135,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 500px 500px at 75% 20%, rgba(30,58,138,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 400px 300px at 60% 75%, rgba(6,78,59,0.12) 0%, transparent 65%),
            radial-gradient(ellipse 350px 350px at 15% 80%, rgba(127,29,29,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 600px 200px at 50% 50%, rgba(67,56,202,0.08) 0%, transparent 70%)
          `,
          animation: "nebulaDrift 60s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}

function PlanetOrb({ planet, hovered, onClick, onHover, onLeave, style: extraStyle }) {
  const sz = planet.size;
  return (
    <div
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        width: sz,
        height: sz,
        borderRadius: "50%",
        cursor: "pointer",
        position: "relative",
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s",
        transform: hovered ? "scale(1.15)" : "scale(1)",
        ...extraStyle,
      }}
    >
      {/* glow */}
      <div
        style={{
          position: "absolute",
          inset: hovered ? -18 : -10,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${planet.glow} 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0.5,
          transition: "all 0.4s",
          animation: "planetPulse 3s ease-in-out infinite alternate",
        }}
      />
      {/* body */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: `
            radial-gradient(circle at 35% 30%, ${planet.color1} 0%, ${planet.color2} 60%, rgba(0,0,0,0.5) 100%)
          `,
          boxShadow: `
            inset -${sz * 0.15}px -${sz * 0.1}px ${sz * 0.3}px rgba(0,0,0,0.5),
            inset ${sz * 0.05}px ${sz * 0.05}px ${sz * 0.2}px rgba(255,255,255,0.15),
            0 0 ${hovered ? 40 : 20}px ${planet.glow}
          `,
          overflow: "hidden",
        }}
      >
        {/* surface detail */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: `
            radial-gradient(circle at 60% 40%, rgba(255,255,255,0.08) 0%, transparent 40%),
            radial-gradient(circle at 25% 70%, rgba(0,0,0,0.15) 0%, transparent 35%)
          `,
        }} />
        {/* atmosphere */}
        <div style={{
          position: "absolute", inset: -2, borderRadius: "50%",
          border: `1.5px solid ${planet.color1}30`,
        }} />
      </div>
      {/* ring for some planets */}
      {(planet.id === "logo-orbit" || planet.id === "knowledge-spaceport") && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: sz * 1.6,
          height: sz * 0.35,
          marginTop: -sz * 0.175,
          marginLeft: -sz * 0.8,
          borderRadius: "50%",
          border: `2px solid ${planet.color1}30`,
          transform: "rotateX(75deg)",
          boxShadow: `0 0 8px ${planet.color1}15`,
        }} />
      )}
      {/* emoji */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: sz * 0.35,
        zIndex: 2,
        filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))",
      }}>
        {planet.emoji}
      </div>
    </div>
  );
}

export default function LittleUniverseGalaxy() {
  const [view, setView] = useState("landing");
  const [activePlanet, setActivePlanet] = useState(null);
  const [meteorite, setMeteorite] = useState(null);
  const [flowTab, setFlowTab] = useState("specialist");
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [time, setTime] = useState(0);
  const [meteoritePos, setMeteoritePos] = useState({ x: 85, y: 15 });

  useEffect(() => {
    let frame;
    let t = 0;
    const tick = () => {
      t += 0.003;
      setTime(t);
      setMeteoritePos({
        x: 83 + Math.sin(t * 1.1) * 5,
        y: 13 + Math.cos(t * 0.8) * 4 + Math.sin(t * 2) * 1.5,
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const triggerMeteorite = () => {
    const pick = SURPRISES[Math.floor(Math.random() * SURPRISES.length)];
    setMeteorite(pick);
    setTimeout(() => setMeteorite(null), 4500);
  };

  const openPlanet = (p) => {
    setActivePlanet(p);
    setView("planet");
  };

  const glassCard = (extra = {}) => ({
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    ...extra,
  });

  return (
    <div style={{
      fontFamily: "'Nunito', 'Comfortaa', sans-serif",
      background: "linear-gradient(145deg, #05050F 0%, #0A0A1A 30%, #0D0B1E 60%, #080818 100%)",
      minHeight: "100vh",
      color: "#E8E0F0",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&family=Nunito:wght@600;700;800;900&display=swap');
        @keyframes starTwinkle {
          0% { opacity: 0.15; transform: scale(0.7); }
          100% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes planetPulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.08); opacity: 0.8; }
        }
        @keyframes nebulaDrift {
          0% { transform: translate(0,0) rotate(0deg); }
          100% { transform: translate(30px,-20px) rotate(3deg); }
        }
        @keyframes floatMeteorite {
          0%,100% { transform: translateY(0) rotate(-8deg); }
          50% { transform: translateY(-10px) rotate(8deg); }
        }
        @keyframes popCosmic {
          0% { transform: translate(-50%,-50%) scale(0.3); opacity: 0; }
          60% { transform: translate(-50%,-50%) scale(1.05); }
          100% { transform: translate(-50%,-50%) scale(1); opacity: 1; }
        }
        @keyframes glowLine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes orbitPath {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        * { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(179,136,255,0.3); border-radius: 10px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <StarField />
      <NebulaLayer />

      {/* ─── NAV ─── */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 24px",
        background: "linear-gradient(180deg, rgba(10,10,30,0.9) 0%, rgba(10,10,30,0.6) 100%)",
        backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 100,
        borderBottom: "1px solid rgba(179,136,255,0.15)",
      }}>
        <div style={{
          fontSize: 20, fontWeight: 800, letterSpacing: 2,
          fontFamily: "'Comfortaa', sans-serif",
          background: "linear-gradient(135deg, #B388FF, #64FFDA, #FFD54F)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          display: "flex", alignItems: "center", gap: 10,
          cursor: "pointer",
        }} onClick={() => { setView("landing"); setActivePlanet(null); }}>
          <span style={{ fontSize: 24, WebkitTextFillColor: "initial" }}>🌌</span>
          МАЛЕНЬКИЙ ВСЕСВІТ
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[
            ["landing", "🪐 Планети"],
            ["sitemap", "🗺 Карта"],
            ["flows", "🔄 Шляхи"],
          ].map(([v, label]) => (
            <button key={v} onClick={() => { setView(v); setActivePlanet(null); }} style={{
              padding: "7px 16px", borderRadius: 24, fontFamily: "inherit",
              border: view === v ? "1.5px solid rgba(179,136,255,0.5)" : "1.5px solid rgba(255,255,255,0.1)",
              background: view === v ? "rgba(179,136,255,0.15)" : "rgba(255,255,255,0.03)",
              color: view === v ? "#D4BFFF" : "rgba(255,255,255,0.55)",
              cursor: "pointer", fontWeight: 700, fontSize: 13,
              transition: "all 0.3s",
            }}>{label}</button>
          ))}
          <button onClick={triggerMeteorite} style={{
            padding: "7px 18px", borderRadius: 24, fontFamily: "inherit",
            background: "linear-gradient(135deg, rgba(255,152,0,0.25), rgba(255,87,34,0.2))",
            border: "1.5px solid rgba(255,152,0,0.35)",
            color: "#FFB74D", cursor: "pointer", fontWeight: 700, fontSize: 13,
            transition: "all 0.3s",
          }}>☄️ Метеорит</button>
        </div>
      </nav>

      {/* ─── FLOATING METEORITE ─── */}
      {view === "landing" && (
        <div onClick={triggerMeteorite} style={{
          position: "fixed", zIndex: 90, cursor: "pointer",
          left: `${meteoritePos.x}%`, top: `${meteoritePos.y}%`,
          filter: "drop-shadow(0 0 20px rgba(255,152,0,0.6))",
          userSelect: "none", transition: "left 0.5s, top 0.5s",
        }}>
          <div style={{ fontSize: 36, animation: "floatMeteorite 3s ease-in-out infinite" }}>☄️</div>
        </div>
      )}

      {/* ─── METEORITE POPUP ─── */}
      {meteorite && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)",
        }} onClick={() => setMeteorite(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{
            ...glassCard(),
            background: "linear-gradient(145deg, rgba(30,20,50,0.95), rgba(20,15,40,0.95))",
            border: "1.5px solid rgba(255,152,0,0.3)",
            padding: "36px 44px", maxWidth: 400, textAlign: "center",
            animation: "popCosmic 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            boxShadow: "0 0 60px rgba(255,152,0,0.15), 0 20px 60px rgba(0,0,0,0.5)",
          }}>
            <div style={{ fontSize: 52, marginBottom: 14, animation: "floatMeteorite 2s ease-in-out infinite" }}>☄️</div>
            <div style={{
              fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase",
              background: "linear-gradient(90deg, #FF9800, #FFD54F, #FF9800)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "glowLine 3s linear infinite", marginBottom: 12,
            }}>Метеоритний сюрприз!</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#F0E6FF", lineHeight: 1.5 }}>{meteorite}</div>
            <button onClick={() => setMeteorite(null)} style={{
              marginTop: 20, padding: "10px 28px", borderRadius: 24,
              background: "linear-gradient(135deg, #FF9800, #F57C00)",
              border: "none", color: "#fff", fontWeight: 800, fontSize: 13,
              cursor: "pointer", fontFamily: "inherit",
              boxShadow: "0 4px 20px rgba(255,152,0,0.3)",
            }}>⬇ Взяти на борт</button>
          </div>
        </div>
      )}

      {/* ═══════════════════════
         LANDING — SOLAR SYSTEM
         ═══════════════════════ */}
      {view === "landing" && !activePlanet && (
        <>
          {/* HERO */}
          <div style={{
            textAlign: "center", padding: "50px 20px 20px",
            position: "relative", zIndex: 1,
            animation: "fadeSlideUp 0.8s ease-out",
          }}>
            <div style={{
              display: "inline-block", padding: "5px 20px", borderRadius: 24,
              border: "1px solid rgba(179,136,255,0.25)",
              background: "rgba(179,136,255,0.08)",
              fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase",
              color: "#B388FF", marginBottom: 20,
            }}>✦ Освітній Командний Центр ✦</div>

            <h1 style={{
              fontSize: "clamp(36px, 7vw, 64px)", fontWeight: 900, lineHeight: 1.05,
              fontFamily: "'Comfortaa', sans-serif", marginBottom: 12,
              background: "linear-gradient(135deg, #E8D5FF 0%, #64FFDA 40%, #FFD54F 70%, #FF80AB 100%)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "glowLine 8s linear infinite",
            }}>Маленький Всесвіт</h1>

            <p style={{
              fontSize: "clamp(14px, 2.2vw, 17px)", color: "rgba(232,224,240,0.6)",
              maxWidth: 520, margin: "0 auto 20px", lineHeight: 1.6, fontWeight: 600,
            }}>
              Професійний освітній хаб, де кінематографічні персонажі
              ведуть спеціалістів та батьків крізь галактику навчання
            </p>

            {/* microcopy badges */}
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {["🔐 Стикування", "🔍 Галактичний пошук", "⬇ Взяти на борт", "🎓 Прокачка екіпажу"].map((t) => (
                <span key={t} style={{
                  padding: "5px 12px", borderRadius: 12,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)",
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* ─── ORBITAL DISPLAY ─── */}
          <div style={{
            position: "relative", width: "100%", maxWidth: 780,
            height: 780, margin: "-20px auto 0",
            zIndex: 1,
          }}>
            {/* center sun */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 70, height: 70, borderRadius: "50%",
              background: "radial-gradient(circle at 40% 35%, #FFD54F, #FF9800, #E65100)",
              boxShadow: "0 0 40px rgba(255,213,79,0.4), 0 0 80px rgba(255,152,0,0.2), inset -8px -6px 16px rgba(0,0,0,0.3)",
            }}>
              <div style={{
                position: "absolute", inset: -20, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,213,79,0.15) 0%, transparent 70%)",
                animation: "planetPulse 4s ease-in-out infinite alternate",
              }} />
              <div style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 28, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
              }}>☀️</div>
            </div>

            {/* orbit rings */}
            {PLANETS.map((p) => (
              <div key={`orbit-${p.id}`} style={{
                position: "absolute",
                top: "50%", left: "50%",
                width: p.orbitRadius * 2 * 0.56,
                height: p.orbitRadius * 2 * 0.56,
                marginTop: -p.orbitRadius * 0.56,
                marginLeft: -p.orbitRadius * 0.56,
                borderRadius: "50%",
                border: `1px solid ${p.ring}`,
                pointerEvents: "none",
              }} />
            ))}

            {/* planets on orbits */}
            {PLANETS.map((p) => {
              const angle = p.startAngle + (time * 360) / p.speed;
              const rad = (angle * Math.PI) / 180;
              const r = p.orbitRadius * 0.56;
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r * 0.55; // perspective squish
              return (
                <div key={p.id} style={{
                  position: "absolute",
                  top: "50%", left: "50%",
                  marginLeft: x - p.size / 2,
                  marginTop: y - p.size / 2,
                  zIndex: Math.round(y + 500),
                  transition: "margin 0.05s linear",
                }}>
                  <PlanetOrb
                    planet={p}
                    hovered={hoveredPlanet === p.id}
                    onClick={() => openPlanet(p)}
                    onHover={() => setHoveredPlanet(p.id)}
                    onLeave={() => setHoveredPlanet(null)}
                  />
                  {/* label */}
                  <div style={{
                    position: "absolute", top: "100%", left: "50%",
                    transform: "translateX(-50%)", marginTop: 6, whiteSpace: "nowrap",
                    textAlign: "center", pointerEvents: "none",
                    opacity: hoveredPlanet === p.id ? 1 : 0.6,
                    transition: "opacity 0.3s",
                  }}>
                    <div style={{
                      fontSize: 12, fontWeight: 800, color: p.color1,
                      textShadow: `0 0 12px ${p.glow}`,
                    }}>{p.name}</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>
                      {p.curator}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ─── PLANET CARDS GRID ─── */}
          <div style={{
            textAlign: "center", marginBottom: 20, position: "relative", zIndex: 1,
          }}>
            <span style={{
              fontSize: 12, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase",
              color: "rgba(179,136,255,0.5)",
            }}>✦ Обери свою планету ✦</span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16, padding: "0 24px 40px",
            maxWidth: 1100, margin: "0 auto",
            position: "relative", zIndex: 1,
          }}>
            {PLANETS.map((p, idx) => {
              const isHov = hoveredPlanet === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => openPlanet(p)}
                  onMouseEnter={() => setHoveredPlanet(p.id)}
                  onMouseLeave={() => setHoveredPlanet(null)}
                  style={{
                    ...glassCard(),
                    padding: "22px 24px",
                    cursor: "pointer",
                    border: `1px solid ${isHov ? p.color1 + "50" : "rgba(255,255,255,0.06)"}`,
                    boxShadow: isHov ? `0 8px 40px ${p.glow.replace("0.5", "0.15")}, inset 0 1px 0 rgba(255,255,255,0.05)` : "0 2px 12px rgba(0,0,0,0.2)",
                    transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                    transform: isHov ? "translateY(-4px)" : "none",
                    animation: `fadeSlideUp 0.6s ease-out ${idx * 0.07}s both`,
                    position: "relative", overflow: "hidden",
                  }}
                >
                  {/* subtle glow corner */}
                  <div style={{
                    position: "absolute", top: -30, right: -30, width: 120, height: 120,
                    background: `radial-gradient(circle, ${p.glow.replace("0.5", "0.08")} 0%, transparent 70%)`,
                    borderRadius: "50%",
                  }} />

                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: `radial-gradient(circle at 35% 30%, ${p.color1}, ${p.color2})`,
                      boxShadow: `0 0 16px ${p.glow.replace("0.5", "0.3")}, inset -4px -3px 8px rgba(0,0,0,0.3)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20, flexShrink: 0,
                    }}>{p.emoji}</div>
                    <div>
                      <div style={{ fontSize: 17, fontWeight: 800, color: p.color1 }}>{p.name}</div>
                      <div style={{
                        fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)",
                        textTransform: "uppercase", letterSpacing: 1,
                      }}>{p.curator}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.55, fontWeight: 600, marginBottom: 14 }}>
                    {p.desc}
                  </div>

                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.sections.map((s) => (
                      <span key={s} style={{
                        padding: "3px 10px", borderRadius: 8,
                        background: `${p.color1}10`,
                        border: `1px solid ${p.color1}20`,
                        fontSize: 10, fontWeight: 700, color: `${p.color1}AA`,
                      }}>★ {s}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ─── MICROCOPY GUIDE ─── */}
          <div style={{
            maxWidth: 700, margin: "0 auto 60px", padding: "24px",
            ...glassCard(), position: "relative", zIndex: 1,
          }}>
            <div style={{
              fontWeight: 800, fontSize: 14, marginBottom: 14,
              background: "linear-gradient(135deg, #B388FF, #64FFDA)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>🗣 Космічний сленг — Гайд по мікрокопі</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
              {[
                ["Увійти", "Стикування", "🔐"],
                ["Завантажити", "Взяти на борт", "⬇"],
                ["Навчання", "Прокачка екіпажу", "🎓"],
                ["Пошук", "Галактичний пошук", "🔍"],
                ["Профіль", "Посвідчення екіпажу", "👤"],
                ["Вийти", "Відстикування", "🚪"],
                ["Обране", "Зоряна карта", "⭐"],
                ["Сповіщення", "Передачі", "📡"],
              ].map(([from, to, icon]) => (
                <div key={from} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "6px 10px", borderRadius: 10,
                  background: "rgba(255,255,255,0.02)",
                }}>
                  <span>{icon}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontWeight: 600 }}>{from}</span>
                  <span style={{ fontSize: 12, color: "rgba(179,136,255,0.3)" }}>→</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.7)" }}>{to}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════
         PLANET DETAIL VIEW
         ═══════════════════ */}
      {view === "planet" && activePlanet && (() => {
        const p = activePlanet;
        return (
          <>
            <div style={{
              textAlign: "center", padding: "40px 24px 32px",
              position: "relative", zIndex: 1,
              background: `radial-gradient(ellipse 500px 300px at 50% 80%, ${p.glow.replace("0.5", "0.08")} 0%, transparent 70%)`,
              animation: "fadeSlideUp 0.5s ease-out",
            }}>
              <button onClick={() => { setView("landing"); setActivePlanet(null); }} style={{
                position: "absolute", top: 16, left: 20,
                padding: "6px 14px", borderRadius: 12,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)", cursor: "pointer",
                fontWeight: 700, fontSize: 12, fontFamily: "inherit",
              }}>← Назад</button>

              <PlanetOrb
                planet={{ ...p, size: 100 }}
                hovered={true}
                onClick={() => {}}
                onHover={() => {}}
                onLeave={() => {}}
                style={{ margin: "0 auto 16px", position: "relative" }}
              />

              <h2 style={{
                fontSize: 32, fontWeight: 900, marginBottom: 4,
                fontFamily: "'Comfortaa', sans-serif",
                color: p.color1,
                textShadow: `0 0 20px ${p.glow.replace("0.5", "0.3")}`,
              }}>Планета {p.name}</h2>
              <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>
                {p.curator} — {p.curatorRole}
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 8, maxWidth: 460, margin: "8px auto 0" }}>
                {p.desc}
              </p>
            </div>

            <div style={{ maxWidth: 720, margin: "24px auto", padding: "0 24px 60px", position: "relative", zIndex: 1 }}>
              <div style={{
                fontWeight: 800, fontSize: 12, color: "rgba(179,136,255,0.5)",
                textTransform: "uppercase", letterSpacing: 2, marginBottom: 16,
              }}>★ Розділи контенту</div>

              <div style={{ display: "grid", gap: 12 }}>
                {p.sections.map((s, i) => (
                  <div key={s} style={{
                    ...glassCard(),
                    padding: "18px 22px",
                    display: "flex", alignItems: "center", gap: 14,
                    animation: `fadeSlideUp 0.5s ease-out ${i * 0.1}s both`,
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: `linear-gradient(135deg, ${p.color1}20, ${p.color2}30)`,
                      border: `1px solid ${p.color1}25`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 17, fontWeight: 900, color: p.color1,
                    }}>{i + 1}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: "rgba(255,255,255,0.85)" }}>{s}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>
                        Огляд ★ PDF, відео, інтерактив
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                fontWeight: 800, fontSize: 12, color: "rgba(179,136,255,0.5)",
                textTransform: "uppercase", letterSpacing: 2, marginTop: 32, marginBottom: 16,
              }}>★ Зразки ресурсів</div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                {["📄 PDF-аркуш", "🎬 Відеоурок", "🧩 Інтерактивна гра", "📋 Набір оцінювання", "🖨 Картки для друку", "📊 Графік прогресу"].map((r, i) => (
                  <div key={r} style={{
                    ...glassCard(),
                    padding: "20px 14px", textAlign: "center", cursor: "pointer",
                    transition: "all 0.3s",
                    animation: `fadeSlideUp 0.5s ease-out ${i * 0.08 + 0.3}s both`,
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{r.split(" ")[0]}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.65)" }}>{r.slice(2)}</div>
                    <div style={{
                      marginTop: 10, padding: "5px 12px", borderRadius: 10,
                      background: `${p.color1}12`, border: `1px solid ${p.color1}25`,
                      fontSize: 11, fontWeight: 800, color: p.color1,
                      display: "inline-block",
                    }}>⬇ Взяти на борт</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      })()}

      {/* ═══════════
         SITEMAP
         ═══════════ */}
      {view === "sitemap" && (
        <div style={{
          maxWidth: 900, margin: "40px auto", padding: "0 24px 60px",
          position: "relative", zIndex: 1,
          animation: "fadeSlideUp 0.6s ease-out",
        }}>
          <h2 style={{
            fontSize: 28, fontWeight: 900, textAlign: "center", marginBottom: 6,
            fontFamily: "'Comfortaa', sans-serif",
            background: "linear-gradient(135deg, #E8D5FF, #64FFDA)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>🗺 Галактична карта сайту</h2>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: 13, fontWeight: 600, marginBottom: 32 }}>
            Повна навігаційна архітектура Маленького Всесвіту
          </p>

          {/* root */}
          <div style={{
            ...glassCard(),
            background: "linear-gradient(135deg, rgba(179,136,255,0.12), rgba(100,255,218,0.06))",
            border: "1px solid rgba(179,136,255,0.2)",
            padding: "18px 22px", display: "flex", alignItems: "center", gap: 14, marginBottom: 14,
          }}>
            <span style={{ fontSize: 26 }}>🌌</span>
            <div>
              <div style={{
                fontWeight: 900, fontSize: 18,
                background: "linear-gradient(135deg, #B388FF, #64FFDA)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Маленький Всесвіт — Головна</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>Лендінг з планетарною навігацією</div>
            </div>
          </div>

          <div style={{ paddingLeft: 28 }}>
            <div style={{
              fontSize: 10, fontWeight: 800, color: "rgba(179,136,255,0.4)",
              textTransform: "uppercase", letterSpacing: 2, marginBottom: 10, marginTop: 12,
            }}>── Глобальна навігація ──</div>
            {[
              { icon: "🔐", label: "Стикування (Авторизація)", sub: "Вхід / Реєстрація / Вибір ролі" },
              { icon: "🔍", label: "Галактичний пошук", sub: "Глобальний пошук по всіх планетах" },
              { icon: "👤", label: "Посвідчення екіпажу", sub: "Профіль / Налаштування / Підписки" },
              { icon: "📡", label: "Передачі", sub: "Сповіщення / Оновлення" },
              { icon: "☄️", label: "Метеоритний сюрприз", sub: "Генератор випадкових активностей" },
            ].map((n) => (
              <div key={n.label} style={{
                ...glassCard(), padding: "12px 18px",
                display: "flex", alignItems: "center", gap: 12, marginBottom: 8,
              }}>
                <span style={{ fontSize: 18 }}>{n.icon}</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 13, color: "rgba(255,255,255,0.75)" }}>{n.label}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>{n.sub}</div>
                </div>
              </div>
            ))}

            <div style={{
              fontSize: 10, fontWeight: 800, color: "rgba(179,136,255,0.4)",
              textTransform: "uppercase", letterSpacing: 2, marginBottom: 10, marginTop: 20,
            }}>── Планетарні хаби ──</div>

            {PLANETS.map((p) => (
              <div key={p.id} style={{ marginBottom: 14 }}>
                <div style={{
                  ...glassCard(), padding: "14px 18px",
                  display: "flex", alignItems: "center", gap: 14,
                  border: `1px solid ${p.color1}18`,
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: `radial-gradient(circle at 35% 30%, ${p.color1}, ${p.color2})`,
                    boxShadow: `0 0 10px ${p.glow.replace("0.5", "0.2")}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, flexShrink: 0,
                  }}>{p.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 14, color: p.color1 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>{p.curator}</div>
                  </div>
                </div>
                <div style={{ paddingLeft: 36, marginTop: 4 }}>
                  {p.sections.map((s) => (
                    <div key={s} style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "5px 12px", marginBottom: 3,
                      borderLeft: `2px solid ${p.color1}20`,
                      fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)",
                    }}>
                      <span style={{ color: p.color1, fontSize: 8 }}>★</span> {s}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════
         USER FLOWS
         ═══════════ */}
      {view === "flows" && (
        <div style={{
          maxWidth: 740, margin: "40px auto", padding: "0 24px 60px",
          position: "relative", zIndex: 1,
          animation: "fadeSlideUp 0.6s ease-out",
        }}>
          <h2 style={{
            fontSize: 28, fontWeight: 900, textAlign: "center", marginBottom: 6,
            fontFamily: "'Comfortaa', sans-serif",
            background: "linear-gradient(135deg, #E8D5FF, #64FFDA)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>🔄 Шляхи користувача</h2>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: 13, fontWeight: 600, marginBottom: 28 }}>
            Подорож спеціаліста vs батька крізь Маленький Всесвіт
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 }}>
            {[
              ["specialist", "🛰 Шлях спеціаліста", "#B388FF"],
              ["parent", "🏠 Шлях батька", "#FFD54F"],
            ].map(([key, label, col]) => (
              <button key={key} onClick={() => setFlowTab(key)} style={{
                padding: "10px 24px", borderRadius: 16, fontFamily: "inherit",
                border: flowTab === key ? `1.5px solid ${col}60` : "1px solid rgba(255,255,255,0.08)",
                background: flowTab === key ? `${col}15` : "rgba(255,255,255,0.03)",
                color: flowTab === key ? col : "rgba(255,255,255,0.4)",
                fontWeight: 800, fontSize: 14, cursor: "pointer",
                transition: "all 0.3s",
              }}>{label}</button>
            ))}
          </div>

          <div>
            {FLOWS[flowTab].map((f, i) => {
              const dotCol = flowTab === "specialist" ? "#B388FF" : "#FFD54F";
              return (
                <div key={f.step} style={{
                  display: "flex", alignItems: "flex-start", gap: 16,
                  position: "relative",
                  paddingBottom: i < FLOWS[flowTab].length - 1 ? 20 : 0,
                  paddingLeft: 28,
                  animation: `fadeSlideUp 0.5s ease-out ${i * 0.1}s both`,
                }}>
                  {i < FLOWS[flowTab].length - 1 && (
                    <div style={{
                      position: "absolute", left: 15, top: 36, bottom: 0, width: 2,
                      background: `linear-gradient(to bottom, ${dotCol}30 0%, ${dotCol}05 100%)`,
                    }} />
                  )}
                  <div style={{
                    position: "absolute", left: 6, top: 5,
                    width: 20, height: 20, borderRadius: "50%",
                    background: `radial-gradient(circle, ${dotCol}, ${dotCol}80)`,
                    boxShadow: `0 0 10px ${dotCol}40`,
                    zIndex: 2,
                  }} />
                  <div style={{
                    flex: 1, ...glassCard(),
                    padding: "14px 18px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 18 }}>{f.icon}</span>
                      <span style={{ fontWeight: 800, fontSize: 15, color: "rgba(255,255,255,0.85)" }}>{f.step}</span>
                      <span style={{
                        marginLeft: "auto", fontSize: 10, fontWeight: 800,
                        color: "rgba(255,255,255,0.2)",
                        background: "rgba(255,255,255,0.04)",
                        padding: "2px 8px", borderRadius: 6,
                      }}>Крок {i + 1}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 600, lineHeight: 1.5 }}>
                      {f.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* comparison */}
          <div style={{
            marginTop: 36, ...glassCard(),
            background: "rgba(255,255,255,0.03)", padding: 24,
          }}>
            <div style={{
              fontWeight: 800, fontSize: 14, marginBottom: 16,
              background: "linear-gradient(135deg, #B388FF, #64FFDA)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>🔍 Ключові відмінності</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, color: "#B388FF", marginBottom: 8 }}>🛰 Спеціаліст</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, fontWeight: 600 }}>
                  • Панель керування за роллю<br/>
                  • Професійні протоколи та оцінювання<br/>
                  • Сертифікація та кредити ПК<br/>
                  • Масове завантаження ресурсів<br/>
                  • Інструменти для колаборації колег
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, color: "#FFD54F", marginBottom: 8 }}>🏠 Батько</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, fontWeight: 600 }}>
                  • Щоденні пропозиції активностей<br/>
                  • Спрощений контент без жаргону<br/>
                  • Відстеження прогресу дитини<br/>
                  • Швидкі ігри вдома<br/>
                  • Запис на преміум курси
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── FOOTER ─── */}
      <footer style={{
        textAlign: "center", padding: "24px 20px 32px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.2)" }}>
          🌌 Маленький Всесвіт — Прототип UI/UX стратегії
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.12)", marginTop: 4 }}>
          Естетика: Кінематографічні 3D-персонажі × Космічна Галактика
        </div>
      </footer>
    </div>
  );
}
