declare interface TVShow {
    id: number
    name: string
    genres: string[]
    premiered: string
    rating: number
    image: string
    summary: string
}

declare interface TVShowsByGenreResponse {
    tvShows: TVShow[];
    totalShows: number;
    loading: Ref<boolean>;
    error: Ref<string | null>;
  }
