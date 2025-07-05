import { getStaticProps } from '@/pages/posts';

// Mock fetch globally
global.fetch = jest.fn();

describe('getStaticProps', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset environment variables
    delete process.env.NODE_ENV;
  });

  it('fetches posts successfully and returns them', async () => {
    const mockPosts = [
      {
        id: 1,
        title: 'Test Post',
        content: 'Test content',
        author: 'John Doe',
        createdAt: '2024-01-15T10:00:00Z',
        excerpt: 'Test excerpt'
      }
    ];

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ posts: mockPosts })
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getStaticProps({} as any);

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/posts');
    expect(result).toEqual({
      props: {
        posts: mockPosts
      },
      revalidate: 3600
    });
  });

  it('uses production URL when NODE_ENV is production', async () => {
    process.env.NODE_ENV = 'production';

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ posts: [] })
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await getStaticProps({} as any);

    expect(global.fetch).toHaveBeenCalledWith('https://your-domain.com/api/posts');
  });

  it('handles API error and returns empty posts array', async () => {
    const mockResponse = {
      ok: false
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = await getStaticProps({} as any);

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching posts:', expect.any(Error));
    expect(result).toEqual({
      props: {
        posts: []
      },
      revalidate: 60
    });

    consoleSpy.mockRestore();
  });

  it('handles fetch error and returns empty posts array', async () => {
    const fetchError = new Error('Network error');
    (global.fetch as jest.Mock).mockRejectedValue(fetchError);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = await getStaticProps({} as any);

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching posts:', fetchError);
    expect(result).toEqual({
      props: {
        posts: []
      },
      revalidate: 60
    });

    consoleSpy.mockRestore();
  });

  it('handles JSON parsing error', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = await getStaticProps({} as any);

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching posts:', expect.any(Error));
    expect(result).toEqual({
      props: {
        posts: []
      },
      revalidate: 60
    });

    consoleSpy.mockRestore();
  });

  it('returns correct revalidate values', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ posts: [] })
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getStaticProps({} as any);

    expect(result.revalidate).toBe(3600); // 1 hour for success
  });

  it('returns shorter revalidate value on error', async () => {
    const mockResponse = {
      ok: false
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = await getStaticProps({} as any);

    expect(result.revalidate).toBe(60); // 1 minute for error

    consoleSpy.mockRestore();
  });
}); 