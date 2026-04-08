-- Little Universe — initial schema
-- Run this in Supabase SQL editor or via supabase db push

-- ── Enable UUID extension ────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── profiles ─────────────────────────────────────────────────
create table if not exists profiles (
  id               uuid primary key references auth.users(id) on delete cascade,
  email            text not null,
  role             text not null check (role in ('specialist', 'parent')),
  name             text,
  avatar_url       text,
  subscription_tier text not null default 'free' check (subscription_tier in ('free', 'basic', 'premium')),
  created_at       timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

-- ── resources ─────────────────────────────────────────────────
create table if not exists resources (
  id          uuid primary key default uuid_generate_v4(),
  planet_id   text not null,
  title       text not null,
  description text,
  type        text not null check (type in ('pdf', 'video', 'interactive')),
  url         text not null,
  age_min     int not null default 3,
  age_max     int not null default 7,
  is_free     boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table resources enable row level security;

create policy "Anyone can view free resources"
  on resources for select using (is_free = true);

create policy "Authenticated users can view all resources"
  on resources for select using (auth.role() = 'authenticated');

-- ── favorites ─────────────────────────────────────────────────
create table if not exists favorites (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references profiles(id) on delete cascade,
  resource_id uuid not null references resources(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (user_id, resource_id)
);

alter table favorites enable row level security;

create policy "Users can manage own favorites"
  on favorites for all using (auth.uid() = user_id);

-- ── child_progress ────────────────────────────────────────────
create table if not exists child_progress (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references profiles(id) on delete cascade,
  resource_id  uuid not null references resources(id) on delete cascade,
  completed_at timestamptz not null default now(),
  score        int check (score between 0 and 100)
);

alter table child_progress enable row level security;

create policy "Users can manage own progress"
  on child_progress for all using (auth.uid() = user_id);

-- ── surprise_log ──────────────────────────────────────────────
create table if not exists surprise_log (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references profiles(id) on delete cascade,
  resource_id uuid not null references resources(id) on delete cascade,
  shown_at    timestamptz not null default now()
);

alter table surprise_log enable row level security;

create policy "Users can manage own surprise log"
  on surprise_log for all using (auth.uid() = user_id);
