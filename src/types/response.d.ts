declare interface UseFetchResponse<T> {
    data: Ref<T | null>
    error: Ref<string | null>
    loading: Ref<boolean>
    response: Ref<AxiosResponse<T> | null>
    fetchData: () => Promise<void>
}

declare interface UseFetchCachedResponse<T> extends UseFetchResponse<T> {
    update: () => void
    clear: () => void
}
