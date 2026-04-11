-- Seed: Marik planet — Бортова інструкція 4-6 years PDF
insert into resources (planet_id, title, description, type, url, age_min, age_max, is_free)
values (
  'marik',
  'Бортова інструкція: STEM-пригоди (4-6 років)',
  'Робочий зошит з експериментами та STEM-активностями для дітей 4-6 років',
  'pdf',
  'https://qxdwkhfjpjaqihvzyvzh.supabase.co/storage/v1/object/public/resources/bortova-instrukciya-4-6.pdf',
  4,
  6,
  true
)
on conflict do nothing;
