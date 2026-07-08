"use client";

import styles from "./BlogCard.module.css";
import Link from "next/link";
import { Post } from "@/types/post";
import { FadeIn, getStaggerDelay } from "@/components/ui/FadeIn";

interface BlogCardProps {
  post: Post;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <FadeIn
      as="article"
      className={styles["postCard"]}
      delay={getStaggerDelay(index + 1)}
    >
      <div className={styles["postHeader"]}>
        <Link href={`/blog/${post.slug}`}>
          <h2 className={styles["postTitle"]}>{post.title}</h2>
        </Link>

        <p className={styles["postDetails"]}>{post.date}</p>
      </div>

      <p className={styles["postMainContent"]}>{post.excerpt}</p>
      <Link href={`/blog/${post.slug}`} className={styles["readMoreBtn"]}>
        Read more →
      </Link>
    </FadeIn>
  );
}
