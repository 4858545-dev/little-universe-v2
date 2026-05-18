# Little Universe — Маленький Всесвіт

> ⚠️ This is a NEW project. Previous repo (NeuroPath_365 / little-universe v1) is SEPARATE.
> Do NOT reference or import code from any previous repositories.

---

## Project overview

**Little Universe** — дитячий освітній центр-платформа для дітей 3–7 років, батьків та спеціалістів (логопедів, психологів, педагогів). PWA на темно-космічному тлі з 4 персонажами-космонавтами, 7 планетами-секторами і системою уроків через казку та гру.

**Repo:** (новий GitHub repo)
**Stack:** React 18 + Vite PWA · Zustand · CSS Modules · state-based routing
**Backend (in progress):** Supabase ✓ · Stripe · Cloudflare R2 · Brevo · PostHog

---

## Design system (STRICT — never deviate)

### Fonts
```css
--f-display: 'Comfortaa', cursive;   /* заголовки, кнопки, імена персонажів */
--f-body:    'Nunito', sans-serif;   /* весь body-текст */
```

### Color tokens
```css
/* Backgrounds — dark cosmic */
--navy:   #050b1e;
--navy-2: #0a1228;
--navy-3: #0f1a38;
--navy-4: #162045;
--navy-5: #1e2d5e;

/* Brand accents */
--gold:         #f4b942;
--gold-glow:    rgba(244,185,66,.22);
--gold-soft:    rgba(244,185,66,.10);
--purple:       #7b6ef6;
--purple-glow:  rgba(123,110,246,.25);
--purple-soft:  rgba(123,110,246,.10);
--teal:         #34d4c8;
--teal-glow:    rgba(52,212,200,.20);
--coral:        #ff7b68;
--coral-glow:   rgba(255,123,104,.20);
--blue:         #5c8fff;
--green:        #4fd9a0;
--mint:         #7ef5e4;

/* Text */
--text:   #e8edf8;
--text-2: #9ba8cc;
--text-3: #5d6a8a;

/* Borders */
--border:   rgba(255,255,255,.07);
--border-2: rgba(255,255,255,.13);
```

### Character colors
```css
/* Лумі (Лисичка) — творчість, казки */
--lumi-color:    #ff7b68;
--lumi-gradient: linear-gradient(135deg, #c04020, #7a1808);

/* Орбіта (Коза) — грамота, письмо */
--orbita-color:    #7b6ef6;
--orbita-gradient: linear-gradient(135deg, #5240d0, #2a1890);

/* Зоркс (Зірка) — математика, логіка */
--zorx-color:    #f4b942;
--zorx-gradient: linear-gradient(135deg, #d4940a, #a06000);

/* Марік (Інопланетянин) — STEM, наука */
--marik-color:    #4fd9a0;
--marik-gradient: linear-gradient(135deg, #18806a, #085040);
```

### Typography scale
| Role   | Font      | Size  | Weight | Usage                |
|--------|-----------|-------|--------|----------------------|
| Hero   | Comfortaa | 64px  | 700    | Hero section only    |
| H1     | Comfortaa | 48px  | 700    | Page titles          |
| H2     | Comfortaa | 36px  | 700    | Section titles       |
| H3     | Comfortaa | 24px  | 700    | Card titles          |
| H4     | Comfortaa | 18px  | 600    | Subtitles            |
| Lead   | Nunito    | 18px  | 600    | Intro, --text-2      |
| Body   | Nunito    | 16px  | 400    | Main text, lh:1.75   |
| Small  | Nunito    | 14px  | 400    | Captions             |
| Label  | Nunito    | 11px  | 700    | Tags, UPPERCASE      |

---

## Characters (4 heroes — екіпаж «Little Universe»)

