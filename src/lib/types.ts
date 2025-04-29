interface Project {
  id: number | undefined;
  coverImg: string;
  title: string;
  images: string[];
  description: string;
  tools: string[];
  liveUrl: string | null;
}

interface Tool {
  id: number | undefined;
  name: string;
  emoji: string;
  url: string;
}

interface Service {
  id: number | undefined;
  name: string;
  description: string;
  price: string;
}

export type { Project, Tool, Service };
