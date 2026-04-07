"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { IAbout } from "@/types";
import { stagger, fadeUp } from "./animations";

export function HeroSection({ about }: { about: IAbout | null }) {
  const headline =
    about?.heroHeadline ?? "Crafting visuals that think, and code that feels.";
  const subtitle =
    about?.heroSubtitle ??
    "Graphic Designer & Web Developer — building things that look considered and function beautifully.";

  const words = headline.split(" ");
  const lastWord = words.pop();
  const rest = words.join(" ");

  return (
    <section
      className="min-h-screen flex items-center pt-16"
      style={{ backgroundColor: "var(--color-hero-bg)" }}
    >
      <div className="site-container py-20">
        <motion.div
          className="max-w-4xl"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="text-xs font-display font-semibold uppercase tracking-widest mb-6"
            style={{ color: "#7C3AED" }}
          >
            FR · Graphic Designer & Web Developer
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-bold leading-tight mb-6"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
              color: "var(--color-text-primary)",
            }}
          >
            {rest} <span className="text-gradient">{lastWord}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="font-body text-lg max-w-2xl mb-10 leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link
              href="/#projects"
              className="px-6 py-3 rounded-md text-sm font-display font-semibold transition-colors btn-gradient"
            >
              View projects
            </Link>
            <Link
              href="/#contact"
              className="px-6 py-3 rounded-md text-sm font-display font-semibold border transition-colors"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            >
              Get in touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
