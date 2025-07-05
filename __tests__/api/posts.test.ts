import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/posts';

describe('/api/posts', () => {
  it('returns posts for GET request', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('posts');
    expect(Array.isArray(data.posts)).toBe(true);
    expect(data.posts.length).toBeGreaterThan(0);
    
    // Check structure of first post
    const firstPost = data.posts[0];
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('content');
    expect(firstPost).toHaveProperty('author');
    expect(firstPost).toHaveProperty('createdAt');
    expect(firstPost).toHaveProperty('excerpt');
  });

  it('returns 405 for non-GET requests', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });

  it('returns 405 for PUT requests', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });

  it('returns 405 for DELETE requests', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });

  it('returns posts with correct data structure', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    const data = JSON.parse(res._getData());
    const posts = data.posts;

    posts.forEach((post: any) => {
      expect(typeof post.id).toBe('number');
      expect(typeof post.title).toBe('string');
      expect(typeof post.content).toBe('string');
      expect(typeof post.author).toBe('string');
      expect(typeof post.createdAt).toBe('string');
      expect(typeof post.excerpt).toBe('string');
      
      // Check that content is not empty
      expect(post.content.length).toBeGreaterThan(0);
      expect(post.title.length).toBeGreaterThan(0);
      expect(post.author.length).toBeGreaterThan(0);
    });
  });

  it('returns posts with unique IDs', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    const data = JSON.parse(res._getData());
    const posts = data.posts;
    const ids = posts.map((post: any) => post.id);
    
    // Check that all IDs are unique
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('returns posts with valid date strings', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    const data = JSON.parse(res._getData());
    const posts = data.posts;

    posts.forEach((post: any) => {
      const date = new Date(post.createdAt);
      expect(date.toString()).not.toBe('Invalid Date');
    });
  });
}); 