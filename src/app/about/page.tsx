import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";
import StorySection from "@/components/sections/StorySection";
import ValuesSection from "@/components/sections/ValuesSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import TeamSection from "@/components/sections/TeamSection";
import AboutCta from "@/components/sections/AboutCta";
import Footer from "@/components/layout/Footer";
import { aboutValues, teamMembers } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Clara's Bakehouse — a Northern NSW bakery built on scratch baking, seasonal ingredients, and community.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <ValuesSection values={aboutValues} />
      <MarqueeSection text="Clara's Bakehouse" />
      <TeamSection members={teamMembers} />
      <AboutCta />
      <Footer />
    </>
  );
}