### 1. Лисичка Лумі (Lumi) 🦊
- **Напрям:** Творчість, казки, арт-терапія, креативність
- **Планета:** Мистецтво-Люмі (bottom-right на карті)
- **Девіз:** «Кожна дитина — як маленька зірка»
- **Характер:** Допитлива мрійниця, подорожує Всесвітом у пошуках ідей. Підтримує дітей у творчих завданнях, допомагає не боятися помилок
- **Зовнішність:** Повненька лисичка, великий пухнастий хвіст (схожа на лиса з «Зоотрополіса»). Білий скафандр у плямах фарби, луноботи. Носить намиста, гердани та браслети поверх скафандра
- **Стиль скафандру:** DIY — ніби зроблений з картонних коробок і розмальований фломастерами
- **Color:** `--lumi-color` (#ff7b68)

### 2. Коза Орбіта (Orbita) 🐐
- **Напрям:** Грамота, читання, підготовка руки до письма, мовлення
- **Планета:** Лого-Орбіта (top-left на карті)
- **Девіз:** «Кожна історія — це подорож до нової галактики»
- **Характер:** Навігаторка сюжетів і текстів. Супроводжує дітей у казкових подорожах, допомагає з читанням і мовленням
- **Зовнішність:** Висока, худюча, біло-сіра (або повністю біла з сірою плямкою). Невеличкі гострі ріжки. Шолом космонавта зроблений з урахуванням ріжок. Скафандр і луноботи єдиного стилю з Лумі
- **Color:** `--orbita-color` (#7b6ef6)

### 3. Зірка Зоркс (Zorx) 🌟
- **Напрям:** Математика, логіка, просторове мислення, послідовності
- **Планета:** Логіка-Зоркс (top-right на карті)
- **Девіз:** «Кожна задача має своє правильне рішення»
- **Характер:** Експерт із точних наук. Спокійний, зосереджений, теплий. Допомагає з рахунком, порівнянням, логічними вправами
- **Зовнішність:** Яскрава жовта п'ятикутна зірка з довгим помаранчево-жовтим хвостом комети. Стильні окуляри м'ятного кольору (бірюзові). Затишна ковдра/плащ
- **Color:** `--zorx-color` (#f4b942)

### 4. Інопланетянин Марік (Marik) 👽
- **Напрям:** Фізика, хімія, природничі науки, STEM-досліди
- **Планета:** STEM-Марік (bottom-left на карті)
- **Планета походження:** Наука-7
- **Девіз:** «Наука відкриває таємниці Всесвіту»
- **Характер:** Дослідник, знайомить дітей з науками через досліди і спостереження. Доброзичливий, допитливий
- **Зовнішність:** Невисокий, салатного кольору в темно-зелених плямках. Дві руки, дві ноги. Три ока на довгих рухливих вусиках-промінчиках. Широка усмішка з двома широко поставленими зубами
- **Color:** `--marik-color` (#4fd9a0)

---

## App screens (state-based routing — NO React Router)

```
AppShell
├── OnboardingScreen       — вибір персонажа-напарника
├── HomeScreen             — дашборд, монети, тижневий квест
├── AdventureMapScreen     — 7 планет-секторів + центральний хаб
├── CourseScreen           — список квестів планети
├── LessonScreen           — активний урок з вправами
├── SpecialistScreen       — розділ для спеціалістів (логопеди, психологи)
├── ParentsScreen          — розділ для батьків
├── ProfileScreen          — профіль дитини, прогрес, медалі
└── ShopScreen             — курси, PDF, вебінари
```

---

## Adventure Map — 7 planets

```
         [Орбіта — Грамота]      [Зоркс — Математика]
               (top-left)              (top-right)

  [Домашня станція]    ★ ХАБ ★    [Навчальний центр]
      (mid-left)                       (mid-right)

         [Марік — STEM]         [Лумі — Творчість]
              (bottom-left)          (bottom-right)

                    [Космодром знань]
                        (bottom-center)
```

### Планети:
| ID | Назва | Куратор | Напрям | Колір |
|----|-------|---------|--------|-------|
| `orbita` | Лого-Орбіта | Орбіта | Грамота, письмо | --orbita-color |
| `zorx` | Логіка-Зоркс | Зоркс | Математика, логіка | --zorx-color |
| `lumi` | Мистецтво-Люмі | Лумі | Творчість, казки | --lumi-color |
| `marik` | STEM-Марік | Марік | Наука, хімія, фізика | --marik-color |
| `home-station` | Домашня станція | — | Батьки, поради | --gold |
| `learning-center` | Навчальний центр | — | Вебінари, сертифікати | --purple |
| `cosmodrome` | Космодром знань | — | ПДШ преміум | --blue |

### MVP: тільки Лумі і Марік розблоковані. Решта — locked.

---

## Gamification

### Монети — «Юніки» (Universe coins)
- Нараховуються за виконані уроки та квести
- Зберігаються в Zustand store (persist localStorage)
- Відображаються у top nav: 🪙 N

### Метеоритний сюрприз (Meteor Surprise button)
- Дрейфуючий метеорит у кутку екрана
- При кліку — випадковий безкоштовний PDF або «активність дня»
- Анімація: метеорит розкривається і випадає нагорода

### Зірочки-кнопки навігації
- Різнокольорові зірки як кнопки категорій (PDF, відео, казки)
- Кожен колір відповідає персонажу або напряму

### Космічний мікрокопі (UI strings)
```js
const COPY = {
  login: 'Стикування',
  download: 'Привезти на борт',
  learning: 'Оновлення екіпажу',
  search: 'Галактичне сканування',
  loading: 'Запуск двигунів...',
  complete: 'Місію виконано!',
  locked: 'Сектор зачинено',
  start: 'Розпочати місію',
}
```

---

## Zustand store shape

```ts
interface AppState {
  // Navigation
  screen: ScreenName;
  screenParams: Record<string, unknown>;
  navigate: (screen: ScreenName, params?) => void;

  // User
  childName: string;
  childAge: number;
  companion: 'lumi' | 'orbita' | 'zorx' | 'marik' | null;
  coins: number;

  // Progress
  completedLessons: string[];
  lessonProgress: Record<string, number>;

  // UI
  rewardVisible: boolean;
  rewardData: { title: string; coins: number; character: string } | null;
  showReward: (data) => void;
  hideReward: () => void;

  // Meteor surprise
  meteorSurpriseUsed: boolean;
  setMeteorUsed: () => void;
}
```

---

## Content structure

### Lesson JSON format
```json
{
  "id": "string",
  "title": "string",
  "character": "lumi | orbita | zorx | marik",
  "subject": "string",
  "planet": "string",
  "xpReward": 15,
  "steps": [
    { "type": "intro", "text": "string" },
    { "type": "match", "instruction": "string", "pairs": [] },
    { "type": "choice", "question": "string", "options": [], "correct": 0 },
    { "type": "trace", "letter": "string" },
    { "type": "pdf", "title": "string", "fileUrl": "string" },
    { "type": "audio", "title": "string", "audioUrl": "string" }
  ]
}
```

### MVP lessons (Фаза 1):
- `literacy-01.json` — Орбіта: «Звуковий орнамент» (голосні/приголосні)
- `chemistry-01.json` — Марік: «Крижинкова пригода» (агрегатні стани)
- `chemistry-02.json` — Марік+Лумі: «Чарівні кольори» (змішування фарб)
- `math-01.json` — Зоркс: «Цифрові сузір'я» (рахунок 1–10)
- `creative-01.json` — Лумі: «Казка власноруч» (сторітелінг)

---

## Component library

```
src/components/
├── ui/
│   ├── Button.jsx           — gold, purple, teal, ghost, danger; sm/md/lg
│   ├── Badge.jsx            — gold, purple, teal, coral, mint
│   ├── Card.jsx             — with glow variant
│   ├── ProgressBar.jsx      — animated gradient fill
│   ├── Toast.jsx            — success, reward, info
│   ├── Input.jsx            — label + error state
│   └── Modal.jsx            — blurred overlay
├── characters/
│   ├── CharacterAvatar.jsx  — size prop, conic border animation
│   ├── CharacterCard.jsx    — onboarding card
│   └── SpeechBubble.jsx     — bubble з стрілкою
├── map/
│   ├── StarField.jsx        — canvas animated stars (280 stars)
│   ├── OrnamentRings.jsx    — 3 rotating dashed rings
│   ├── PlanetNode.jsx       — orb + SVG progress ring + popup
│   ├── ConnectorLines.jsx   — SVG dashed lines hub→planets
│   └── MeteorSurprise.jsx   — floating meteor button
├── lesson/
│   ├── ExerciseMatch.jsx    — tap-to-pair matching
│   ├── ExerciseChoice.jsx   — multiple choice A/B/C/D
│   ├── ExerciseTrace.jsx    — canvas letter tracing
│   ├── ExercisePDF.jsx      — download + photo upload
│   ├── ExerciseAudio.jsx    — audio player + question
│   └── RewardOverlay.jsx    — celebration screen
└── specialist/
    ├── WebinarCard.jsx      — вебінар картка
    └── CertificateCard.jsx  — сертифікат
```

---

## File structure

```
src/
├── components/
├── screens/
│   ├── OnboardingScreen.jsx
│   ├── HomeScreen.jsx
│   ├── AdventureMapScreen.jsx
│   ├── CourseScreen.jsx
│   ├── LessonScreen.jsx
│   ├── SpecialistScreen.jsx
│   ├── ParentsScreen.jsx
│   ├── ProfileScreen.jsx
│   └── ShopScreen.jsx
├── store/
│   └── useAppStore.js
├── content/
│   └── lessons/
│       ├── literacy-01.json
│       ├── chemistry-01.json
│       ├── chemistry-02.json
│       ├── math-01.json
│       └── creative-01.json
├── styles/
│   └── theme.css            — all CSS tokens (source of truth)
├── assets/
│   └── characters/          — character SVG/PNG files
└── App.jsx                  — AppShell + screen router

public/
└── pdfs/                    — workbook PDFs for download
    ├── chemistry-01.pdf
    └── chemistry-02.pdf

docs/
└── content/                 — source files from methodist
    ├── Перше заняття.docx
    ├── Хімія.docx
    └── Методика ПДШ.docx
```

---

## Coding conventions

- CSS Modules для всіх компонентів (`Component.module.css`)
- Немає Tailwind, немає styled-components
- Всі кольори через CSS variables з `theme.css`
- Шрифти: Comfortaa для заголовків/кнопок, Nunito для body
- Весь user-facing текст українською
- `px` для фіксованих розмірів, `clamp()` для responsive typography
- Анімації: тільки CSS `@keyframes`, без JS animation libraries
- `will-change: transform` на анімованих елементах
- Немає `position: fixed` крім overlay-модалів

## Animation rules
- Entry: `fadeInUp` — opacity 0→1 + translateY 16px→0, 0.4s
- Stagger: `animation-delay: calc(var(--i) * 0.08s)`
- Hover cards: `transform: translateY(-3px)`
- Hover planets: `scale(1.08)`
- Reward pop: `scale(0.7)→scale(1)` cubic-bezier(.34,1.56,.64,1)
- Meteor float: повільна синусоїда вліво-вправо, 4s loop
- Завжди: `@media (prefers-reduced-motion: reduce)`

---

## Build priority order

**Сесія 1:**
1. `theme.css` — всі токени (перенести з v1, оновити character colors)
2. `useAppStore.js` — Zustand з новими персонажами і 7 планетами
3. `App.jsx` — screen router
4. UI kit: Button, Badge, Card, ProgressBar, Toast

**Сесія 2:**
5. `CharacterAvatar` + `CharacterCard` — нові персонажі
6. `AdventureMapScreen` — 7 планет, StarField, OrnamentRings, MeteorSurprise
7. `OnboardingScreen` — вибір з 4 персонажів

**Сесія 3:**
8. `LessonScreen` + `ExerciseMatch` + `ExerciseChoice` + `RewardOverlay`
9. `CourseScreen`
10. JSON уроки: `chemistry-01.json`, `literacy-01.json`

**Сесія 4:**
11. `HomeScreen` з дашбордом
12. PWA конфіг (vite-plugin-pwa, маніфест, іконки)
13. Шрифти Google Fonts в `index.html`

**Сесія 5:**
14. `ParentsScreen` — розділ для батьків
15. `SpecialistScreen` — розділ для логопедів/психологів/педагогів
16. `WebinarCard` + `CertificateCard`

---

## DO NOT

- Використовувати React Router (тільки state-based routing)
- Використовувати Tailwind або будь-який CSS framework
- Хардкодити hex кольори в компонентах (завжди CSS variables)
- Використовувати шрифти Inter, Roboto, Arial
- Фіолетові градієнти на білому фоні
- Окремі CSS файли для кольорів (тільки `theme.css`)
- Встановлювати зайві залежності
- Ігнорувати мобільну адаптацію (mobile-first, breakpoint 768px)

## CHECK before every commit

- [ ] Всі кольори з CSS variables
- [ ] Comfortaa для заголовків/кнопок, Nunito для body
- [ ] Анімації мають `prefers-reduced-motion` fallback
- [ ] Весь текст українською
- [ ] Кожен компонент має власний `.module.css`
- [ ] Немає хардкодованих hex кольорів або шрифтів

---

## Current status

**Completed:**
- Сесія 1–3: theme.css, useAppStore, App.jsx, UI kit, AdventureMapScreen, OnboardingScreen, PlanetDetailScreen, character assets
- Supabase setup: @supabase/supabase-js installed, src/lib/supabase.js, .env.local, supabase/migrations/001_initial_schema.sql

**In progress:**
- Step 4: Content system — useResources hook, real Supabase resources in planet detail view ✓

**Next session:**
- Stripe integration for subscription tiers
- Profile creation on register (insert into profiles table)
- Seed real resources into Supabase for all planets

**Characters in store:**
`companion: 'lumi' | 'orbita' | 'zorx' | 'marik' | null`

**Planets in store:**
`['orbita', 'zorx', 'lumi', 'marik', 'home-station', 'learning-center', 'cosmodrome']`

**MVP unlocked planets:** `lumi`, `marik`

---

## Current Sprint: Step 5 — Progress & Gamification

Status: IN PROGRESS

Goals:
- useProgressStore (Zustand + localStorage persist) — tracks completed resources, coins
- Progress dashboard on Домашня Станція planet
- Coins awarded per downloaded resource (+10 🪙)
- Meteor surprise connected to real resources

Completed so far:
- Social icons (Instagram, Telegram) added to footer ✅
- "Козочка" renamed to "Кізонька" everywhere ✅
