"use client";

import Markdown from "react-markdown";
import { Post } from "@/types/post";
import { FadeIn, getStaggerDelay } from "@/components/ui/FadeIn";

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article>
      <FadeIn as="header" className="mb-8" delay={getStaggerDelay(0)}>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500">{post.date}</p>
      </FadeIn>

      <FadeIn className="prose prose-lg" delay={getStaggerDelay(1)}>
        <Markdown>{post.content}</Markdown>
      </FadeIn>
    </article>
  );
}
