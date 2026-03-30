import { useState, useEffect, useRef } from "react";

const PLANETS = [
  {
    id: "logic-zorx",
    name: "Логіка-Зоркс",
    emoji: "📐",
    curator: "Зоркс Зірка",
    curatorRole: "Куратор математики та логіки",
    color: "#00BFA5",
    accent: "#E0F7FA",
    shadow: "rgba(0,191,165,0.35)",
    desc: "Математика, логіка, просторове мислення та когнітивні головоломки",
    sections: ["Робочі аркуші", "Відеоуроки", "Інтерактивні пазли", "Набори для оцінювання"],
    orbit: 0,
  },
  {
    id: "art-lumi",
    name: "Арт-Люмі",
    emoji: "🎨",
    curator: "Люмі Лисичка",
    curatorRole: "Куратор психології та арт-терапії",
    color: "#FF6F61",
    accent: "#FFF3E0",
    shadow: "rgba(255,111,97,0.35)",
    desc: "Психологія, емоційний інтелект та арт-терапія",
    sections: ["Арт-терапевтичні картки", "Аркуші емоцій", "Посібники для батьків", "Протоколи спеціалістів"],
    orbit: 1,
  },
  {
    id: "logo-orbit",
    name: "Лого-Орбіта",
    emoji: "🪐",
    curator: "Орбіта Козочка",
    curatorRole: "Куратор логопедії та грамотності",
    color: "#7E57C2",
    accent: "#F3E5F5",
    shadow: "rgba(126,87,194,0.35)",
    desc: "Логопедія, грамотність та розвиток мовлення",
    sections: ["Артикуляційні PDF", "Фонетичні ігри", "Конструктори історій", "Трекери прогресу"],
    orbit: 2,
  },
  {
    id: "stem-marik",
    name: "STEM-Марік",
    emoji: "🧪",
    curator: "Марік Інопланетянин",
    curatorRole: "Куратор STEM та науки",
    color: "#42A5F5",
    accent: "#E3F2FD",
    shadow: "rgba(66,165,245,0.35)",
    desc: "Наукові експерименти, природа та дослідження космосу",
    sections: ["Набори експериментів", "Щоденники природи", "Космічні активності", "STEM-челенджі"],
    orbit: 3,
  },
  {
    id: "home-station",
    name: "Домашня Станція",
    emoji: "🏠",
    curator: "Сімейний Хаб",
    curatorRole: "Для батьків та вихователів",
    color: "#FFB74D",
    accent: "#FFF8E1",
    shadow: "rgba(255,183,77,0.35)",
    desc: "Поради для батьків, швидкі ігри вдома та щоденні ритуали",
    sections: ["Ідеї для щоденних ігор", "Статті для батьків", "Швидкі активності", "Сезонні гайди"],
    orbit: 4,
  },
  {
    id: "knowledge-spaceport",
    name: "Космопорт Знань",
    emoji: "🚀",
    curator: "Центр Керування",
    curatorRole: "Преміум підготовка до школи",
    color: "#EC407A",
    accent: "#FCE4EC",
    shadow: "rgba(236,64,122,0.35)",
    desc: "Преміум освітні курси для підготовки дошкільнят",
    sections: ["Курси підготовки", "Тести оцінювання", "Бейджі навичок", "Звіти для батьків"],
    orbit: 5,
  },
  {
    id: "training-hub",
    name: "Тренінг-Хаб",
    emoji: "🛰",
    curator: "Академія",
    curatorRole: "Професійний розвиток",
    color: "#78909C",
    accent: "#ECEFF1",
    shadow: "rgba(120,144,156,0.35)",
    desc: "Вебінари, воркшопи та сертифікації для спеціалістів",
    sections: ["Живі вебінари", "Шляхи сертифікації", "Архів воркшопів", "Прокачка екіпажу"],
    orbit: 6,
  },
];

