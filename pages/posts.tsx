import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import PostList from '@/components/PostList';
import PostDetail from '@/components/PostDetail';
import { Post, PostsResponse } from '@/types/post';

interface PostsPageProps {
  posts: Post[];
}

const PostsPage: React.FC<PostsPageProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <>
      <Head>
        <title>Blog Posts</title>
        <meta name="description" content="View our latest blog posts" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <PostList posts={posts} onPostClick={handlePostClick} />
        </div>
        
        <PostDetail
          post={selectedPost}
          onClose={handleCloseModal}
          isOpen={isModalOpen}
        />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<PostsPageProps> = async () => {
  try {
    // In a real application, you might fetch from an external API
    // For this demo, we'll fetch from our internal API
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-domain.com' 
      : 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/posts`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const data: PostsResponse = await response.json();
    
    return {
      props: {
        posts: data.posts,
      },
      // Revalidate every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    
    // Return empty posts array as fallback
    return {
      props: {
        posts: [],
      },
      revalidate: 60, // Retry in 1 minute
    };
  }
};

export default PostsPage; 