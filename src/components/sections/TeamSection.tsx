import type { TeamMember } from "@/lib/types";

interface TeamSectionProps {
  members: TeamMember[];
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div>
      <div
        className="w-full aspect-[3/4] mb-4"
        style={{ backgroundColor: member.imagePlaceholder }}
      />
      <p className="font-display uppercase text-ink text-[18px] mb-1">
        {member.name}
      </p>
      <p className="text-xs uppercase tracking-wider text-brand-pink">
        {member.role}
      </p>
    </div>
  );
}

export default function TeamSection({ members }: TeamSectionProps) {
  return (
    <section className="bg-white py-[72px] px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-end mb-10">
          <h2 className="font-display uppercase text-ink text-4xl md:text-5xl leading-none">
            The team behind
            <br />
            the cakes
          </h2>
          <p className="text-sm text-muted leading-relaxed md:text-right md:max-w-[280px] md:ml-auto mt-4 md:mt-0">
            Small team, high standards. Every person at Clara&apos;s shares the
            same commitment to quality that started it all.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {members.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
