import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Blog Post Viewer</title>
        <meta name="description" content="A simple blog post viewer built with Next.js" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Blog Post Viewer
          </h1>
          <p className="text-gray-600 mb-8 max-w-md">
            A simple blog post viewer built with Next.js, featuring static site generation and comprehensive testing.
          </p>
          <Link 
            href="/posts"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            View Blog Posts
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage; 