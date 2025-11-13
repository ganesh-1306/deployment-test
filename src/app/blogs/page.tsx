import Link from "next/link";
import { blogPosts } from "@/data/blogs";
import styles from "./page.module.css";

export default function BlogsPage() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Deployment Test";

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          {siteName}
        </Link>
        <nav className={styles.nav}>
          <Link href="/#home" className={styles.navLink}>
            Home
          </Link>
          <Link href="/#services" className={styles.navLink}>
            Services
          </Link>
          <Link href="/#about" className={styles.navLink}>
            About
          </Link>
          <Link href="/blogs" className={styles.navLink}>
            Blogs
          </Link>
          <Link href="/#contact" className={styles.navLink}>
            Contact
          </Link>
        </nav>
        <Link href="/#contact" className={styles.ctaButton}>
          Get Started
        </Link>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.subtitle}>
            Insights, tutorials, and best practices for modern deployment and
            infrastructure.
          </p>
          <div className={styles.grid}>
            {blogPosts.map((post) => (
              <article key={post.slug} className={styles.card}>
                <Link href={`/blogs/${post.slug}`} className={styles.cardLink}>
                  <div className={styles.cardContent}>
                    <div className={styles.cardMeta}>
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span className={styles.cardAuthor}>
                        {post.author.name}
                      </span>
                    </div>
                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                    <div className={styles.cardTags}>
                      {post.categories.map((category) => (
                        <span key={category} className={styles.tag}>
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

