import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostDetail from '@/components/PostDetail';
import { Post } from '@/types/post';

const mockPost: Post = {
  id: 1,
  title: 'Test Post Title',
  content: 'This is the full content of the test post. It contains multiple sentences and should be displayed properly in the modal.',
  author: 'John Doe',
  createdAt: '2024-01-15T10:00:00Z',
  excerpt: 'This is a test excerpt'
};

describe('PostDetail', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders nothing when isOpen is false', () => {
    render(
      <PostDetail 
        post={mockPost} 
        onClose={mockOnClose} 
        isOpen={false} 
      />
    );
    
    expect(screen.queryByText('Test Post Title')).not.toBeInTheDocument();
  });

  it('renders nothing when post is null', () => {
    render(
      <PostDetail 
        post={null} 
        onClose={mockOnClose} 
        isOpen={true} 
      />
    );
    
    expect(screen.queryByText('Test Post Title')).not.toBeInTheDocument();
  });

  it('renders the modal when isOpen is true and post is provided', () => {
    render(
      <PostDetail 
        post={mockPost} 
        onClose={mockOnClose} 
        isOpen={true} 
      />
    );
    
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText('This is the full content of the test post. It contains multiple sentences and should be displayed properly in the modal.')).toBeInTheDocument();
    expect(screen.getByText('By John Doe')).toBeInTheDocument();
    expect(screen.getByText('1/15/2024')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <PostDetail 
        post={mockPost} 
        onClose={mockOnClose} 
        isOpen={true} 
      />
    );
    
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when back button is clicked', () => {
    render(
      <PostDetail 
        post={mockPost} 
        onClose={mockOnClose} 
        isOpen={true} 
      />
    );
    
    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('displays the post content with proper formatting', () => {
    render(
      <PostDetail 
        post={mockPost} 
        onClose={mockOnClose} 
        isOpen={true} 
      />
    );
    
    const content = screen.getByText('This is the full content of the test post. It contains multiple sentences and should be displayed properly in the modal.');
    expect(content).toBeInTheDocument();
  });

  it('displays author and date information correctly', () => {
    render(
      <PostDetail 
        post={mockPost} 
        onClose={mockOnClose} 
        isOpen={true} 
      />
    );
    
    expect(screen.getByText('By John Doe')).toBeInTheDocument();
    expect(screen.getByText('1/15/2024')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <PostDetail 
        post={mockPost} 
        onClose={mockOnClose} 
        isOpen={true} 
      />
    );
    
    const closeButton = screen.getByTestId('close-button');
    expect(closeButton).toHaveAttribute('aria-label', 'Close post detail');
  });

  it('renders with a different post', () => {
    const differentPost: Post = {
      id: 2,
      title: 'Different Post Title',
      content: 'Different content here',
      author: 'Jane Smith',
      createdAt: '2024-01-20T14:30:00Z',
      excerpt: 'Different excerpt'
    };

    render(
      <PostDetail 
        post={differentPost} 
        onClose={mockOnClose} 
        isOpen={true} 
      />
    );
    
    expect(screen.getByText('Different Post Title')).toBeInTheDocument();
    expect(screen.getByText('Different content here')).toBeInTheDocument();
    expect(screen.getByText('By Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('1/20/2024')).toBeInTheDocument();
  });
}); 