export interface StoryChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  pullQuote?: string;
  paragraphs: string[];
  image?: {
    src: string;
    alt: string;
    caption: string;
  };
  stat?: {
    value: string;
    label: string;
    description: string;
  };
  readTime: string;
}

export interface HelplineResource {
  name: string;
  number: string;
  description: string;
  available: string;
  tel: string;
}
