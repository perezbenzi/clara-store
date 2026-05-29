import type { ContactCard } from "@/lib/types";
import Button from "@/components/ui/Button";

interface ContactCardsProps {
  cards: ContactCard[];
}

function Card({ card }: { card: ContactCard }) {
  return (
    <article className="bg-brand-pink p-8 flex flex-col gap-4">
      <div>
        <h3 className="font-display uppercase text-white text-2xl md:text-3xl mb-2">
          {card.title}
        </h3>
        <p className="text-white/70 text-xs uppercase tracking-widest">
          {card.hours}
        </p>
      </div>
      <p className="text-white text-sm leading-relaxed flex-1">
        {card.description}
      </p>
      <div>
        <Button variant="outline-white">Contact</Button>
      </div>
    </article>
  );
}

export default function ContactCards({ cards }: ContactCardsProps) {
  return (
    <section className="py-16 px-6 bg-cream">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}
