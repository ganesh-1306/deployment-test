import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Deployment Test";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
  const contactHref = contactEmail ? `mailto:${contactEmail}` : "#contact";

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const services = [
    {
      title: "Cloud Deployments",
      description:
        "Launch reliable infrastructure with automated pipelines tuned for your workloads.",
    },
    {
      title: "Performance Audits",
      description:
        "Diagnose bottlenecks and ship optimizations that keep your users engaged.",
    },
    {
      title: "24/7 Support",
      description:
        "Partner with an on-call team that keeps your applications running at peak health.",
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>{siteName}</div>
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="#contact" className={styles.ctaButton}>
          Get Started
        </Link>
      </header>
      <main className={styles.main}>
        <section id="home" className={`${styles.section} ${styles.hero}`}>
          <h1>Launch and scale your ideas without the deployment headaches.</h1>
          <p>
            We orchestrate infrastructure, automation, and expert support so you
            can focus on delivering features your customers love.
          </p>
          <div className={styles.heroActions}>
            <Link href="#services" className={styles.primaryAction}>
              Explore Services
            </Link>
            <Link href="#about" className={styles.secondaryAction}>
              Learn More
            </Link>
          </div>
        </section>
        <section id="services" className={styles.section}>
          <h2>What we deliver</h2>
          <div className={styles.cardGrid}>
            {services.map((service) => (
              <article key={service.title} className={styles.card}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="about" className={styles.section}>
          <div className={styles.split}>
            <div>
              <h2>Built for fast-moving teams</h2>
              <p>
                Our specialists combine proven DevOps practices with modern
                tooling to accelerate releases, improve reliability, and tighten
                feedback loops across your organization.
              </p>
            </div>
            <div className={styles.stats}>
              <div>
                <strong>500+</strong>
                <span>deployments managed</span>
              </div>
              <div>
                <strong>99.99%</strong>
                <span>uptime commitment</span>
              </div>
              <div>
                <strong>15 min</strong>
                <span>average incident response</span>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className={`${styles.section} ${styles.contact}`}>
          <h2>Ready to start?</h2>
          <p>
            Tell us about your roadmap and we will design a deployment strategy
            tailored to your product.
          </p>
          <form
            className={styles.contactForm}
            action={contactHref}
            method="post"
          >
            <div className={styles.formRow}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                required
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                required
              />
            </div>
            <div className={`${styles.formRow} ${styles.fullWidth}`}>
              <label htmlFor="message">Project details</label>
              <textarea
                id="message"
                name="message"
                placeholder="Share your goals, timelines, and any context your team has in mind."
                rows={5}
                required
              />
            </div>
            <button
              type="submit"
              className={styles.primaryAction}
              disabled={!contactEmail}
            >
              Send Message
            </button>
            {!contactEmail && (
              <p className={styles.formHelper}>
                Add <code>NEXT_PUBLIC_CONTACT_EMAIL</code> to enable submissions.
              </p>
            )}
          </form>
        </section>
      </main>
      <footer className={styles.footer}>
        <span>
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
