import Link from "next/link";
import { CARDS } from "@/lib/servicesData";
import { generateMetadata } from "@/lib/seo";
import {
  Wrench, Package, Truck, Shield, Network, Monitor,
  Users, Settings, TrendingUp, ShieldCheck, Building2, Globe,
  ArrowRight, type LucideIcon
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Wrench, Package, Truck, Shield, Network, Monitor,
  Users, Settings, TrendingUp, ShieldCheck, Building2, Globe,
};

export const metadata = generateMetadata({
  title: "What We Do — Core Capabilities",
  description:
    "Explore SKT Global's 12 core mining capabilities — from underground workshops and mechanised fleets to safety systems and regional expansion.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* ── Hero Header ── */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-12 pt-36 pb-20">
        <p className="text-xs font-bold tracking-[0.28em] text-neutral-400 uppercase mb-6">
          What We Do
        </p>
        <h1 className="text-6xl md:text-8xl font-black text-neutral-900 tracking-tight leading-none mb-8">
          Core
          <br />
          <span className="text-neutral-300">Capabilities</span>
        </h1>
        <p className="text-lg text-neutral-500 max-w-xl leading-relaxed">
          Twelve capabilities. One operating system. Every function engineered
          to keep underground mining running without interruption.
        </p>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="h-px bg-neutral-100" />
      </div>

      {/* ── Cards Grid ── */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map((card) => {
            const Icon = ICON_MAP[card.iconName] ?? Wrench;
            return (
              <Link
                key={card.slug}
                href={`/services/${card.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-neutral-100 bg-white transition-all duration-500 hover:border-neutral-900 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-neutral-950">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    style={{ backgroundImage: `url("${encodeURI(card.bgImage)}")` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  {/* Number badge */}
                  <span className="absolute top-4 left-4 text-xs font-bold text-white/50 tracking-[0.2em]">
                    {card.num}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Icon + Tags row */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-50 border border-neutral-100 text-neutral-700 transition-colors duration-300 group-hover:bg-neutral-900 group-hover:border-neutral-900 group-hover:text-white">
                      <Icon size={15} strokeWidth={1.5} />
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {card.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          style={{ fontSize: "10px", letterSpacing: "0.08em" }}
                          className="font-semibold uppercase px-2 py-0.5 rounded-full text-neutral-400 bg-neutral-50 border border-neutral-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h2
                    style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em" }}
                    className="text-neutral-900 leading-tight mb-2 transition-colors duration-300"
                  >
                    {card.title}
                  </h2>

                  {/* Description */}
                  <p
                    style={{ fontSize: "13px", opacity: 0.6, lineHeight: "1.55" }}
                    className="text-neutral-700 line-clamp-2 flex-1"
                  >
                    {card.desc}
                  </p>

                  {/* Explore link */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-neutral-100">
                    <span
                      style={{ fontSize: "13px", fontWeight: 500 }}
                      className="text-neutral-400 group-hover:text-neutral-900 transition-colors duration-300 inline-flex items-center gap-1.5"
                    >
                      Explore <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
