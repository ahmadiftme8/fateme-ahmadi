import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
import BlogPost from '@/components/blog/post/BlogPost';

export const dynamic = 'force-static';
export const revalidate = 3600;

// Slugs are combined with [locale] from app/[locale]/layout.tsx generateStaticParams
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Page component
export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  try {
    const post = getPostBySlug(slug);
    
    return (
      <main className="max-w-3xl mx-auto px-4 py-12">
        <BlogPost post={post} />
      </main>
    );
  } catch (error) {
    notFound();
  }
}
