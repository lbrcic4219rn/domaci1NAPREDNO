export interface Annotation {
  label: string;
  categories?: string[];
  abstract?: string;
  confidence: number;
  image?: {
    thumbnail: string;
  };
}

export interface DetectedLanguage {
  lang: string;
  confidence: number;
}

export interface Log {
  timestamp: Date;
  endpoint: string;
}
