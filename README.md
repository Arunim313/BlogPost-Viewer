# Blog Post Viewer

A simple blog post viewer built with Next.js, featuring static site generation, API routes, and comprehensive unit testing.

## Features

- **API Endpoint**: `/api/posts` returns a list of blog posts in JSON format
- **Static Site Generation**: Uses `getStaticProps` for data fetching with ISR (Incremental Static Regeneration)
- **Component Structure**: 
  - `PostList` component for displaying blog post titles
  - `PostDetail` component for showing full post content in a modal
- **Comprehensive Testing**: Unit tests for all components and data fetching logic
- **Modern UI**: Built with Tailwind CSS for a clean, responsive design

## Project Structure

```
├── components/
│   ├── PostList.tsx          # Component to display list of posts
│   └── PostDetail.tsx        # Modal component for post details
├── pages/
│   ├── api/
│   │   └── posts.ts          # API endpoint for blog posts
│   ├── _app.tsx              # App wrapper
│   ├── index.tsx             # Home page
│   └── posts.tsx             # Posts page with data fetching
├── types/
│   └── post.ts               # TypeScript interfaces
├── styles/
│   └── globals.css           # Global styles with Tailwind
├── __tests__/
│   ├── components/           # Component tests
│   ├── pages/                # Page tests
│   └── api/                  # API tests
└── ...config files
```

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blog-post-viewer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

## API Endpoints

### GET /api/posts

Returns a list of blog posts in JSON format.

**Response:**
```json
{
  "posts": [
    {
      "id": 1,
      "title": "Post Title",
      "content": "Full post content...",
      "author": "Author Name",
      "createdAt": "2024-01-15T10:00:00Z",
      "excerpt": "Post excerpt..."
    }
  ]
}
```

## Data Fetching

The `/posts` page uses `getStaticProps` with Incremental Static Regeneration:

- **Revalidation**: Every hour (3600 seconds) for successful requests
- **Error Handling**: Falls back to empty posts array with 1-minute revalidation
- **Environment Support**: Automatically switches between development and production URLs

## Testing

The project includes comprehensive unit tests covering:

### Component Tests
- **PostList**: Tests rendering, click handlers, empty states
- **PostDetail**: Tests modal behavior, content display, close functionality

### Page Tests
- **PostsPage**: Tests component integration and state management
- **getStaticProps**: Tests data fetching logic, error handling, and revalidation

### API Tests
- **/api/posts**: Tests endpoint behavior, response structure, and error handling

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- PostList.test.tsx
```

## Technologies Used

- **Next.js 14** - React framework with SSR/SSG
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities
- **node-mocks-http** - API testing utilities

## Key Features

### Static Site Generation
- Uses `getStaticProps` for build-time data fetching
- Implements ISR for automatic revalidation
- Optimized for performance and SEO

### Component Architecture
- **PostList**: Displays post titles with excerpts and metadata
- **PostDetail**: Modal component for full post content
- Proper separation of concerns and reusability

### Error Handling
- Graceful fallbacks for API failures
- User-friendly error states
- Comprehensive error logging

### Accessibility
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
