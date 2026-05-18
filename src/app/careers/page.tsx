import { JSX } from "react";
import { CareersHero } from "@/components/organisms/careers/CareersHero";
import { WhyJoinSection } from "@/components/organisms/careers/WhyJoinSection";
import { CareersCategories } from "@/components/organisms/careers/CareersCategories";
import { JobOpenings } from "@/components/organisms/careers/JobOpenings";
import { ApplicationProcess } from "@/components/organisms/careers/ApplicationProcess";
import { CareersCTA } from "@/components/organisms/careers/CareersCTA";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Careers",
  description: "Join the next generation of safe, high-technology mining excellence. Explore deployment opportunities, underground engineering roles, and global careers at SKT Global.",
  path: "/careers",
});

export default function CareersPage(): JSX.Element {
  return (
    <div className="pt-20 bg-neutral-950 min-h-screen text-white">
      {/* Cinematic Hero Portal */}
      <CareersHero />

      {/* Safety & Integrity Pillars */}
      <WhyJoinSection />

      {/* Operational Categories Marquee */}
      <CareersCategories />

      {/* Real-time Filterable Jobs Grid */}
      <JobOpenings />

      {/* Recruitment Pipeline Step Timeline */}
      <ApplicationProcess />

      {/* Industrial Copper Underglow Final CTA */}
      <CareersCTA />
    </div>
  );
}
