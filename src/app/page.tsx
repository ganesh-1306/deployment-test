import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Deployment Test";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
  const contactHref = contactEmail ? `mailto:${contactEmail}` : "#contact";

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Blogs", href: "/blogs" },
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

  const projects = [
    {
      name: "Velocity Launchpad",
      summary:
        "Implemented zero-downtime releases across five regions, shrinking deploy windows from 45 to 8 minutes.",
      metrics: "48% faster releases",
    },
    {
      name: "Atlas Observability",
      summary:
        "Unified logging, tracing, and alerting with a streaming pipeline that surfaces incidents in under a minute.",
      metrics: "60% fewer critical incidents",
    },
    {
      name: "Aurora Commerce",
      summary:
        "Migrated a legacy monolith to containerized services backed by automated canary rollouts and rollbacks.",
      metrics: "99.99% availability sustained",
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
        <section id="projects" className={styles.section}>
          <h2>Projects we’ve delivered</h2>
          <div className={styles.projectGrid}>
            {projects.map((project) => (
              <article key={project.name} className={styles.projectCard}>
                <header>
                  <h3>{project.name}</h3>
                  <span>{project.metrics}</span>
                </header>
                <p>{project.summary}</p>
              </article>
            ))}
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
          <Link
            href={contactHref}
            className={styles.primaryAction}
            aria-disabled={!contactEmail}
          >
            Contact Us
          </Link>
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
