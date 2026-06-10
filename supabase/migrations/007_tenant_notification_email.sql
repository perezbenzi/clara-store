-- ============================================================
-- Clara's Bakehouse — merchant notification email
-- Adds tenants.notification_email and has place_order return it
-- (alongside the new order id) so the checkout server action can
-- email the merchant when a new order comes in.
--
-- place_order becomes security definer + fixed search_path so it
-- can read tenants.notification_email even though tenants' RLS
-- only allows owners to select their own row.
-- ============================================================

alter table tenants
  add column if not exists notification_email text;

drop function if exists place_order(bigint, text, text, text, date, text, numeric, jsonb);

create function place_order(
  p_store_id        bigint,
  p_customer_name   text,
  p_customer_email  text,
  p_customer_phone  text,
  p_collection_date date,
  p_notes           text,
  p_total           numeric,
  p_items           jsonb
)
returns table(order_id uuid, notification_email text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order_id            uuid;
  v_tenant_id           uuid;
  v_item                jsonb;
  v_notification_email  text;
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

  select t.notification_email into v_notification_email
  from tenants t
  where t.id = v_tenant_id;

  return query select v_order_id, v_notification_email;
end;
$$;

grant execute on function place_order(bigint, text, text, text, date, text, numeric, jsonb) to anon;
