-- ============================================================
-- Clara's Bakehouse — add tenant_id to orders, populate via
-- stores.store_id (the tenant UUID FK, confusingly named).
-- ============================================================

-- Add the column if it was not already created in the dashboard.
alter table orders
  add column if not exists tenant_id uuid references tenants(id);

-- Backfill any existing rows that have tenant_id = NULL.
update orders o
set tenant_id = s.store_id          -- stores.store_id is the tenant UUID
from stores s
where s.id = o.store_id
  and o.tenant_id is null;

-- Recreate place_order to look up and insert tenant_id.
create or replace function place_order(
  p_store_id        bigint,
  p_customer_name   text,
  p_customer_email  text,
  p_customer_phone  text,
  p_collection_date date,
  p_notes           text,
  p_total           numeric,
  p_items           jsonb
)
returns uuid
language plpgsql
as $$
declare
  v_order_id  uuid;
  v_tenant_id uuid;
  v_item      jsonb;
begin
  -- Resolve tenant from the physical store row.
  select store_id into v_tenant_id      -- stores.store_id = tenant UUID
  from stores
  where id = p_store_id;

  if v_tenant_id is null then
    raise exception 'No tenant found for store_id=%', p_store_id;
  end if;

  insert into orders (
    store_id, tenant_id,
    customer_name, customer_email, customer_phone,
    collection_date, notes, total, status
  )
  values (
    p_store_id, v_tenant_id,
    p_customer_name, p_customer_email, p_customer_phone,
    p_collection_date, p_notes, p_total, 'pending'
  )
  returning id into v_order_id;

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    insert into order_items (order_id, product_id, product_name, quantity, unit_price)
    values (
      v_order_id,
      (v_item->>'product_id')::bigint,
      v_item->>'product_name',
      (v_item->>'quantity')::int,
      (v_item->>'unit_price')::numeric
    );
  end loop;

  return v_order_id;
end;
$$;

grant execute on function place_order(bigint, text, text, text, date, text, numeric, jsonb) to anon;
