# Blog Post Viewer

A simple blog post viewer in Next.js using getStaticProps or getServerSideProps and comprehensive unit testing.
![image](https://github.com/user-attachments/assets/c45120d5-ca6b-4b64-b181-cb417f7e9eaf)


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

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- PostList.test.tsx
```

