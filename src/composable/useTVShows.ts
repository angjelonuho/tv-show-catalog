import { ref, watch } from 'vue';
import { useFetchCached } from './useFetch';
import { TV_SHOWS_CACHE_KEY } from '../constants/tvShowsApi';

export const useTVShows = () => {

    const tvShows = ref<TVShow[]>([]);
    const totalShows = ref<number>(0);
    const page = ref<number>(1);
    const url: string = `${import.meta.env.VITE_TVMAZE_API_URL}/shows?page=${page.value}`;

    const { data, error, loading, fetchData } = useFetchCached(TV_SHOWS_CACHE_KEY, url);

    const fetchTvShows = async (): Promise<void> => {
        try {
            await fetchData();
            tvShows.value = data.value;
            totalShows.value = data.value.length;
            console.log('[useTVShows] total:',  totalShows.value)
        } catch (err) {
            console.log('[useTVShows]' + err);
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
        fetchTvShows,
    };
};
