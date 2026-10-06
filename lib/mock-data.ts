export type Channel = {
  id: string;
  name: string;
  slug: string;
  category: string;
  stream_url: string;
  logo_url: string;
  is_live: boolean;
  views: number;
};

export const mockChannels: Channel[] = [
  {
    id: "1",
    name: "Somoy TV",
    slug: "somoy-tv",
    category: "News",
    stream_url: "https://www.w3schools.com/html/mov_bbb.mp4",
    logo_url: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=200&auto=format&fit=crop",
    is_live: true,
    views: 24500
  },
  {
    id: "2",
    name: "Jamuna TV",
    slug: "jamuna-tv",
    category: "General",
    stream_url: "https://www.w3schools.com/html/movie.mp4",
    logo_url: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=200&auto=format&fit=crop",
    is_live: true,
    views: 19300
  },
  {
    id: "3",
    name: "Sports Bangla",
    slug: "sports-bangla",
    category: "Sports",
    stream_url: "https://www.w3schools.com/html/mov_bbb.mp4",
    logo_url: "https://images.unsplash.com/photo-1541534401786-2077eed87a3d?q=80&w=200&auto=format&fit=crop",
    is_live: true,
    views: 12250
  }
];

export const mockCategories = [
  { id: "c1", name: "News", slug: "news" },
  { id: "c2", name: "General", slug: "general" },
  { id: "c3", name: "Sports", slug: "sports" }
];
