import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogBySlug, getRelatedPosts } from "@/data/blogs";
import styles from "./page.module.css";
import ReactMarkdown from "react-markdown";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  const relatedPosts = getRelatedPosts(slug);

  if (!post) {
    notFound();
  }

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
      <div className={styles.topSection}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/blogs">Blog</Link>
            <span>/</span>
            <span>{post.title}</span>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <time dateTime={post.date} className={styles.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <div className={styles.categories}>
              {post.categories.map((category) => (
                <span key={category} className={styles.categoryTag}>
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <article className={styles.article}>
              <div className={styles.content}>
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
              <div className={styles.tags}>
                <h3>Tags</h3>
                <div className={styles.tagList}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
            <aside className={styles.sidebar}>
              <div className={styles.sidebarContent}>
                <div className={styles.authorCard}>
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={80}
                    height={80}
                    className={styles.avatar}
                  />
                  <h3 className={styles.authorName}>{post.author.name}</h3>
                </div>
                <div className={styles.metaSection}>
                  <h4>Published</h4>
                  <time dateTime={post.date} className={styles.metaDate}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className={styles.metaSection}>
                  <h4>Categories</h4>
                  <div className={styles.metaTags}>
                    {post.categories.map((category) => (
                      <span key={category} className={styles.metaTag}>
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.metaSection}>
                  <h4>Tags</h4>
                  <div className={styles.metaTags}>
                    {post.tags.map((tag) => (
                      <span key={tag} className={styles.metaTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {relatedPosts.length > 0 && (
                  <div className={styles.relatedSection}>
                    <h4>Related Posts</h4>
                    <ul className={styles.relatedList}>
                      {relatedPosts.map((related) => (
                        <li key={related.slug}>
                          <Link
                            href={`/blogs/${related.slug}`}
                            className={styles.relatedLink}
                          >
                            {related.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

