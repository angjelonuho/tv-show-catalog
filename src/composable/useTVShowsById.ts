import { ref } from 'vue';
import { useFetchCached } from './useFetch';
import { TV_SHOWS_CACHE_KEY } from '../constants/tvShowsApi';

export const useTVShowById = (): TVShowByIdResponse => {
    const tvShowById = ref<TVShow>();
    const page = ref<number>(1);

    const url: string = `${import.meta.env.VITE_TVMAZE_API_URL}/shows?page=${page.value}`;
    const { data, error, loading, fetchData } = useFetchCached(TV_SHOWS_CACHE_KEY, url);

    const fetchTVShowById = async (id: string) => {
        try {
            await fetchData();
            tvShowById.value = data.value.find((tvShow: TVShow) => tvShow.id === Number(id));
        } catch (error) {
            console.log('[useTVShowById]', error);
        }
    };

    return {
        tvShowById,
        loading,
        error,
        fetchTVShowById,
    };
};
