export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  excerpt: string;
}

export interface PostsResponse {
  posts: Post[];
} 