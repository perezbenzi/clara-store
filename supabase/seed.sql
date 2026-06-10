-- ============================================================
-- Clara's Bakehouse — seed data
--
-- HOW TO USE:
-- 1. Run 001_initial_schema.sql first
-- 2. Create your admin user in Supabase Auth (Dashboard → Authentication)
-- 3. Run this file in the SQL editor, replacing YOUR_AUTH_USER_UUID below
-- ============================================================

do $$
declare
  tid uuid := '692e6195-87d8-41ba-aa04-33b03f7ca07b';
begin

-- Tenant
insert into tenants (id, name, slug, owner_id, notification_email)
values (tid, 'Clara''s Bakehouse', 'claras-bakehouse', 'YOUR_AUTH_USER_UUID', 'owner@example.com');

-- Flavours
insert into flavours (id, store_id, name, tag, price, description, image_url, active, sort_order) values
  (1, tid, 'Raspberry & Rose',   null, 68, 'Vanilla sponge, raspberry jam, rose buttercream.',               '#C8A882', true, 1),
  (2, tid, 'Matcha Yuzu',        'GF', 72, 'Matcha cake, yuzu curd, white chocolate ganache.',               '#B8C4A0', true, 2),
  (3, tid, 'Choc Hazelnut',      null, 68, 'Dark chocolate sponge, praline cream, hazelnut crunch.',         '#D4B896', true, 3),
  (4, tid, 'Banana Caramel',     null, 65, 'Banana cake, salted caramel, whipped cream cheese.',             '#E8D4B8', true, 4),
  (5, tid, 'Lavender Earl Grey', null, 70, 'Earl grey sponge, lavender honey buttercream, lemon curd.',      '#C4B8D4', true, 5);
perform setval('flavours_id_seq', (select max(id) from flavours));

-- Instore items
insert into instore_items (store_id, name, locations, description, image_url, sort_order) values
  (tid, 'Whole Cakes', 'Manly · Chatswood · Broadway', 'Made fresh daily. Available whole or by the slice.', '#D4C4A8', 1),
  (tid, 'Cake Jars',   'Manly · Chatswood · Broadway', 'Layered mini cakes in a jar. Gift-ready.',           '#C8B89C', 2),
  (tid, 'Cake Boxes',  'Manly · Chatswood · Broadway', 'A mixed selection of our freshest slices.',          '#BCA888', 3);

-- Physical store locations
insert into stores (id, store_id, name, address, google_maps_url, image_url, sort_order) values
  (1, tid, 'Byron Bay',       '12 Jonson Street, Byron Bay NSW 2481',          'https://maps.google.com/?q=12+Jonson+Street+Byron+Bay+NSW+2481',          '#C8B89C', 1),
  (2, tid, 'Bangalow',        '24 Byron Street, Bangalow NSW 2479',            'https://maps.google.com/?q=24+Byron+Street+Bangalow+NSW+2479',            '#B8C4A0', 2),
  (3, tid, 'Brunswick Heads', '8 Mullumbimbi Street, Brunswick Heads NSW 2483','https://maps.google.com/?q=8+Mullumbimbi+Street+Brunswick+Heads+NSW+2483','#D4C4A8', 3);
perform setval('stores_id_seq', (select max(id) from stores));

-- FAQs — retail
insert into faqs (store_id, question, answer, type, sort_order) values
  (tid, 'Do you deliver?',
        'Yes! We offer local delivery to Sydney metro areas. Orders must be placed at least 48 hours in advance. Delivery fees vary by distance.',
        'retail', 1),
  (tid, 'What flavours do you have?',
        'Our monthly specials rotate regularly. Current flavours include Raspberry & Rose, Matcha Yuzu, Choc Hazelnut, Banana Caramel, and Lavender Earl Grey. Visit our Flavours page for the full list.',
        'retail', 2),
  (tid, 'Do you offer vegan options?',
        'We do! Several of our rotating flavours are vegan-friendly. Please check the product tag or ask in-store. We''re always expanding our vegan range.',
        'retail', 3),
  (tid, 'Is your kitchen gluten-free friendly?',
        'Our kitchen handles gluten-containing ingredients. We do offer some gluten-free certified products (tagged GF), but cannot guarantee a 100% gluten-free environment.',
        'retail', 4),
  (tid, 'Do you have nut-free cakes?',
        'Some of our products are nut-free, but our kitchen uses nuts regularly. We recommend customers with severe nut allergies exercise caution and contact us directly.',
        'retail', 5),
  (tid, 'How long do the cakes last?',
        'Our cakes are best enjoyed within 3 days of purchase when stored in the fridge. Bring to room temperature 30 minutes before serving for the best taste.',
        'retail', 6);

-- FAQs — wholesale
insert into faqs (store_id, question, answer, type, sort_order) values
  (tid, 'Do you wholesale?',
        'Yes, Clara''s Bakehouse offers wholesale arrangements for cafes, restaurants and specialty retailers across Sydney.',
        'wholesale', 1),
  (tid, 'How can I stock Clara''s Bakehouse?',
        'Fill out our wholesale enquiry form or send us an email at wholesale@clarasbakehouse.com.au. We''ll get back to you within 2 business days.',
        'wholesale', 2),
  (tid, 'Do you take bulk/corporate orders?',
        'Absolutely. We can accommodate bulk orders for corporate events, weddings and celebrations. Minimum order quantities apply. Contact us for a custom quote.',
        'wholesale', 3),
  (tid, 'Do you switch up wholesale flavours?',
        'Our wholesale range includes a selection of core flavours available year-round, plus seasonal specials. We give wholesale partners advance notice of any menu changes.',
        'wholesale', 4);

-- Team members
insert into team_members (store_id, name, role, image_url, sort_order) values
  (tid, 'Clara Nguyen',  'Founder & Head Baker', '#D4C4A8', 1),
  (tid, 'James Okafor',  'Pastry Chef',          '#C8B89C', 2),
  (tid, 'Sophie Martin', 'Store Manager',        '#D4B896', 3);

end $$;
