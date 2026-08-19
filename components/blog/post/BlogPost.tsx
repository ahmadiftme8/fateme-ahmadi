"use client";

import Link from "next/link";
import Markdown from "react-markdown";
import { Post } from "@/types/post";
import { FadeIn, getStaggerDelay } from "@/components/ui/FadeIn";
import styles from "./BlogPost.module.css";

interface BlogPostProps {
  post: Post;
}

function formatPostDate(date: string) {
  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <div className={styles.page}>
      <article className={styles.article}>
        <FadeIn delay={getStaggerDelay(0)}>
          <Link href="/blog" className={styles.backLink}>
            ← Back to Blog
          </Link>
        </FadeIn>

        <FadeIn as="header" className={styles.header} delay={getStaggerDelay(1)}>
          <div className={styles.meta}>
            <span className={styles.metaLabel}>Blog</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
        </FadeIn>

        <FadeIn className={styles.content} delay={getStaggerDelay(2)}>
          <Markdown>{post.content}</Markdown>
        </FadeIn>
      </article>
    </div>
  );
}
