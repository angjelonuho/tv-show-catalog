import { ref, watch } from 'vue';
import { TV_SHOWS_CACHE_KEY } from '../constants/tvShowsApi';
import { useFetchCached } from './useFetch';

export const useTVShowsByGenre = () => {
    const tvShows = ref<TVShow[]>([]);
    const totalShows = ref<number>(0);
    const page = ref<number>(1);
    const url: string = `${import.meta.env.VITE_TVMAZE_API_URL}/shows?page=${page.value}`;

    const { data, error, loading, fetchData } = useFetchCached(TV_SHOWS_CACHE_KEY, url);

    const fetchTvShowsByGenre = async (genre: string): Promise<void> => {
        try {
            await fetchData();
            if (data) {
                const showsByGenre = data.value.filter((show: { genres: string | string[]; }) => show.genres.includes(genre));
                tvShows.value = showsByGenre;
                totalShows.value = data.value.length;
            }
        } catch (err) {
            console.error('[useTVShowsByGenre] Error:', err);
        }
    };

    const currentPage = (value: number): void => {
        page.value = value
    }

    watch(page, currentPage)

    return {
        tvShows,
        totalShows,
        currentPage,
        loading,
        error,
        page,
        fetchTvShowsByGenre,
    };

}
