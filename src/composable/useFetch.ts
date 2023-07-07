import { ref, type Ref } from 'vue'
import axios, { type AxiosResponse, AxiosError, type AxiosRequestConfig } from 'axios'

interface UseFetchResponse<T> {
    data: Ref<T | null>
    error: Ref<string | null>
    loading: Ref<boolean>
    response: Ref<AxiosResponse<T> | null>
    fetchData: () => Promise<void>
}

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