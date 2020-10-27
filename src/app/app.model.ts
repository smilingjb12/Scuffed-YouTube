export interface Video {
  id: number;
  previewUrl: string;
  likes: number;
  dislikes: number;
  title: string;
  description: string;
  category: string;
  views: number;
}

export interface VideoComment {
  id: number;
  videoId: number;
  text: string;
  postedAt: Date;
}

export interface ProfileStats {
  watched: number;
  liked: number;
}