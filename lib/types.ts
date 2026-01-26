// Type definitions for API responses

export interface Game {
  id: number;
  name: string;
  slug: string;
  released: string;
  rating: number;
  background_image?: string;
  platforms?: Platform[];
  genres?: Genre[];
  esrb_rating?: ESRBRating;
}

export interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface ESRBRating {
  id: number;
  name: string;
  slug: string;
}

export interface RAWGGamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export interface IGDBGame {
  id: number;
  name: string;
  summary?: string;
  rating?: number;
  cover?: {
    id: number;
    url: string;
  };
  release_dates?: Array<{
    id: number;
    human: string;
  }>;
}

export interface IGDBGamesResponse {
  games: IGDBGame[];
}

export interface APIError {
  message: string;
  status?: number;
  code?: string;
}
