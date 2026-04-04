import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20"
      style={{ backgroundColor: "var(--color-contact-bg)" }}
    >
      <div className="site-container">
        <div className="max-w-xl">
          <p
            className="text-xs font-display font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#E8A020" }}
          >
            Contact
          </p>
          <h2
            className="font-display font-bold text-4xl mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            Have a project in mind?
          </h2>
          <p
            className="font-body text-md mb-10"
            style={{ color: "var(--color-text-primary)", opacity: 0.6 }}
          >
            Let's talk. Fill in the form and I'll get back to you.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
