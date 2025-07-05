import React from 'react';
import { Post } from '@/types/post';

interface PostDetailProps {
  post: Post | null;
  onClose: () => void;
  isOpen: boolean;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onClose, isOpen }) => {
  if (!isOpen || !post) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-800 pr-4">
              {post.title}
            </h1>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold p-2 hover:bg-gray-100 rounded-full transition-colors"
              data-testid="close-button"
              aria-label="Close post detail"
            >
              ×
            </button>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span>By {post.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              data-testid="back-button"
            >
              Back to Posts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail; 