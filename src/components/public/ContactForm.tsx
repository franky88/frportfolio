"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "./animations";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message is too short"),
});

type FormData = z.infer<typeof schema>;

const labelClass =
  "block text-xs font-display font-semibold uppercase tracking-widest mb-1.5";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "8px",
  fontSize: "0.875rem",
  fontFamily: "var(--font-body)",
  border: "1px solid var(--color-contact-input-border)",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  backgroundColor: "var(--color-contact-input-bg)",
  color: "var(--color-contact-input-text)",
};

const focusStyle = (
  e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  e.target.style.borderColor = "#7C3AED";
  e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)";
};

const blurStyle = (
  e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  e.target.style.borderColor = "var(--color-contact-input-border)";
  e.target.style.boxShadow = "none";
};

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

  const { onBlur: nameBlur, ...nameReg } = register("name");
  const { onBlur: emailBlur, ...emailReg } = register("email");
  const { onBlur: subjectBlur, ...subjectReg } = register("subject");
  const { onBlur: messageBlur, ...messageReg } = register("message");

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
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
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Name + Email */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
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
                onFocus={(e) => {
                  e.target.style.borderColor = "#7C3AED";
                  e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)";
                }}
                onBlur={(e) => {
                  blurStyle(e);
                  nameBlur(e);
                }}
                {...nameReg}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs"
                  style={{ color: "#EF4444" }}
                >
                  {errors.name.message}
                </motion.p>
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
                onFocus={(e) => {
                  e.target.style.borderColor = "#7C3AED";
                  e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)";
                }}
                onBlur={(e) => {
                  blurStyle(e);
                  emailBlur(e);
                }}
                {...emailReg}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs"
                  style={{ color: "#EF4444" }}
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Subject */}
          <motion.div variants={fadeUp}>
            <label
              className={labelClass}
              style={{ color: "var(--color-contact-label)" }}
            >
              Subject <span style={{ opacity: 0.5 }}>(optional)</span>
            </label>
            <input
              style={inputStyle}
              placeholder="What's it about?"
              onFocus={(e) => {
                e.target.style.borderColor = "#7C3AED";
                e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)";
              }}
              onBlur={(e) => {
                blurStyle(e);
                subjectBlur(e);
              }}
              {...subjectReg}
            />
          </motion.div>

          {/* Message */}
          <motion.div variants={fadeUp}>
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
              onFocus={(e) => {
                e.target.style.borderColor = "#7C3AED";
                e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)";
              }}
              onBlur={(e) => {
                blurStyle(e as any);
                messageBlur(e);
              }}
              {...messageReg}
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs"
                style={{ color: "#EF4444" }}
              >
                {errors.message.message}
              </motion.p>
            )}
          </motion.div>

          {/* Submit */}
          <motion.div variants={fadeUp}>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="px-6 py-3 rounded-md text-sm font-display font-semibold disabled:opacity-50 btn-gradient"
            >
              {isSubmitting ? "Sending…" : "Send message"}
            </motion.button>
          </motion.div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
