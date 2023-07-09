import { computed, reactive, ref, type Ref } from 'vue'
import axios, { type AxiosResponse, AxiosError, type AxiosRequestConfig } from 'axios'
import CacheService from '../utils/cacheUtils'

export const useFetch = <T>(url: string, config: AxiosRequestConfig = {}, skipFetch: boolean = false): UseFetchResponse<T> => {
    const data: Ref<T | null> = ref(null)
    const error: Ref<string | null> = ref(null)
    const loading: Ref<boolean> = ref(false)
    const response: Ref<AxiosResponse<T> | null> = ref(null)

    const fetchData = async () => {
        loading.value = true
        try {
            const result: AxiosResponse<T> = await axios.request({ url, ...config })
            response.value = result
            data.value = result.data
        } catch (err) {
            error.value = (err as AxiosError).message || null
        } finally {
            loading.value = false
        }
    }

    if (skipFetch) {
        console.log('skipping fetch for url: ', url)
    } else {
        console.log('fetching data for url: ', url)
        fetchData()
    }

    return { data, error, loading, response, fetchData }
}

const cacheService: Record<string, any> = reactive(new CacheService<TVShow[]>())
export const useFetchCached = <T>(key: string, url: string, config: AxiosRequestConfig = {}): UseFetchCachedResponse<T> => {
    const info = useFetch(url, config, true)
    const response: Ref<AxiosResponse<T> | null> = computed(() => cacheService.get(key))
    const data: Ref<T | null> = computed(() => response.value?.data || null)

    const update = (): void => { cacheService.set(key, info.response.value) }
    const clear = (): void => { cacheService.set(key, null) }

    const fetchData = async (): Promise<void> => {
        try {
            await info.fetchData()
            update()
        } catch {
            clear()
        }
    }
    
    if (response.value === undefined) {
        console.log('no cached data found for key: ', key, 'fetching data...')
        fetchData()
    } else {
        console.log('cached data found for key: ', key)
    }

    return { ...info, data, response, fetchData, update, clear }
}