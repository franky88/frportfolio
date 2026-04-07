import Image from "next/image";
import type { IAbout } from "@/types";
import { MapPin, Mail } from "lucide-react";

export function AboutSection({ about }: { about: IAbout | null }) {
  if (!about) return null;

  return (
    <section
      id="about"
      className="py-20"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Avatar */}
          {about.avatar && (
            <div className="relative aspect-square max-w-sm rounded-xl overflow-hidden">
              <Image
                src={about.avatar}
                alt={about.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div>
            <p
              className="text-xs font-display font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#E8A020" }}
            >
              About
            </p>
            <h2
              className="font-display font-bold text-4xl mb-6"
              style={{ color: "var(--color-text-primary)" }}
            >
              {about.name}
            </h2>
            {about.tagline && (
              <p
                className="font-display font-semibold text-lg mb-4"
                style={{ color: "var(--color-text-primary)", opacity: 0.8 }}
              >
                {about.tagline}
              </p>
            )}
            <p
              className="font-body text-md leading-relaxed mb-6 whitespace-pre-line"
              style={{ color: "#5A5A6A" }}
            >
              {about.bio}
            </p>

            <div className="flex flex-col gap-2 mb-6">
              {about.location && (
                <div
                  className="flex items-center gap-2 text-sm font-body"
                  style={{ color: "#5A5A6A" }}
                >
                  <MapPin size={14} style={{ color: "#E8A020" }} />
                  {about.location}
                </div>
              )}
              {about.email && (
                <div
                  className="flex items-center gap-2 text-sm font-body"
                  style={{ color: "#5A5A6A" }}
                >
                  <Mail size={14} style={{ color: "#E8A020" }} />
                  {about.email}
                </div>
              )}
            </div>

            {/* Social links */}
            {about.socialLinks && (
              <div className="flex gap-4">
                {Object.entries(about.socialLinks)
                  .filter(([, url]) => url)
                  .map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-display font-semibold uppercase tracking-widest transition-colors hover:text-amber"
                      style={{ color: "#2C2C3A" }}
                    >
                      {platform}
                    </a>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
