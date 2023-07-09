import { ref } from 'vue';
import { useFetchCached } from './useFetch';
import { TV_SHOWS_CACHE_KEY } from '../constants/tvShowsApi';

export const useTVShowCategories = () => {
    const categories = ref<string[]>([]);
    const page = ref<number>(1);
    const url: string = `${import.meta.env.VITE_TVMAZE_API_URL}/shows?page=${page.value}`;
    const { data, error, loading, fetchData } = useFetchCached(TV_SHOWS_CACHE_KEY, url);

    const fetchCategories = async (): Promise<void> => {
        try {
            await fetchData();
            if (data) {
                const uniqueGenres = new Set<string>();
                for (const show of data.value) {
                    for (const genre of show.genres) {
                        uniqueGenres.add(genre);
                    }
                }
                categories.value = ['All', ...Array.from(uniqueGenres)];
            }
        } catch (err) {
            console.error('[useTVShowCategories] Error:', err);
        }
    };

    return {
        categories,
        loading,
        error,
        fetchCategories,
    };
};
