import { ref, watch } from 'vue';
import { useFetchCached } from './useFetch';

export const useTVShows = () => {

    const tvShows = ref<TVShow[]>([]);
    const totalShows = ref<number>(0);
    const page = ref<number>(1);

    const cacheKey = 'tv-shows';
    const url = `${import.meta.env.VITE_TVMAZE_API_URL}/shows?page=${page.value}`;

    const { data, error, loading, fetchData } = useFetchCached(cacheKey, url);


    const fetchTvShows = async (): Promise<void> => {
        try {
            await fetchData();
            tvShows.value = data.value;
            totalShows.value = data.value.length;
        } catch (err) {
            console.log(err);
        }
    };

    const currentPage = (value: number): void => {
        page.value = value
    }
    watch(page, fetchTvShows)

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
