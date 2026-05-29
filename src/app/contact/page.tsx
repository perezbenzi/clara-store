import type { Metadata } from "next";
import ContactCards from "@/components/sections/ContactCards";
import FaqAccordion from "@/components/sections/FaqAccordion";
import Footer from "@/components/layout/Footer";
import { contactCards, retailFaqs, wholesaleFaqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Clara's Bakehouse — for retail enquiries, corporate orders, and wholesale partnerships.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero header */}
      <section className="bg-cream px-6 pt-24 pb-16 text-center">
        <p className="uppercase tracking-[0.2em] text-[11px] text-muted mb-4">
          Say hello
        </p>
        <h1 className="font-display uppercase text-ink text-5xl md:text-7xl">
          Get In Touch
        </h1>
      </section>

      <ContactCards cards={contactCards} />

      <FaqAccordion retailFaqs={retailFaqs} wholesaleFaqs={wholesaleFaqs} />

      <Footer />
    </>
  );
}
