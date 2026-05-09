import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env.local since dotenv/config only loads .env
const envPath = resolve(__dirname, '../.env.local')
try {
  const lines = readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const val = trimmed.slice(eq + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
} catch {
  // .env.local may not exist in CI
}

const supabaseUrl = process.env.VITE_SUPABASE_URL
// Service role key bypasses RLS — required for seeding. Fall back to anon only if missing.
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or VITE_SUPABASE_ANON_KEY)')
  process.exit(1)
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('Warning: SUPABASE_SERVICE_ROLE_KEY not set — using anon key, will fail if RLS blocks inserts.')
}

const supabase = createClient(supabaseUrl, supabaseKey)

const records = [
  // ABOUT CREW — паспорти
  { planet_id: 'about-crew', title: 'Паспорт Маріка — опис', description: 'Опис персонажа Марік, член бортової команди', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1m9JzW4cgUK7neQJovJWcV7ZLp9jHr-32/view?usp=drive_link' },
  { planet_id: 'about-crew', title: 'Паспорт Маріка — фото', description: 'Фото персонажа Марік', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1xQ3-awbsSRy5G8cxSYXVy8sTYfNdcsO0/view?usp=drive_link' },
  { planet_id: 'about-crew', title: 'Паспорт Айли — опис', description: 'Опис персонажа Айла, член бортової команди', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1Ix1DAT78J0l6szaw8S-UPJC32QdSC_In/view?usp=drive_link' },
  { planet_id: 'about-crew', title: 'Паспорт Айли — фото', description: 'Фото персонажа Айла', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1RLaHQ7b-CsVAjjkyMkDW1-6-bTOkT-oc/view?usp=drive_link' },
  { planet_id: 'about-crew', title: 'Паспорт Ламбі — опис', description: 'Опис персонажа Ламбі, член бортової команди', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1IVZoIGiMRrA1XkJ8bqijwuPH5ROJWdxi/view?usp=drive_link' },
  { planet_id: 'about-crew', title: 'Паспорт Ламбі — фото', description: 'Фото персонажа Ламбі', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1D4c4JcXj7zR8nMm3jQzhHctr70iaZgEC/view?usp=drive_link' },
  { planet_id: 'about-crew', title: 'Паспорт Люмі — опис', description: 'Опис персонажа Люмі, член бортової команди', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1gmvV8d8tUWdjQhmpQxeSCWTYy3kG64Zp/view?usp=drive_link' },
  { planet_id: 'about-crew', title: 'Паспорт Люмі — фото', description: 'Фото персонажа Люмі', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1q8J7DYcl_OZ96p1MlSe1vAItLsHMv-EY/view?usp=drive_link' },
  { planet_id: 'about-crew', title: 'Паспорт Орбіти — опис', description: 'Опис персонажа Орбіта, член бортової команди', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1UKumwvN5m2eb8cBX0v7SXUNKHrQHZNMz/view?usp=drive_link' },
  { planet_id: 'about-crew', title: 'Паспорт Орбіти — фото', description: 'Фото персонажа Орбіта', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/18292ZGdFiyYSTeE5nzoT5kiJu-HPcrOs/view?usp=drive_link' },

  // STEM-MARIK
  { planet_id: 'stem-marik', title: 'Загадкові плями Місяця', description: 'Творче завдання', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/17Vv8v1j34aIFatfXArRPniCJngRbTpul/view?usp=drive_link' },
  { planet_id: 'stem-marik', title: 'Космічне сміття', description: 'Комікс + створення історії', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1VFVmCm4imzb0hxt4FugZcG0RkyX69DQC/view?usp=drive_link' },

  // LOGIC-AILA
  { planet_id: 'logic-aila', title: 'Космічна одісея Зіркарихи та Комети', description: 'Інтерактивна вистава', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1EV7HBfJvDWU7cxjJp5v6ENTSUZDOcboQ/view?usp=drive_link' },

  // LAMBI-HERITAGE
  { planet_id: 'lambi-heritage', title: 'Казка Хмаринка', description: 'Присвячена Борщівській вишиванці', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1xKdUy3NW3V9slWttSBSBDZfaAyDRhcUF/view?usp=drive_link' },
  { planet_id: 'lambi-heritage', title: 'День Вишиванки (3-4 роки)', description: 'Бортова інструкція: завдання + методика', age_min: 3, age_max: 4, url: 'https://drive.google.com/file/d/15yyhWrIw32oB_4JZjCW03raC5zKR5mEu/view?usp=drive_link' },
  { planet_id: 'lambi-heritage', title: 'День Вишиванки (5-6 років)', description: 'Бортова інструкція: завдання + методика', age_min: 5, age_max: 6, url: 'https://drive.google.com/file/d/1doa2A2WtttrCyfz419VS9khJIV4Doob5/view?usp=drive_link' },
  { planet_id: 'lambi-heritage', title: 'Казка Ламбі і Зачарований Млин', description: 'Присвячена рецепту паски', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1ZpZ6FsX7pxf4MkfDk6OKf_wvjYKT0Oq4/view?usp=drive_link' },
  { planet_id: 'lambi-heritage', title: 'Великодня пригода', description: 'Бортова інструкція: завдання + методика', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1dOoKPv0dNYEUfSoksfgqHU0GLnGFcvQS/view?usp=drive_link' },

  // ART-LUMI
  { planet_id: 'art-lumi', title: 'Емоції — вогники', description: 'Розпізнавання сигналів тіла до того, як емоція «вибухне»', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1--ZTGMV4FnY4T-QIjnWed4V5vTwsTU3P/view?usp=drive_link' },
  { planet_id: 'art-lumi', title: 'Гардероб настрою', description: 'Про те, як ми проявляємо себе зовні, коли нам по-різному всередині', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1EMldfchlZwbd9C8cgzLMThE1trxcQzKr/view?usp=drive_link' },
  { planet_id: 'art-lumi', title: 'Квітник емоцій', description: 'Переносимо людські почуття на природу (антропоморфізм), розвиває емпатію', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1zgK5l26ARP7wbceSSZEbbqslh6hzBSdI/view?usp=drive_link' },
  { planet_id: 'art-lumi', title: 'Колючий настрій', description: 'Злість — це просто захист, і під нею завжди є місце для ніжних почуттів', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1WH4Imw-oycIAL1E85pzzxVLphO-dn5ne/view?usp=drive_link' },

  // MARIK-NATURE
  { planet_id: 'marik-nature', title: 'Шукачі скарбів — рослини', description: 'Аркуш для предметів, які треба знайти на прогулянці', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1CHyzEPPM01d_CqJV7hP_IEuiO9KTLZfe/view?usp=drive_link' },
  { planet_id: 'marik-nature', title: 'Шукачі скарбів — комахи', description: 'Аркуш для комах, які треба знайти на прогулянці', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1SSxDEg-_ZAKmSaPpBFYBS-1fC4Buhl2n/view?usp=drive_link' },
  { planet_id: 'marik-nature', title: 'Тиждень погоди та одягу', description: 'Календар погоди графічний', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/15tdr3cJ10gnhG946Ng9dNFo_A0K7T3Eo/view?usp=drive_link' },
  { planet_id: 'marik-nature', title: 'Кольори веселки', description: 'Аркуш для закріплення предметів всіх кольорів веселки', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1PIplzB4Y8_NQxhT0ZCOTfft7YaEUWaLc/view?usp=drive_link' },
  { planet_id: 'marik-nature', title: 'Природничий архітектор', description: 'Аркуш з будинками мешканців лісу/парку', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1ektMtG0VVnEYDRYBNUyzqZUyD2qp8ndM/view?usp=drive_link' },
  { planet_id: 'marik-nature', title: 'Дослідник мови тварин (Етолог)', description: 'Аркуш з тваринами — намалювати нотки чи обвести тваринку яку почуєш', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1cGUrcr-KA4hJuQaNIyQtOqHRHQUnREYc/view?usp=drive_link' },
  { planet_id: 'marik-nature', title: 'Планета на дотик (сенсорний детектив)', description: "Знайти об'єкт і обвести: камінь, вода, кора тощо", age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1I8WhmEVsXOtO3bhXM1pC4eZ3fyV8JZ85/view?usp=drive_link' },
  { planet_id: 'marik-nature', title: 'Титульний для Альбома Дослідника', description: 'Обкладинка альбому дослідника природи', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1JCKBYVnx6Nk9K_-uKKuQ9GXVjWvRPPp7/view?usp=drive_link' },

  // LOGO-ORBIT
  { planet_id: 'logo-orbit', title: 'Пан Коцький', description: 'Скласти казку по картинках', age_min: 3, age_max: 6, url: 'https://drive.google.com/file/d/1mwnOiJyjbAroBtFglp0yuFIF2Tmxup-l/view?usp=drive_link' },
]

const rowsWithIds = records.map(r => ({
  id: crypto.randomUUID(),
  type: 'pdf',
  is_free: true,
  ...r,
}))

const { data, error } = await supabase
  .from('resources')
  .upsert(rowsWithIds, { onConflict: 'id' })

if (error) {
  console.error('Seed failed:', error.message)
  process.exit(1)
}

console.log(`Seeded ${rowsWithIds.length} resources successfully.`)
