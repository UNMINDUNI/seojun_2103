export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export type InstagramTab = "official" | "private";

export interface SecretPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  commentsCount: number;
  date: string;
  comments: Array<{
    id: string;
    username: string;
    text: string;
    time: string;
    isUser?: boolean;
    replies?: Array<{
      username: string;
      text: string;
      time: string;
    }>;
  }>;
  title?: string;
  category?: string;
  subtitle?: string;
  badge?: string;
}

export interface UserSettings {
  nickname: string;
  gender: "female" | "male";
}