const SURPRISES = [
  "🎲 Робочий аркуш-лабіринт — Логічний лабіринт Зоркса!",
  "🖍 Розмальовка — Палітра емоцій Люмі!",
  "📖 Міні-історія — Скоромовка від Орбіти!",
  "🔬 Швидкий експеримент — Лабораторія Маріка!",
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

const cardboardBg = `repeating-conic-gradient(rgba(180,160,130,0.06) 0% 25%, transparent 0% 50%) 0 0 / 4px 4px,
  linear-gradient(175deg, #F5EFE6 0%, #EDE4D6 40%, #E8DFD0 100%)`;

const craftTexture = `repeating-conic-gradient(rgba(120,100,70,0.04) 0% 25%, transparent 0% 50%) 0 0 / 3px 3px`;

export default function LittleUniverse() {
  const [view, setView] = useState("landing");
  const [activePlanet, setActivePlanet] = useState(null);
  const [meteorite, setMeteorite] = useState(null);
  const [meteoritePos, setMeteoritePos] = useState({ x: 85, y: 12 });
  const [flowTab, setFlowTab] = useState("specialist");
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [stars, setStars] = useState([]);
  const [showMeteoriteBtn, setShowMeteoriteBtn] = useState(true);

  useEffect(() => {
    const s = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 4,
      dur: Math.random() * 2 + 2,
    }));
    setStars(s);
  }, []);

  useEffect(() => {
    let frame;
    let t = 0;
    const animate = () => {
      t += 0.008;
      setMeteoritePos({
        x: 82 + Math.sin(t * 0.7) * 6,
        y: 10 + Math.cos(t * 0.5) * 5 + Math.sin(t * 1.2) * 2,
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const triggerMeteorite = () => {
    const pick = SURPRISES[Math.floor(Math.random() * SURPRISES.length)];
    setMeteorite(pick);
    setTimeout(() => setMeteorite(null), 4000);
  };

  const openPlanet = (p) => {
    setActivePlanet(p);
    setView("planet");
  };

  const css = {
    root: {
      fontFamily: "'Nunito', 'Fredoka', sans-serif",
      background: cardboardBg,
      minHeight: "100vh",
      color: "#3E2C1C",
      position: "relative",
      overflow: "hidden",
    },
    starsLayer: {
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
    },
    star: (s) => ({
      position: "absolute",
      left: `${s.x}%`,
      top: `${s.y}%`,
      width: s.size,
      height: s.size,
      borderRadius: "50%",
      background: s.size > 2 ? "#FFD54F" : "rgba(255,213,79,0.5)",
      animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
      boxShadow: s.size > 2 ? "0 0 4px rgba(255,213,79,0.6)" : "none",
    }),
    topNav: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 24px",
      background: "linear-gradient(180deg, rgba(62,44,28,0.92) 0%, rgba(62,44,28,0.7) 100%)",
      backdropFilter: "blur(8px)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      borderBottom: "3px dashed rgba(255,213,79,0.4)",
    },
    logo: {
      fontSize: 22,
      fontWeight: 800,
      color: "#FFD54F",
      letterSpacing: 1.5,
      textTransform: "uppercase",
      textShadow: "0 2px 8px rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      gap: 10,
    },
    navBtns: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
    },
    navBtn: (active) => ({
      padding: "8px 16px",
      borderRadius: 20,
      border: active ? "2px solid #FFD54F" : "2px dashed rgba(255,255,255,0.25)",
      background: active ? "rgba(255,213,79,0.2)" : "transparent",
      color: active ? "#FFD54F" : "rgba(255,255,255,0.75)",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 13,
      transition: "all 0.25s",
      fontFamily: "inherit",
    }),
    hero: {
      textAlign: "center",
      padding: "60px 20px 30px",
      position: "relative",
      zIndex: 1,
    },
    heroTitle: {
      fontSize: "clamp(32px, 6vw, 56px)",
      fontWeight: 900,
      color: "#3E2C1C",
      lineHeight: 1.1,
      marginBottom: 8,
      textShadow: "2px 2px 0 rgba(255,213,79,0.3)",
    },
    heroSub: {
      fontSize: "clamp(14px, 2.5vw, 18px)",
      color: "#6D5D4B",
      maxWidth: 600,
      margin: "0 auto 12px",
      lineHeight: 1.5,
      fontWeight: 600,
    },
    badge: {
      display: "inline-block",
      padding: "6px 18px",
      borderRadius: 50,
      background: "linear-gradient(135deg, #3E2C1C, #5D4037)",
      color: "#FFD54F",
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: 2,
      textTransform: "uppercase",
      border: "2px dashed #FFD54F",
      marginBottom: 30,
    },
    planetGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: 20,
      padding: "0 24px 40px",
      maxWidth: 1100,
      margin: "0 auto",
      position: "relative",
      zIndex: 1,
    },
    planetCard: (p, hovered) => ({
      background: `${craftTexture}, linear-gradient(145deg, #FFFDF8 0%, ${p.accent} 100%)`,
      borderRadius: 20,
      padding: 24,
      cursor: "pointer",
      border: `3px ${hovered ? "solid" : "dashed"} ${p.color}`,
      boxShadow: hovered
        ? `0 8px 32px ${p.shadow}, 0 0 0 3px ${p.color}30, inset 0 1px 0 rgba(255,255,255,0.6)`
        : `0 3px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)`,
      transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
      transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
      position: "relative",
      overflow: "hidden",
    }),
    planetEmoji: {
      fontSize: 40,
      marginBottom: 8,
      display: "block",
      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
    },
    planetName: (p) => ({
      fontSize: 20,
      fontWeight: 800,
      color: p.color,
      marginBottom: 4,
    }),
    planetCurator: {
      fontSize: 12,
      fontWeight: 700,
      color: "#8D7B68",
      textTransform: "uppercase",
      letterSpacing: 1.2,
      marginBottom: 8,
    },
    planetDesc: {
      fontSize: 14,
      color: "#5D4E3C",
      lineHeight: 1.5,
      fontWeight: 600,
    },
    craftCorner: (p) => ({
      position: "absolute",
      top: -8,
      right: -8,
      width: 60,
      height: 60,
      background: `linear-gradient(135deg, ${p.color}20, ${p.color}40)`,
      borderRadius: "0 20px 0 30px",
      border: `2px dashed ${p.color}50`,
    }),
    meteoriteBtn: {
      position: "fixed",
      zIndex: 90,
      cursor: "pointer",
      transition: "transform 0.3s",
      filter: "drop-shadow(0 4px 16px rgba(255,152,0,0.4))",
      userSelect: "none",
    },
    meteoritePopup: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: `${craftTexture}, linear-gradient(145deg, #FFF8E1, #FFE0B2)`,
      border: "4px dashed #FF9800",
      borderRadius: 24,
      padding: "32px 40px",
      zIndex: 200,
      textAlign: "center",
      boxShadow: "0 16px 64px rgba(255,152,0,0.3), 0 0 0 100vmax rgba(0,0,0,0.4)",
      maxWidth: 400,
      animation: "popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
    detailHeader: (p) => ({
      background: `${craftTexture}, linear-gradient(145deg, ${p.accent}, ${p.color}15)`,
      padding: "48px 24px 32px",
      textAlign: "center",
      borderBottom: `4px dashed ${p.color}40`,
      position: "relative",
      zIndex: 1,
    }),
    sectionCard: {
      background: `${craftTexture}, linear-gradient(145deg, #FFFDF8, #FFF9F0)`,
      borderRadius: 16,
      padding: "20px 24px",
      border: "2px dashed rgba(62,44,28,0.15)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
    },
    sitemapContainer: {
      maxWidth: 900,
      margin: "40px auto",
      padding: "0 24px 60px",
      position: "relative",
      zIndex: 1,
    },
    sitemapNode: (p) => ({
      background: `${craftTexture}, linear-gradient(145deg, #FFFDF8, ${p ? p.accent : "#F5F5F5"})`,
      borderRadius: 16,
      padding: "16px 20px",
      border: `2px dashed ${p ? p.color : "#999"}60`,
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 10,
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    }),
    flowContainer: {
      maxWidth: 740,
      margin: "40px auto",
      padding: "0 24px 60px",
      position: "relative",
      zIndex: 1,
    },
    flowStep: (i, total) => ({
      display: "flex",
      alignItems: "flex-start",
      gap: 16,
      position: "relative",
      paddingBottom: i < total - 1 ? 24 : 0,
      paddingLeft: 28,
    }),
    flowLine: {
      position: "absolute",
      left: 15,
      top: 42,
      bottom: 0,
      width: 3,
      background: "repeating-linear-gradient(to bottom, #B8A89A 0px, #B8A89A 6px, transparent 6px, transparent 12px)",
    },
    flowDot: (color) => ({
      position: "absolute",
      left: 6,
      top: 6,
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: color || "#FFD54F",
      border: "3px solid #3E2C1C",
      boxShadow: `0 2px 8px ${color || "#FFD54F"}50`,
      zIndex: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 10,
    }),
    flowCard: {
      flex: 1,
      background: `${craftTexture}, linear-gradient(145deg, #FFFDF8, #FFF9F0)`,
      borderRadius: 14,
      padding: "14px 18px",
      border: "2px dashed rgba(62,44,28,0.12)",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    },
  };

  return (
    <div style={css.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&family=Fredoka:wght@400;500;600;700&display=swap');
        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes popIn {
          0% { transform: translate(-50%,-50%) scale(0.5); opacity: 0; }
          100% { transform: translate(-50%,-50%) scale(1); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        * { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-thumb { background: #C4B59B; border-radius: 10px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      {/* зірки */}
      <div style={css.starsLayer}>
        {stars.map((s) => (
          <div key={s.id} style={css.star(s)} />
        ))}
      </div>

      {/* НАВІГАЦІЯ */}
      <nav style={css.topNav}>
        <div style={css.logo}>
          <span style={{ fontSize: 28 }}>🌌</span>
          Маленький Всесвіт
        </div>
        <div style={css.navBtns}>
          {[
            ["landing", "🪐 Планети"],
            ["sitemap", "🗺 Карта сайту"],
            ["flows", "🔄 Шляхи користувача"],
          ].map(([v, label]) => (
            <button
              key={v}
              style={css.navBtn(view === v)}
              onClick={() => { setView(v); setActivePlanet(null); }}
              onMouseEnter={(e) => {
                if (view !== v) e.target.style.borderColor = "#FFD54F";
              }}
              onMouseLeave={(e) => {
                if (view !== v) e.target.style.borderColor = "rgba(255,255,255,0.25)";
              }}
            >
              {label}
            </button>
          ))}
          <button
            style={{
              ...css.navBtn(false),
              background: "linear-gradient(135deg, #FF9800, #F57C00)",
              color: "#fff",
              border: "2px solid #FFB74D",
            }}
            onClick={triggerMeteorite}
          >
            ☄️ Метеоритний сюрприз
          </button>
        </div>
      </nav>

      {/* МЕТЕОРИТ — ПЛАВАЮЧА КНОПКА */}
      {view === "landing" && showMeteoriteBtn && (
        <div
          style={{
            ...css.meteoriteBtn,
            left: `${meteoritePos.x}%`,
            top: `${meteoritePos.y}%`,
          }}
          onClick={triggerMeteorite}
          title="Метеоритний сюрприз!"
        >
          <div style={{ fontSize: 38, animation: "float 3s ease-in-out infinite" }}>☄️</div>
        </div>
      )}

      {/* МЕТЕОРИТ — ПОПАП */}
      {meteorite && (
        <div style={css.meteoritePopup}>
          <div style={{ fontSize: 48, marginBottom: 12, animation: "float 1.5s ease-in-out infinite" }}>☄️</div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#FF6F00", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>
            Метеоритний сюрприз!
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#3E2C1C", lineHeight: 1.4 }}>
            {meteorite}
          </div>
          <div style={{
            marginTop: 16,
            padding: "10px 28px",
            borderRadius: 50,
            background: "linear-gradient(135deg, #FF9800, #F57C00)",
            color: "#fff",
            fontWeight: 800,
            fontSize: 13,
            display: "inline-block",
            cursor: "pointer",
            border: "2px dashed #FFE0B2",
          }} onClick={() => setMeteorite(null)}>
            ⬇ Взяти на борт
          </div>
        </div>
      )}

      {/* ═══════ ГОЛОВНА ═══════ */}
      {view === "landing" && !activePlanet && (
        <>
          <div style={css.hero}>
            <div style={css.badge}>✦ Освітній Командний Центр ✦</div>
            <h1 style={css.heroTitle}>Маленький Всесвіт</h1>
            <p style={css.heroSub}>
              Професійний освітній хаб, де кінематографічні персонажі
              ведуть спеціалістів та батьків крізь рукотворну галактику навчання.
            </p>
            <div style={{
              display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 16,
            }}>
              {["🔐 Стикування", "🔍 Галактичний пошук", "⬇ Взяти на борт", "🎓 Прокачка екіпажу"].map((t) => (
                <span key={t} style={{
                  padding: "6px 14px",
                  borderRadius: 10,
                  background: "rgba(62,44,28,0.08)",
                  border: "1.5px dashed rgba(62,44,28,0.2)",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#6D5D4B",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: 24, position: "relative", zIndex: 1 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#8D7B68", letterSpacing: 2, textTransform: "uppercase" }}>
              ✦ Обери свою планету ✦
            </span>
          </div>

          <div style={css.planetGrid}>
            {PLANETS.map((p) => (
              <div
                key={p.id}
                style={css.planetCard(p, hoveredPlanet === p.id)}
                onClick={() => openPlanet(p)}
                onMouseEnter={() => setHoveredPlanet(p.id)}
                onMouseLeave={() => setHoveredPlanet(null)}
              >
                <div style={css.craftCorner(p)} />
                <span style={css.planetEmoji}>{p.emoji}</span>
                <div style={css.planetName(p)}>{p.name}</div>
                <div style={css.planetCurator}>
                  {p.curator} — {p.curatorRole}
                </div>
                <div style={css.planetDesc}>{p.desc}</div>
                <div style={{
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                  marginTop: 14,
                }}>
                  {p.sections.map((s) => (
                    <span key={s} style={{
                      padding: "4px 10px",
                      borderRadius: 8,
                      background: `${p.color}12`,
                      border: `1.5px dashed ${p.color}40`,
                      fontSize: 11,
                      fontWeight: 700,
                      color: p.color,
                    }}>
                      ★ {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* гайд по мікрокопі */}
          <div style={{
            maxWidth: 700, margin: "0 auto 60px", padding: "24px",
            background: `${craftTexture}, linear-gradient(145deg, #FFFDF8, #F5EFE6)`,
            borderRadius: 20, border: "3px dashed rgba(62,44,28,0.15)",
            position: "relative", zIndex: 1,
          }}>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12, color: "#3E2C1C" }}>
              🗣 Космічний сленг — Гайд по мікрокопі
            </div>
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
                  background: "rgba(62,44,28,0.04)",
                }}>
                  <span>{icon}</span>
                  <span style={{ fontSize: 12, color: "#999", fontWeight: 600 }}>{from}</span>
                  <span style={{ fontSize: 12, color: "#B8A89A" }}>→</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#3E2C1C" }}>{to}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ═══════ ДЕТАЛІ ПЛАНЕТИ ═══════ */}
      {view === "planet" && activePlanet && (
        <>
          <div style={css.detailHeader(activePlanet)}>
            <button
              onClick={() => { setView("landing"); setActivePlanet(null); }}
              style={{
                position: "absolute", top: 16, left: 16, padding: "6px 14px",
                borderRadius: 10, background: "rgba(62,44,28,0.08)",
                border: "2px dashed rgba(62,44,28,0.2)", cursor: "pointer",
                fontWeight: 700, fontSize: 12, fontFamily: "inherit", color: "#3E2C1C",
              }}
            >
              ← Назад до планет
            </button>
            <div style={{ fontSize: 56, marginBottom: 8, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}>
              {activePlanet.emoji}
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: activePlanet.color, marginBottom: 4 }}>
              Планета {activePlanet.name}
            </h2>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#6D5D4B" }}>
              {activePlanet.curator} — {activePlanet.curatorRole}
            </div>
            <p style={{ fontSize: 15, color: "#5D4E3C", marginTop: 8, maxWidth: 480, margin: "8px auto 0" }}>
              {activePlanet.desc}
            </p>
          </div>

          <div style={{ maxWidth: 700, margin: "32px auto", padding: "0 24px 60px", position: "relative", zIndex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#8D7B68", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>
              ★ Розділи контенту
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              {activePlanet.sections.map((s, i) => (
                <div key={s} style={css.sectionCard}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: `linear-gradient(135deg, ${activePlanet.color}20, ${activePlanet.color}40)`,
                      border: `2px dashed ${activePlanet.color}50`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, fontWeight: 900, color: activePlanet.color,
                    }}>
                      {i + 1}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 16, color: "#3E2C1C" }}>{s}</div>
                      <div style={{ fontSize: 12, color: "#8D7B68", fontWeight: 600 }}>
                        Огляд ★ PDF, відео, інтерактив
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* сітка зразків ресурсів */}
            <div style={{ marginTop: 32, fontWeight: 800, fontSize: 14, color: "#8D7B68", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>
              ★ Зразки ресурсів
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
              {["📄 PDF-аркуш", "🎬 Відеоурок", "🧩 Інтерактивна гра", "📋 Набір оцінювання", "🖨 Картки для друку", "📊 Графік прогресу"].map((r) => (
                <div key={r} style={{
                  ...css.sectionCard,
                  textAlign: "center",
                  padding: "20px 14px",
                  cursor: "pointer",
                }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{r.split(" ")[0]}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#5D4E3C" }}>{r.slice(2)}</div>
                  <div style={{
                    marginTop: 10, padding: "5px 12px", borderRadius: 8,
                    background: `${activePlanet.color}15`,
                    border: `1.5px dashed ${activePlanet.color}40`,
                    fontSize: 11, fontWeight: 800, color: activePlanet.color,
                    display: "inline-block",
                  }}>
                    ⬇ Взяти на борт
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ═══════ КАРТА САЙТУ ═══════ */}
      {view === "sitemap" && (
        <div style={css.sitemapContainer}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "#3E2C1C", textAlign: "center", marginBottom: 8 }}>
            🗺 Галактична карта сайту
          </h2>
          <p style={{ textAlign: "center", color: "#8D7B68", fontSize: 14, fontWeight: 600, marginBottom: 32 }}>
            Повна навігаційна архітектура Маленького Всесвіту
          </p>

          {/* корінь */}
          <div style={{
            ...css.sitemapNode(null),
            background: `${craftTexture}, linear-gradient(145deg, #3E2C1C, #5D4037)`,
            color: "#FFD54F",
            border: "3px dashed #FFD54F60",
          }}>
            <span style={{ fontSize: 24 }}>🌌</span>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18, color: "#FFD54F" }}>Маленький Всесвіт — Головна</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Лендінг з планетарною навігацією</div>
            </div>
          </div>

          {/* глобальна навігація */}
          <div style={{ paddingLeft: 32, marginTop: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#B8A89A", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8, marginTop: 16 }}>
              ─── Глобальна навігація ───
            </div>
            {[
              { icon: "🔐", label: "Стикування (Авторизація)", sub: "Вхід / Реєстрація / Вибір ролі" },
              { icon: "🔍", label: "Галактичний пошук", sub: "Глобальний пошук по всіх планетах" },
              { icon: "👤", label: "Посвідчення екіпажу", sub: "Профіль / Налаштування / Підписки" },
              { icon: "📡", label: "Передачі", sub: "Сповіщення / Оновлення" },
              { icon: "☄️", label: "Метеоритний сюрприз", sub: "Генератор випадкових активностей" },
            ].map((n) => (
              <div key={n.label} style={{ ...css.sitemapNode(null), marginLeft: 0 }}>
                <span style={{ fontSize: 20 }}>{n.icon}</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{n.label}</div>
                  <div style={{ fontSize: 12, color: "#8D7B68", fontWeight: 600 }}>{n.sub}</div>
                </div>
              </div>
            ))}

            <div style={{ fontSize: 11, fontWeight: 800, color: "#B8A89A", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8, marginTop: 24 }}>
              ─── Планетарні хаби ───
            </div>
            {PLANETS.map((p) => (
              <div key={p.id}>
                <div style={css.sitemapNode(p)}>
                  <span style={{ fontSize: 24 }}>{p.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: p.color }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#8D7B68", fontWeight: 600 }}>{p.curator}</div>
                  </div>
                </div>
                <div style={{ paddingLeft: 40, marginBottom: 12 }}>
                  {p.sections.map((s) => (
                    <div key={s} style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "6px 12px", marginBottom: 4,
                      borderLeft: `3px dashed ${p.color}40`,
                      fontSize: 13, fontWeight: 600, color: "#5D4E3C",
                    }}>
                      <span style={{ color: p.color, fontSize: 10 }}>★</span> {s}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════ ШЛЯХИ КОРИСТУВАЧА ═══════ */}
      {view === "flows" && (
        <div style={css.flowContainer}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "#3E2C1C", textAlign: "center", marginBottom: 8 }}>
            🔄 Шляхи користувача
          </h2>
          <p style={{ textAlign: "center", color: "#8D7B68", fontSize: 14, fontWeight: 600, marginBottom: 24 }}>
            Подорож спеціаліста vs батька крізь Маленький Всесвіт
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 }}>
            {[
              ["specialist", "🛰 Шлях спеціаліста"],
              ["parent", "🏠 Шлях батька"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFlowTab(key)}
                style={{
                  padding: "10px 24px",
                  borderRadius: 14,
                  border: flowTab === key ? "3px solid #3E2C1C" : "2px dashed rgba(62,44,28,0.2)",
                  background: flowTab === key
                    ? "linear-gradient(135deg, #3E2C1C, #5D4037)"
                    : `${craftTexture}, #FFFDF8`,
                  color: flowTab === key ? "#FFD54F" : "#6D5D4B",
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.25s",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 8 }}>
            {FLOWS[flowTab].map((f, i) => (
              <div key={f.step} style={css.flowStep(i, FLOWS[flowTab].length)}>
                {i < FLOWS[flowTab].length - 1 && <div style={css.flowLine} />}
                <div style={css.flowDot(flowTab === "specialist" ? "#7E57C2" : "#FFB74D")} />
                <div style={css.flowCard}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 20 }}>{f.icon}</span>
                    <span style={{ fontWeight: 800, fontSize: 16, color: "#3E2C1C" }}>{f.step}</span>
                    <span style={{
                      marginLeft: "auto", fontSize: 10, fontWeight: 800,
                      color: "#B8A89A", background: "rgba(62,44,28,0.06)",
                      padding: "2px 8px", borderRadius: 6,
                    }}>
                      Крок {i + 1}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: "#6D5D4B", fontWeight: 600, lineHeight: 1.5 }}>
                    {f.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* порівняння */}
          <div style={{
            marginTop: 40,
            background: `${craftTexture}, linear-gradient(145deg, #FFFDF8, #F5EFE6)`,
            borderRadius: 20, padding: 24,
            border: "3px dashed rgba(62,44,28,0.12)",
          }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#3E2C1C", marginBottom: 16 }}>
              🔍 Ключові відмінності
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, color: "#7E57C2", marginBottom: 8 }}>🛰 Спеціаліст</div>
                <div style={{ fontSize: 13, color: "#5D4E3C", lineHeight: 1.7, fontWeight: 600 }}>
                  • Панель керування за роллю<br/>
                  • Професійні протоколи та оцінювання<br/>
                  • Сертифікація та кредити ПК<br/>
                  • Масове завантаження ресурсів<br/>
                  • Інструменти для колаборації колег
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, color: "#FFB74D", marginBottom: 8 }}>🏠 Батько</div>
                <div style={{ fontSize: 13, color: "#5D4E3C", lineHeight: 1.7, fontWeight: 600 }}>
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

      {/* футер */}
      <footer style={{
        textAlign: "center", padding: "24px 20px 32px",
        borderTop: "3px dashed rgba(62,44,28,0.1)",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#B8A89A" }}>
          🌌 Маленький Всесвіт — Прототип UI/UX стратегії
        </div>
        <div style={{ fontSize: 11, color: "#C4B59B", marginTop: 4 }}>
          Естетика: Кінематографічні 3D-персонажі × DIY Картонний космос
        </div>
      </footer>
    </div>
  );
}
