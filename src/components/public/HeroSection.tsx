import Link from "next/link";
import type { IAbout } from "@/types";

export function HeroSection({ about }: { about: IAbout | null }) {
  const headline =
    about?.heroHeadline ?? "Crafting visuals that think, and code that feels.";
  const subtitle =
    about?.heroSubtitle ??
    "Graphic Designer & Web Developer — building things that look considered and function beautifully.";

  // Highlight the last word of the headline in amber
  const words = headline.split(" ");
  const lastWord = words.pop();
  const restWords = words.join(" ");

  return (
    <section
      className="min-h-screen flex items-center pt-16"
      style={{ backgroundColor: "var(--color-hero-bg)" }}
    >
      <div className="site-container py-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <p
            className="text-xs font-display font-semibold uppercase tracking-widest mb-6"
            style={{ color: "#E8A020" }}
          >
            FR · {about?.tagline}
          </p>

          {/* Headline */}
          <h1
            className="font-display font-bold leading-tight mb-6"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
              color: "var(--color-text-primary)",
            }}
          >
            {restWords} <span style={{ color: "#E8A020" }}>{lastWord}</span>
          </h1>

          {/* Subtitle */}
          <p
            className="font-body text-lg max-w-2xl mb-10 leading-relaxed"
            style={{ color: "var(--color-text-primary)", opacity: 0.6 }}
          >
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/#projects"
              className="px-6 py-3 rounded-md text-sm font-display font-semibold transition-colors"
              style={{ backgroundColor: "#E8A020", color: "#0A0A0A" }}
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
          </div>
        </div>
      </div>
    </section>
  );
}
