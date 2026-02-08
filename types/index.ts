export interface Incident {
  id: string;
  type: "traffic" | "accident" | "police" | "construction" | "hazard" | "other";
  title: string;
  description: string;
  location: string;
  distance: string;
  timestamp: string;
  verified: boolean;
  upvotes?: number;
}

export interface NewsItem {
  id: string;
  type: "traffic" | "closure" | "accident";
  title: string;
  description: string;
  source: string;
  timestamp: string;
  image?: string;
  verified: boolean;
}

export interface UserProfile {
  name: string;
  memberSince: string;
  trustScore: number;
  reports: number;
  confirmations: number;
  points: number;
  verified: boolean;
}
