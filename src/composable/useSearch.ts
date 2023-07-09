import { type Ref, ref } from 'vue';
import { useFetch } from './useFetch';

export const useSearch = (): TVShowSearchResult => {
    const searchQuery = ref('');
    const searchResults: Ref<TVShow[]> = ref([]);
    const loading = ref(false);
    const error: Ref<string | null> = ref(null)

    const search = async () => {
        if (searchQuery.value.length === 3) {
            try {
                loading.value = true;
                const url = `${import.meta.env.VITE_TVMAZE_API_URL}/search/shows?q=${searchQuery.value}`;
                const { data, fetchData } = useFetch(url);
                await fetchData();
                if (data) {
                    searchResults.value = data.value.map((item: { show: any }) => item.show);
                } else {
                    searchResults.value = [];
                    error.value = 'No results found';
                }
            } catch (err) {
                console.error('[useSearch] Error:', err);
                loading.value = false;
            } finally {
                loading.value = false;
            }

        } else {
            searchResults.value = [];
        }
    };

    return {
        searchQuery,
        searchResults,
        loading,
        error,
        search,
    };
};
