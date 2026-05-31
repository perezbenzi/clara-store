-- ============================================================
-- Clara's Bakehouse — orders table
-- ============================================================
-- store_id references stores(id) which is bigserial, not uuid.

create table orders (
  id              uuid           default gen_random_uuid() primary key,
  created_at      timestamptz    default now(),
  store_id        bigint         not null references stores(id),
  customer_name   text           not null,
  customer_email  text           not null,
  customer_phone  text           not null,
  collection_date date           not null,
  notes           text,
  items           jsonb          not null default '[]',
  total           numeric(10, 2) not null,
  status          text           not null default 'pending'
                  check (status in ('pending', 'confirmed', 'ready', 'collected', 'cancelled'))
);

-- ── Row Level Security ────────────────────────────────────────

alter table orders enable row level security;

-- Customers can place orders via the server-side anon client
create policy "Anyone can place an order"
  on orders for insert
  with check (true);

-- Store owners can read orders for their locations
create policy "Owners can read their store orders"
  on orders for select
  using (
    exists (
      select 1 from stores s
      where s.id = orders.store_id
        and is_tenant_owner(s.store_id)
    )
  );

-- Store owners can update order status
create policy "Owners can update their store orders"
  on orders for update
  using (
    exists (
      select 1 from stores s
      where s.id = orders.store_id
        and is_tenant_owner(s.store_id)
    )
  );
