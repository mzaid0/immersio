"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Facebook, Instagram } from "lucide-react";

type SocialItem = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
};

type LinkItem = { text: string; href: string; badge?: "new" | "hot" | "soon" };

interface FooterProps {
  brand?: { name: string; logo?: string; description?: string };
  socials?: SocialItem[];
  columns?: { title: string; links: LinkItem[] }[];
  copyrightName?: string;
}

const defaultProps: FooterProps = {
  brand: {
    name: "Clothify",
    logo: "/logo.webp",
    description:
      "Modern clothing store. Crafted with performance, accessibility, and elegant UI in mind.",
  },
  socials: [
    { label: "Facebook", href: "#", Icon: Facebook },
    { label: "Instagram", href: "#", Icon: Instagram },
  ],
  columns: [
    {
      title: "Shop",
      links: [
        { text: "Men", href: "/men" },
        { text: "Women", href: "/women" },
        { text: "Hoodies", href: "/hoodies" },
        { text: "T-Shirts", href: "/t-shirts", badge: "hot" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", href: "/about" },
        { text: "Careers", href: "/careers", badge: "soon" },
        { text: "Blog", href: "/blog" },
        { text: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Docs", href: "/docs" },
        { text: "Community", href: "/community" },
        { text: "Support", href: "/support" },
        { text: "Security", href: "/security" },
      ],
    },
  ],
  copyrightName: "Clothify",
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.5, ease: "easeOut" },
  }),
};

const hoverUnderline =
  "relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-600 dark:after:bg-emerald-400 after:transition-all hover:after:w-full";

export default function Footer(props: FooterProps = defaultProps) {
  const { brand, socials, columns, copyrightName } = {
    ...defaultProps,
    ...props,
  };

  return (
    <footer className="relative w-full overflow-hidden rounded-t-2xl border-t bg-background/60 backdrop-blur">
      {/* glow blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="absolute -bottom-28 right-10 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* brand + socials */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="col-span-1"
          >
            <Link href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {brand?.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-9 w-9 rounded-full border"
                />
              ) : (
                <div className="h-9 w-9 rounded-full border" />
              )}
              <span className="text-xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400">
                {brand?.name}
              </span>
            </Link>
            {brand?.description && (
              <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                {brand.description}
              </p>
            )}

            <ul className="mt-6 flex flex-wrap gap-3">
              {socials?.map(({ label, href, Icon }, i) => (
                <motion.li
                  key={label}
                  custom={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <Link
                    href={href}
                    aria-label={label}
                    className="group inline-flex items-center justify-center rounded-full border px-3 py-2 text-sm transition hover:border-emerald-600/60 hover:bg-emerald-600/5 dark:hover:border-emerald-400/60 dark:hover:bg-emerald-400/5"
                  >
                    <Icon className="mr-2 size-4 text-emerald-600 transition group-hover:scale-110 dark:text-emerald-400" />
                    <span className={`text-foreground/80 ${hoverUnderline}`}>
                      {label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* link columns (3) */}
          <div className="col-span-1 md:col-span-2">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {columns?.map((col, colIdx) => (
                <motion.div
                  key={col.title}
                  custom={colIdx + 1}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
                    {col.title}
                  </h4>
                  <ul className="mt-4 space-y-2 text-sm">
                    {col.links.map((item) => (
                      <li key={item.text} className="flex items-center gap-2">
                        <Link
                          href={item.href}
                          className={`text-foreground/70 transition hover:text-foreground ${hoverUnderline}`}
                        >
                          {item.text}
                        </Link>
                        {item.badge && (
                          <span
                            className={
                              "rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide " +
                              (item.badge === "hot"
                                ? "border-emerald-600/30 text-emerald-700 dark:text-emerald-300"
                                : item.badge === "new"
                                  ? "border-emerald-600/30 text-emerald-700 dark:text-emerald-300"
                                  : "border-foreground/20 text-foreground/60")
                            }
                          >
                            {item.badge}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* divider */}
        <motion.hr
          initial={{ scaleX: 0, opacity: 0.4 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-12 origin-left border-foreground/10"
        />

        {/* bottom row */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-foreground/70 sm:flex-row"
        >
          <p>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className={hoverUnderline}>
              Privacy
            </Link>
            <Link href="/terms" className={hoverUnderline}>
              Terms
            </Link>
            <Link href="/cookies" className={hoverUnderline}>
              Cookies
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
