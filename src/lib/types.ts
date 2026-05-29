export interface Flavour {
  id: number;
  name: string;
  tag: string | null;
  imagePlaceholder: string;
}

export interface InStoreItem {
  name: string;
  locations: string;
  description: string;
  imagePlaceholder: string;
}

export interface ContactCard {
  title: string;
  hours: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface AboutValue {
  number: string;
  title: string;
  body: string;
}

export interface TeamMember {
  name: string;
  role: string;
  imagePlaceholder: string;
}
