import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostList from '@/components/PostList';
import { Post } from '@/types/post';

const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Test Post 1',
    content: 'This is the content of test post 1',
    author: 'John Doe',
    createdAt: '2024-01-15T10:00:00Z',
    excerpt: 'This is a test excerpt for post 1'
  },
  {
    id: 2,
    title: 'Test Post 2',
    content: 'This is the content of test post 2',
    author: 'Jane Smith',
    createdAt: '2024-01-20T14:30:00Z',
    excerpt: 'This is a test excerpt for post 2'
  }
];

describe('PostList', () => {
  const mockOnPostClick = jest.fn();

  beforeEach(() => {
    mockOnPostClick.mockClear();
  });

  it('renders the component with posts', () => {
    render(<PostList posts={mockPosts} onPostClick={mockOnPostClick} />);
    
    expect(screen.getByText('Blog Posts')).toBeInTheDocument();
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    expect(screen.getByText('This is a test excerpt for post 1')).toBeInTheDocument();
    expect(screen.getByText('This is a test excerpt for post 2')).toBeInTheDocument();
  });

  it('displays author and date for each post', () => {
    render(<PostList posts={mockPosts} onPostClick={mockOnPostClick} />);
    
    expect(screen.getByText('By John Doe')).toBeInTheDocument();
    expect(screen.getByText('By Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('1/15/2024')).toBeInTheDocument();
    expect(screen.getByText('1/20/2024')).toBeInTheDocument();
  });

  it('calls onPostClick when a post is clicked', () => {
    render(<PostList posts={mockPosts} onPostClick={mockOnPostClick} />);
    
    const firstPost = screen.getByTestId('post-item-1');
    fireEvent.click(firstPost);
    
    expect(mockOnPostClick).toHaveBeenCalledWith(mockPosts[0]);
  });

  it('renders empty state when no posts are provided', () => {
    render(<PostList posts={[]} onPostClick={mockOnPostClick} />);
    
    expect(screen.getByText('No posts available.')).toBeInTheDocument();
    expect(screen.queryByText('Blog Posts')).not.toBeInTheDocument();
  });

  it('renders empty state when posts is null', () => {
    render(<PostList posts={null as any} onPostClick={mockOnPostClick} />);
    
    expect(screen.getByText('No posts available.')).toBeInTheDocument();
  });

  it('renders empty state when posts is undefined', () => {
    render(<PostList posts={undefined as any} onPostClick={mockOnPostClick} />);
    
    expect(screen.getByText('No posts available.')).toBeInTheDocument();
  });

  it('has correct data-testid attributes for each post', () => {
    render(<PostList posts={mockPosts} onPostClick={mockOnPostClick} />);
    
    expect(screen.getByTestId('post-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('post-item-2')).toBeInTheDocument();
  });

  it('calls onPostClick with correct post when second post is clicked', () => {
    render(<PostList posts={mockPosts} onPostClick={mockOnPostClick} />);
    
    const secondPost = screen.getByTestId('post-item-2');
    fireEvent.click(secondPost);
    
    expect(mockOnPostClick).toHaveBeenCalledWith(mockPosts[1]);
  });
}); 