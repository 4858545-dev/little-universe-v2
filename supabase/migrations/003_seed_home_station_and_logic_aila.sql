-- Seed: Домашня Станція (home-station) — free PDF resources
insert into resources (planet_id, title, description, type, url, age_min, age_max, is_free)
values
  (
    'home-station',
    'Зріз знань',
    'Бортова інструкція оцінювання рівня знань перед вступом до школи',
    'pdf',
    'https://qxdwkhfjpjaqihvzyvzh.supabase.co/storage/v1/object/public/resources/Zriz_znan_(bortova_instrukcia).pdf',
    5, 7, true
  ),
  (
    'home-station',
    'Емерджентне читання',
    'Бортова інструкція знайомства з казками, читання та ігор з ними',
    'pdf',
    'https://qxdwkhfjpjaqihvzyvzh.supabase.co/storage/v1/object/public/resources/Emerjentne_chitannia_(bortova_instrukcsa).pdf',
    3, 7, true
  )
on conflict do nothing;

-- Seed: Логіка-Айла (logic-aila) — free PDF resources
insert into resources (planet_id, title, description, type, url, age_min, age_max, is_free)
values
  (
    'logic-aila',
    'Загублені тіні',
    'Знайти кому належить тінь і з''єднати лінією',
    'pdf',
    'https://qxdwkhfjpjaqihvzyvzh.supabase.co/storage/v1/object/public/resources/Zagubleni_tini.pdf',
    3, 7, true
  ),
  (
    'logic-aila',
    'Космічна заправка',
    'Написати літери і зафарбувати відповідним кольором кабіни космічних тарілок',
    'pdf',
    'https://qxdwkhfjpjaqihvzyvzh.supabase.co/storage/v1/object/public/resources/Kosmichna_zapravka_(tsifry).pdf',
    3, 7, true
  ),
  (
    'logic-aila',
    'Обведи зірочку',
    'Визначити якої зірочки не вистачає',
    'pdf',
    'https://qxdwkhfjpjaqihvzyvzh.supabase.co/storage/v1/object/public/resources/Obvedy_zirochku.pdf',
    3, 7, true
  ),
  (
    'logic-aila',
    'Сонячна система',
    'Аплікація',
    'pdf',
    'https://qxdwkhfjpjaqihvzyvzh.supabase.co/storage/v1/object/public/resources/Soniachna_systema_(aplikatsia).pdf',
    3, 7, true
  ),
  (
    'logic-aila',
    'Стежка з астероїдів',
    'Проставити пропущені цифри на астероїдах',
    'pdf',
    'https://qxdwkhfjpjaqihvzyvzh.supabase.co/storage/v1/object/public/resources/Stejka_z_asteroidiv_(tsifry).pdf',
    3, 7, true
  ),
  (
    'logic-aila',
    'Чарівні лінії',
    'Провести лінії від зірочки до планети',
    'pdf',
    'https://qxdwkhfjpjaqihvzyvzh.supabase.co/storage/v1/object/public/resources/Chervoni_linii.pdf',
    3, 7, true
  )
on conflict do nothing;
