create table if not exists public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  slug text not null unique,
  created_at timestamptz default now()
);

create table if not exists public.channels (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  category text not null default 'General',
  stream_url text not null,
  logo_url text,
  is_live boolean default true,
  views bigint default 0,
  created_at timestamptz default now()
);

alter table public.categories enable row level security;
alter table public.channels enable row level security;

create policy "categories_read_public"
on public.categories
for select
using (true);

create policy "channels_read_public"
on public.channels
for select
using (true);

create policy "categories_write_admin"
on public.categories
for insert
with check (true);

create policy "channels_write_admin"
on public.channels
for insert
with check (true);

create policy "categories_update_admin"
on public.categories
for update
using (true)
with check (true);

create policy "channels_update_admin"
on public.channels
for update
using (true)
with check (true);

create policy "categories_delete_admin"
on public.categories
for delete
using (true);

create policy "channels_delete_admin"
on public.channels
for delete
using (true);

create index if not exists channels_category_idx on public.channels (category);
create index if not exists channels_slug_idx on public.channels (slug);
