import Link from "next/link";
import { Linkedin, Twitter, Youtube, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { JSX } from "react";

const FOOTER_SECTIONS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/about#team" },
      { label: "History", href: "/about#history" },
      { label: "Certifications", href: "/about#certifications" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Open Cast Mining", href: "/services/open-cast-mining" },
      { label: "Underground Mining", href: "/services/underground-mining" },
      { label: "Mineral Processing", href: "/services/mineral-processing" },
      { label: "HSE Management", href: "/services/hse-management" },
    ],
  },
  {
    title: "COMMUNITY IMPACT",
    links: [
      { label: "Safety Philosophy", href: "/safety" },
      { label: "Environmental Policy", href: "/sustainability" },
      { label: "Community Impact", href: "/sustainability#community" },
      { label: "Net Zero Roadmap", href: "/sustainability#net-zero" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Media & Press", href: "/media" },
      { label: "Investor Relations", href: "/investors" },
    ],
  },
] as const;

const SOCIAL_LINKS = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
] as const;

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white" role="contentinfo">
      {/* Top section */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex flex-col mb-6 group">
              <span className="text-3xl font-black tracking-tight text-white leading-none">
                SKT
              </span>
              <span className="text-[9px] font-semibold tracking-[0.2em] text-neutral-500 uppercase leading-none mt-0.5">
                Global Mining & Services
              </span>
            </Link>

            <p className="text-sm text-neutral-400 leading-relaxed mb-6 max-w-xs">
              Engineering excellence across global mining operations. Building a
              safer, more sustainable industrial future since 2005.
            </p>

            {/* Social */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-neutral-700 hover:border-neutral-400 flex items-center justify-center transition-colors duration-200"
                  aria-label={`${SITE_CONFIG.shortName} on ${label}`}
                >
                  <Icon size={14} className="text-neutral-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <h3 className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight
                          size={10}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact strip */}
        <div className="py-8 border-t border-neutral-800 border-b flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
            >
              {SITE_CONFIG.email}
            </a>
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
              className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
            >
              {SITE_CONFIG.phone}
            </a>
          </div>
          <address className="not-italic text-sm text-neutral-500">
            {SITE_CONFIG.address}
          </address>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
              { label: "Sitemap", href: "/sitemap.xml" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Massive watermark */}
      <div className="overflow-hidden border-t border-neutral-800">
        <p
          className="text-[clamp(4rem,15vw,14rem)] font-black text-neutral-800 leading-none tracking-tighter select-none pointer-events-none py-4 px-6 text-center"
          aria-hidden="true"
        >
          SKT GLOBAL
        </p>
      </div>
    </footer>
  );
}
