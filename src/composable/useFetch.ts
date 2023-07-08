import { computed, reactive, ref, type Ref } from 'vue'
import axios, { type AxiosResponse, AxiosError, type AxiosRequestConfig } from 'axios'

export const useFetch = <T>(url: string, config: AxiosRequestConfig = {}, skipFetch: boolean = false): UseFetchResponse<T> => {
    const data: Ref<T | null> = ref(null)
    const error: Ref<string | null> = ref(null)
    const loading: Ref<boolean> = ref(false)
    const response: Ref<AxiosResponse<T> | null> = ref(null)

    const fetchData = async (): Promise<void> => {
        loading.value = true
        try {
            const result: AxiosResponse<T> = await axios.request({ url, ...config })
            response.value = result
            data.value = result.data
        } catch (err) {
            error.value = (err as AxiosError).message
        } finally {
            loading.value = false
        }
    }

    !skipFetch && fetchData()
    return { data, error, loading, response, fetchData }
}

// cached fetch because of limited use of the api
const cacheMap: Map<string, any> = reactive(new Map<string, any>())
export const useFetchCached = <T>(key: string, url: string, config: AxiosRequestConfig = {}): UseFetchCachedResponse<T> => {
    const info = useFetch(url, config, true)
    const update = (): void => { cacheMap.set(key, info.response.value) }
    const clear = (): void => { cacheMap.set(key, null) }

    const fetchData = async (): Promise<void> => {
        try {
            await info.fetchData()
            update()
        } catch {
            clear()
        }
    }

    const response: Ref<AxiosResponse<T> | null> = computed(() => cacheMap.get(key))
    const data: Ref<T | null> = computed(() => response.value?.data || null)

    if (response.value === undefined) {
        console.log('no cached data found for key: ', key, 'fetching data...')
        fetchData()
    } else {
        console.log('cached data found for key: ', key, 'data: ', response.value?.data || 'null')
    }

    return { ...info, data, response, fetchData, update, clear }
}