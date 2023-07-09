import { ref, watch } from 'vue';
import { TV_SHOWS_CACHE_KEY } from '../constants/tvShowsApi';
import { useFetchCached } from './useFetch';

export const useTVShowsByGenre = () => {
    const tvShowsByGenre = ref<TVShow[]>([]);
    const totalShowsByGenre = ref<number>(0);
    const pageGenre = ref<number>(1);
    const url: string = `${import.meta.env.VITE_TVMAZE_API_URL}/shows?pageGenre=${pageGenre.value}`;

    const { data, error, loading, fetchData } = useFetchCached(TV_SHOWS_CACHE_KEY, url);

    const fetchTvShowsByGenre = async (genre: string): Promise<void> => {
        try {
            await fetchData();
            if (data) {
                const showsByGenre = data.value.filter((show: { genres: string | string[]; }) => show.genres.includes(genre));
                tvShowsByGenre.value = showsByGenre;
                totalShowsByGenre.value = data.value.length;
            }
        } catch (err) {
            console.error('[useTVShowsByGenre] Error:', err);
        }
    };

    const currentPage = (value: number): void => {
        pageGenre.value = value
    }

    watch(pageGenre, currentPage)

    return {
        tvShowsByGenre,
        totalShowsByGenre,
        currentPage,
        tvShowByGenreLoading: loading,
        tvShowByGenreError: error,
        pageGenre,
        fetchTvShowsByGenre,
    };

}
