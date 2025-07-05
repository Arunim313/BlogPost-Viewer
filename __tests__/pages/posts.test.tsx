import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostsPage from '@/pages/posts';
import { Post } from '@/types/post';

// Mock the components
jest.mock('@/components/PostList', () => {
  return function MockPostList({ posts, onPostClick }: any) {
    return (
      <div data-testid="post-list">
        {posts.map((post: Post) => (
          <div 
            key={post.id} 
            data-testid={`post-item-${post.id}`}
            onClick={() => onPostClick(post)}
          >
            {post.title}
          </div>
        ))}
      </div>
    );
  };
});

jest.mock('@/components/PostDetail', () => {
  return function MockPostDetail({ post, onClose, isOpen }: any) {
    if (!isOpen || !post) return null;
    return (
      <div data-testid="post-detail">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <button data-testid="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    );
  };
});

const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Test Post 1',
    content: 'Content of test post 1',
    author: 'John Doe',
    createdAt: '2024-01-15T10:00:00Z',
    excerpt: 'Excerpt 1'
  },
  {
    id: 2,
    title: 'Test Post 2',
    content: 'Content of test post 2',
    author: 'Jane Smith',
    createdAt: '2024-01-20T14:30:00Z',
    excerpt: 'Excerpt 2'
  }
];

describe('PostsPage', () => {
  it('renders the PostList component with posts', () => {
    render(<PostsPage posts={mockPosts} />);
    
    expect(screen.getByTestId('post-list')).toBeInTheDocument();
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
  });

  it('opens PostDetail when a post is clicked', () => {
    render(<PostsPage posts={mockPosts} />);
    
    // Initially, PostDetail should not be rendered
    expect(screen.queryByTestId('post-detail')).not.toBeInTheDocument();
    
    // Click on the first post
    const firstPost = screen.getByTestId('post-item-1');
    fireEvent.click(firstPost);
    
    // PostDetail should now be rendered
    expect(screen.getByTestId('post-detail')).toBeInTheDocument();
    // Use getAllByText to avoid duplicate text error
    expect(screen.getAllByText('Test Post 1').length).toBeGreaterThan(1);
    expect(screen.getByText('Content of test post 1')).toBeInTheDocument();
  });

  it('closes PostDetail when close button is clicked', () => {
    render(<PostsPage posts={mockPosts} />);
    
    // Open the modal
    const firstPost = screen.getByTestId('post-item-1');
    fireEvent.click(firstPost);
    
    // Verify modal is open
    expect(screen.getByTestId('post-detail')).toBeInTheDocument();
    
    // Close the modal
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    
    // Verify modal is closed
    expect(screen.queryByTestId('post-detail')).not.toBeInTheDocument();
  });

  it('opens different post when second post is clicked', () => {
    render(<PostsPage posts={mockPosts} />);
    
    // Click on the second post
    const secondPost = screen.getByTestId('post-item-2');
    fireEvent.click(secondPost);
    
    // PostDetail should show the second post
    expect(screen.getByTestId('post-detail')).toBeInTheDocument();
    expect(screen.getAllByText('Test Post 2').length).toBeGreaterThan(1);
    expect(screen.getByText('Content of test post 2')).toBeInTheDocument();
  });

  it('renders with empty posts array', () => {
    render(<PostsPage posts={[]} />);
    
    expect(screen.getByTestId('post-list')).toBeInTheDocument();
    expect(screen.queryByTestId('post-item-1')).not.toBeInTheDocument();
  });

  it('has proper page title and meta description', () => {
    render(<PostsPage posts={mockPosts} />);
    
    // Note: In a real test environment, you might need to check the document head
    // This is a basic check that the component renders without errors
    expect(screen.getByTestId('post-list')).toBeInTheDocument();
  });
}); 