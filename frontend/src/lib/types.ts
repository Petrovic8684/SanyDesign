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

interface Faq {
  id: number | undefined;
  question: string;
  answer: string;
}

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export type { Project, Tool, Service, Faq, Message };
