"use client";

import { JSX } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { ContactForm } from "@/components/molecules/ContactForm";
import { SITE_CONFIG } from "@/lib/constants";

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: SITE_CONFIG.address,
    href: "https://maps.google.com",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon–Fri: 9:00 AM – 6:00 PM IST",
    href: null,
  },
] as const;

export function ContactSection(): JSX.Element {
  return (
    <section
      id="contact"
      className="py-section bg-neutral-50"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="dot" className="mb-6">
              Get In Touch
            </Badge>
          </motion.div>

          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-display-lg font-black text-neutral-900 tracking-tight leading-none"
          >
            Let&apos;s Build
            <br />
            <span className="text-neutral-300">Something Together</span>
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <p className="text-base text-neutral-500 leading-relaxed">
                Whether you&apos;re looking to partner on a large-scale mining
                project, need specialized industrial services, or want to explore
                career opportunities—we&apos;d love to hear from you.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-6">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 border border-neutral-200 group-hover:border-neutral-400 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                      <Icon size={14} className="text-neutral-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={
                      item.href.startsWith("https") ? "_blank" : undefined
                    }
                    rel={
                      item.href.startsWith("https")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="block hover:opacity-80 transition-opacity duration-200"
                    suppressHydrationWarning
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            {/* Countries */}
            <div className="pt-8 border-t border-neutral-200">
              <p className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-4">
                Operating Countries
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "India",
                  "Mozambique",
                  "Ghana",
                  "Tanzania",
                  "Indonesia",
                  "Australia",
                  "UAE",
                  "South Africa",
                ].map((country) => (
                  <span
                    key={country}
                    className="px-3 py-1 text-xs border border-neutral-200 text-neutral-500"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <div className="bg-white border border-neutral-200 p-8 md:p-12">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
