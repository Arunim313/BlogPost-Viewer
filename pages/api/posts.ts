import type { NextApiRequest, NextApiResponse } from 'next';
import { PostsResponse } from '@/types/post';

const mockPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    content: "Next.js is a powerful React framework that makes building full-stack web applications simple and efficient. It provides features like server-side rendering, static site generation, and API routes out of the box. In this post, we'll explore the basics of setting up a Next.js project and understanding its core concepts. We'll cover topics like file-based routing, data fetching methods, and deployment strategies. Whether you're new to React or an experienced developer, Next.js offers a great developer experience with excellent performance optimizations.",
    author: "John Doe",
    createdAt: "2024-01-15T10:00:00Z",
    excerpt: "Learn the fundamentals of Next.js and how to build modern web applications with this powerful React framework."
  },
  {
    id: 2,
    title: "Testing React Components with Jest",
    content: "Testing is a crucial part of building reliable React applications. Jest is a popular testing framework that works great with React components. In this comprehensive guide, we'll learn how to write effective unit tests for React components using Jest and React Testing Library. We'll cover topics like component rendering, user interactions, mocking dependencies, and testing asynchronous operations. By the end of this post, you'll have a solid understanding of how to test your React components effectively and maintain high code quality.",
    author: "Jane Smith",
    createdAt: "2024-01-20T14:30:00Z",
    excerpt: "A comprehensive guide to testing React components using Jest and React Testing Library for better code quality."
  },
  {
    id: 3,
    title: "TypeScript Best Practices for React",
    content: "TypeScript adds static typing to JavaScript, making it easier to build large-scale applications with fewer bugs. When combined with React, TypeScript provides excellent developer experience with better IntelliSense, error catching, and refactoring capabilities. In this post, we'll explore TypeScript best practices specifically for React development. We'll cover type definitions for props, state management, event handlers, and common patterns. You'll learn how to write more maintainable and robust React code with TypeScript.",
    author: "Mike Johnson",
    createdAt: "2024-01-25T09:15:00Z",
    excerpt: "Learn TypeScript best practices for React development to write more maintainable and robust applications."
  },
  {
    id: 4,
    title: "Building Accessible Web Applications",
    content: "Web accessibility is not just a legal requirement but also a moral obligation to ensure that everyone can use your applications. In this post, we'll explore how to build accessible React applications that work for users with disabilities. We'll cover topics like semantic HTML, ARIA attributes, keyboard navigation, screen reader compatibility, and color contrast. You'll learn practical techniques and tools to test and improve the accessibility of your web applications.",
    author: "Sarah Wilson",
    createdAt: "2024-01-30T16:45:00Z",
    excerpt: "Essential guidelines and techniques for building accessible React applications that work for all users."
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostsResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  res.status(200).json({ posts: mockPosts });
} 