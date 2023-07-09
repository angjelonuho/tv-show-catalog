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
    tvShowsByGenre: Ref<TVShow[]>;
    totalShowsByGenre: Ref<number>;
    currentPage: (value: number) => void;
    tvShowByGenreLoading: Ref<boolean>;
    tvShowByGenreError: Ref<string | null>;
    pageGenre: Ref<number>;
    fetchTvShowsByGenre: (genre: string) => Promise<void>;
}

declare interface TVShowSearchResult {
    searchQuery: Ref<string>;
    searchResults: Ref<TVShow[]>;
    loading: Ref<boolean>;
    error: Ref<string | null>;
    search: () => Promise<void>;
}