"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message is too short"),
});

type FormData = z.infer<typeof schema>;

const labelClass =
  "block text-xs font-display font-semibold uppercase tracking-widest mb-1.5";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontFamily: "var(--font-body)",
    border: "1px solid var(--color-contact-input-border)",
    outline: "none",
    transition: "border-color 0.15s ease",
    backgroundColor: "var(--color-contact-input-bg)",
    color: "var(--color-contact-input-text)",
  };

  if (sent) {
    return (
      <div
        className="p-6 rounded-xl border"
        style={{ borderColor: "#22C55E", backgroundColor: "#22C55E10" }}
      >
        <p
          className="font-display font-semibold text-lg mb-1"
          style={{ color: "#22C55E" }}
        >
          Message sent.
        </p>
        <p
          className="font-body text-sm"
          style={{ color: "var(--color-contact-success-text)", opacity: 0.7 }}
        >
          I'll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            className={labelClass}
            style={{ color: "var(--color-contact-label)" }}
          >
            Name
          </label>
          <input
            style={inputStyle}
            placeholder="Your name"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs" style={{ color: "#EF4444" }}>
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label
            className={labelClass}
            style={{ color: "var(--color-contact-label)" }}
          >
            Email
          </label>
          <input
            style={inputStyle}
            placeholder="your@email.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs" style={{ color: "#EF4444" }}>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          className={labelClass}
          style={{ color: "var(--color-contact-label)" }}
        >
          Subject <span style={{ opacity: 0.5 }}>(optional)</span>
        </label>
        <input
          style={inputStyle}
          placeholder="What's it about?"
          {...register("subject")}
        />
      </div>

      <div>
        <label
          className={labelClass}
          style={{ color: "var(--color-contact-label)" }}
        >
          Message
        </label>
        <textarea
          style={{ ...inputStyle, resize: "vertical" }}
          rows={5}
          placeholder="Tell me about your project…"
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-xs" style={{ color: "#EF4444" }}>
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 rounded-md text-sm font-display font-semibold transition-colors disabled:opacity-50"
        style={{ backgroundColor: "#E8A020", color: "#0A0A0A" }}
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
