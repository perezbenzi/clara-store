-- ============================================================
-- Clara's Bakehouse — standardise schema
-- ============================================================

-- ── Rename flavours → products ────────────────────────────────
alter table flavours rename to products;

-- ── order_items table ─────────────────────────────────────────
create table order_items (
  id           uuid           default gen_random_uuid() primary key,
  order_id     uuid           not null references orders(id) on delete cascade,
  product_id   bigint         not null references products(id),
  product_name text           not null,
  quantity     int            not null,
  unit_price   numeric        not null
);

-- ── Row Level Security ────────────────────────────────────────

alter table order_items enable row level security;

create policy "Anyone can insert order items"
  on order_items for insert
  with check (true);

create policy "Owners can read their order items"
  on order_items for select
  using (
    exists (
      select 1 from orders o
      join stores s on s.id = o.store_id
      where o.id = order_items.order_id
        and is_tenant_owner(s.store_id)
    )
  );

-- ── Migrate existing orders.items JSON → order_items ─────────
-- orders.items stores: [{ flavour_id, flavour_name, quantity, price }]
insert into order_items (order_id, product_id, product_name, quantity, unit_price)
select
  o.id,
  (item->>'flavour_id')::bigint,
  item->>'flavour_name',
  (item->>'quantity')::int,
  (item->>'price')::numeric
from orders o,
  jsonb_array_elements(o.items) as item
where jsonb_array_length(o.items) > 0;

-- orders.items column is kept but no longer written to by the application.
