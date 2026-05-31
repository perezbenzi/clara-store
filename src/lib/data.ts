import type { InStoreItem, ContactCard, FaqItem, NavLink, AboutValue, Store, OpeningSoonData, HowItWorksStep } from "./types";

export const navLinks: NavLink[] = [
  { label: "Click & Collect", href: "/order" },
  { label: "Flavours", href: "/flavours" },
  { label: "Our Stores", href: "/stores" },
  { label: "About", href: "/about" },
];

export const howItWorks: HowItWorksStep[] = [
  { number: "01", title: "Choose your cake", body: "Browse our current flavours and pick the one that's calling your name." },
  { number: "02", title: "Select a size", body: "We offer 15cm (feeds 8) and 20cm (feeds 14) for whole cakes." },
  { number: "03", title: "Pick a date", body: "Choose your preferred collection day. Orders need 48 hours notice." },
  { number: "04", title: "Collect in store", body: "Your cake will be boxed and waiting at your chosen location." },
];

export const instoreItems: InStoreItem[] = [
  {
    name: "Whole Cakes",
    locations: "Byron Bay · Bangalow · Brunswick Heads",
    description: "Made fresh daily. Available whole or by the slice.",
    imagePlaceholder: "#D4C4A8",
  },
  {
    name: "Cake Jars",
    locations: "Byron Bay · Bangalow · Brunswick Heads",
    description: "Layered mini cakes in a jar. Gift-ready.",
    imagePlaceholder: "#C8B89C",
  },
  {
    name: "Cake Boxes",
    locations: "Byron Bay · Bangalow · Brunswick Heads",
    description: "A mixed selection of our freshest slices.",
    imagePlaceholder: "#BCA888",
  },
];

export const contactCards: ContactCard[] = [
  {
    title: "Enquiries",
    hours: "Mon–Fri 9am–5pm",
    description:
      "Have a question about our cakes, allergens, or ordering process? We'd love to hear from you.",
  },
  {
    title: "Corporate Orders",
    hours: "Orders open weekly",
    description:
      "Planning an event or need cakes in bulk? We cater to offices, events and celebrations of all sizes.",
  },
  {
    title: "Partnerships",
    hours: "Enquire anytime",
    description:
      "Interested in stocking Clara's Bakehouse or collaborating with us? Let's talk.",
  },
];

export const retailFaqs: FaqItem[] = [
  {
    question: "Do you deliver?",
    answer:
      "Yes! We offer local delivery within the Byron Bay and Northern Rivers region. Orders must be placed at least 48 hours in advance. Delivery fees vary by distance.",
  },
  {
    question: "What flavours do you have?",
    answer:
      "Our monthly specials rotate regularly. Current flavours include Raspberry & Rose, Matcha Yuzu, Choc Hazelnut, Banana Caramel, and Lavender Earl Grey. Visit our Flavours page for the full list.",
  },
  {
    question: "Do you offer vegan options?",
    answer:
      "We do! Several of our rotating flavours are vegan-friendly. Please check the product tag or ask in-store. We're always expanding our vegan range.",
  },
  {
    question: "Is your kitchen gluten-free friendly?",
    answer:
      "Our kitchen handles gluten-containing ingredients. We do offer some gluten-free certified products (tagged GF), but cannot guarantee a 100% gluten-free environment.",
  },
  {
    question: "Do you have nut-free cakes?",
    answer:
      "Some of our products are nut-free, but our kitchen uses nuts regularly. We recommend customers with severe nut allergies exercise caution and contact us directly.",
  },
  {
    question: "How long do the cakes last?",
    answer:
      "Our cakes are best enjoyed within 3 days of purchase when stored in the fridge. Bring to room temperature 30 minutes before serving for the best taste.",
  },
];

export const wholesaleFaqs: FaqItem[] = [
  {
    question: "Do you wholesale?",
    answer:
      "Yes, Clara's Bakehouse offers wholesale arrangements for cafes, restaurants and specialty retailers across Northern NSW.",
  },
  {
    question: "How can I stock Clara's Bakehouse?",
    answer:
      "Fill out our wholesale enquiry form or send us an email at wholesale@clarasbakehouse.com.au. We'll get back to you within 2 business days.",
  },
  {
    question: "Do you take bulk/corporate orders?",
    answer:
      "Absolutely. We can accommodate bulk orders for corporate events, weddings and celebrations. Minimum order quantities apply. Contact us for a custom quote.",
  },
  {
    question: "Do you switch up wholesale flavours?",
    answer:
      "Our wholesale range includes a selection of core flavours available year-round, plus seasonal specials. We give wholesale partners advance notice of any menu changes.",
  },
];

export const aboutValues: AboutValue[] = [
  {
    number: "01",
    title: "Scratch only",
    body: "No mixes, no shortcuts. Every cake starts with real butter, real eggs, and real effort.",
  },
  {
    number: "02",
    title: "Seasonal always",
    body: "Our menu rotates with the seasons. We work with local suppliers to source the best ingredients.",
  },
  {
    number: "03",
    title: "Community first",
    body: "We're a Sydney business, through and through. We support local growers, hire locally, and give back.",
  },
];

export const stores: Store[] = [
  {
    id: 1,
    name: "Byron Bay",
    address: "12 Jonson Street, Byron Bay NSW 2481",
    googleMapsUrl:
      "https://maps.google.com/?q=12+Jonson+Street+Byron+Bay+NSW+2481",
    imagePlaceholder: "#C8B89C",
  },
  {
    id: 2,
    name: "Bangalow",
    address: "24 Byron Street, Bangalow NSW 2479",
    googleMapsUrl:
      "https://maps.google.com/?q=24+Byron+Street+Bangalow+NSW+2479",
    imagePlaceholder: "#B8C4A0",
  },
  {
    id: 3,
    name: "Brunswick Heads",
    address: "8 Mullumbimbi Street, Brunswick Heads NSW 2483",
    googleMapsUrl:
      "https://maps.google.com/?q=8+Mullumbimbi+Street+Brunswick+Heads+NSW+2483",
    imagePlaceholder: "#D4C4A8",
  },
];

export const openingSoon: OpeningSoonData = {
  suburb: "Mullumbimby",
  year: "2026",
  tag: "Opening mid 2026",
};
