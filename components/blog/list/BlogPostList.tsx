import styles from './BlogPostList.module.css'
import { Post } from '@/types/post';
import BlogCard from '../card/BlogCard'

interface BlogPostListProps {
  posts: Post[];  // Receives ARRAY of posts
}

export default function PostList({ posts }: BlogPostListProps){
    
    return(
        <div className={styles['postsWrapper']}>

                {posts.map((post, index) => (
                    <BlogCard key={post.slug} post={post} index={index} />
                ))}
            
        </div>
    )
}