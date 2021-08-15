export interface VideoSource {
  size: number;
  src: string;
}
  
export interface Video {
  title: string;
  description: string;
  slug: string;
  sources: VideoSource[];
  preview: string;
}
