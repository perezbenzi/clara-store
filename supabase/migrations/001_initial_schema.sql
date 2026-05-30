-- ============================================================
-- Clara's Bakehouse — initial schema
-- Run in the Supabase SQL editor or via `supabase db push`
-- ============================================================

-- ── Tenants ──────────────────────────────────────────────────

create table tenants (
  id         uuid        default gen_random_uuid() primary key,
  name       text        not null,
  slug       text        not null unique,
  owner_id   uuid        references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

-- ── Content tables ────────────────────────────────────────────
-- Each table carries a `store_id` (FK → tenants.id).
-- `sort_order` lets the admin panel control display order.

create table flavours (
  id          bigserial   primary key,
  store_id    uuid        not null references tenants(id) on delete cascade,
  name        text        not null,
  tag         text,                          -- e.g. "GF", "V"
  price       numeric(10, 2) not null,
  description text        not null default '',
  image_url   text,                          -- URL or hex placeholder e.g. '#C8A882'
  active      boolean     not null default true,
  sort_order  integer     not null default 0,
  created_at  timestamptz default now()
);

create table instore_items (
  id          bigserial   primary key,
  store_id    uuid        not null references tenants(id) on delete cascade,
  name        text        not null,
  locations   text        not null default '',
  description text        not null default '',
  image_url   text,
  sort_order  integer     not null default 0
);

-- Physical store locations (Byron Bay, Bangalow, etc.)
create table stores (
  id             bigserial   primary key,
  store_id       uuid        not null references tenants(id) on delete cascade,
  name           text        not null,
  address        text        not null default '',
  google_maps_url text,
  image_url      text,
  sort_order     integer     not null default 0
);

create table faqs (
  id          bigserial   primary key,
  store_id    uuid        not null references tenants(id) on delete cascade,
  question    text        not null,
  answer      text        not null default '',
  type        text        not null default 'retail'
                check (type in ('retail', 'wholesale')),
  sort_order  integer     not null default 0
);

create table team_members (
  id          bigserial   primary key,
  store_id    uuid        not null references tenants(id) on delete cascade,
  name        text        not null,
  role        text        not null default '',
  image_url   text,
  sort_order  integer     not null default 0
);

-- ── Row Level Security ────────────────────────────────────────

alter table tenants      enable row level security;
alter table flavours     enable row level security;
alter table instore_items enable row level security;
alter table stores       enable row level security;
alter table faqs         enable row level security;
alter table team_members enable row level security;

-- Helper: true when the calling user owns the given tenant
create or replace function is_tenant_owner(tenant_id uuid)
returns boolean
language sql security definer stable
as $$
  select exists (
    select 1 from tenants
    where id = tenant_id
      and owner_id = auth.uid()
  );
$$;

-- Tenants
create policy "Owners can read their tenant"
  on tenants for select using (owner_id = auth.uid());

create policy "Owners can update their tenant"
  on tenants for update using (owner_id = auth.uid());

-- Flavours: public read, owner write
create policy "Flavours are publicly readable"
  on flavours for select using (true);

create policy "Owners can manage flavours"
  on flavours for all
  using (is_tenant_owner(store_id))
  with check (is_tenant_owner(store_id));

-- Instore items
create policy "Instore items are publicly readable"
  on instore_items for select using (true);

create policy "Owners can manage instore items"
  on instore_items for all
  using (is_tenant_owner(store_id))
  with check (is_tenant_owner(store_id));

-- Stores (locations)
create policy "Stores are publicly readable"
  on stores for select using (true);

create policy "Owners can manage stores"
  on stores for all
  using (is_tenant_owner(store_id))
  with check (is_tenant_owner(store_id));

-- FAQs
create policy "FAQs are publicly readable"
  on faqs for select using (true);

create policy "Owners can manage FAQs"
  on faqs for all
  using (is_tenant_owner(store_id))
  with check (is_tenant_owner(store_id));

-- Team members
create policy "Team members are publicly readable"
  on team_members for select using (true);

create policy "Owners can manage team"
  on team_members for all
  using (is_tenant_owner(store_id))
  with check (is_tenant_owner(store_id));

-- ── Storage ───────────────────────────────────────────────────
-- Bucket layout: store-assets/<tenant_id>/<filename>

insert into storage.buckets (id, name, public)
values ('store-assets', 'store-assets', true)
on conflict (id) do nothing;

create policy "Public can read store assets"
  on storage.objects for select
  using (bucket_id = 'store-assets');

create policy "Owners can upload to their folder"
  on storage.objects for insert
  with check (
    bucket_id = 'store-assets'
    and is_tenant_owner((storage.foldername(name))[1]::uuid)
  );

create policy "Owners can update their assets"
  on storage.objects for update
  using (
    bucket_id = 'store-assets'
    and is_tenant_owner((storage.foldername(name))[1]::uuid)
  );

create policy "Owners can delete their assets"
  on storage.objects for delete
  using (
    bucket_id = 'store-assets'
    and is_tenant_owner((storage.foldername(name))[1]::uuid)
  );
