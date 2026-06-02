-- ============================================================
-- Clara's Bakehouse — fix orders_status_check constraint
-- The local DB constraint was created without 'pending' in the
-- allowed list. Drop and recreate it to match the intended
-- schema, then update place_order to set status explicitly.
-- ============================================================

alter table orders
  drop constraint if exists orders_status_check;

alter table orders
  add constraint orders_status_check
  check (status in ('pending', 'confirmed', 'ready', 'collected', 'cancelled'));

-- Recreate place_order with an explicit status = 'pending' so
-- it no longer relies on the column default.
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
  v_order_id uuid;
  v_item     jsonb;
begin
  insert into orders (
    store_id, customer_name, customer_email, customer_phone,
    collection_date, notes, total, status
  )
  values (
    p_store_id, p_customer_name, p_customer_email, p_customer_phone,
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
