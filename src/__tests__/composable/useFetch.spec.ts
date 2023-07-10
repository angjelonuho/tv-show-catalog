// import useFetch from '../../composable/useFetch'
// import { mount } from '@vue/test-utils'
// import { describe, it, expect } from 'vitest'

// describe('useFetch', () => {
//     it('fetches data successfully', async () => {
//         const url = 'https://example.com/api/data'
//         const responseData = { foo: 'bar' }
//         const mockResponse = { data: responseData }
//         const mockAxiosRequest = jest.fn().mockResolvedValue(mockResponse)
//         jest.mock('axios', () => ({
//             request: mockAxiosRequest,
//         }))

//         const wrapper = mount(() => {
//             const { data, loading, error } = useFetch(url)
//             return { data, loading, error }
//         })

//         expect(wrapper.vm.loading).toBe(true)

//         await wrapper.vm.$nextTick()

//         expect(mockAxiosRequest).toHaveBeenCalledWith({
//             url,
//             headers: {},
//         })

//         expect(wrapper.vm.data).toEqual(responseData)
//         expect(wrapper.vm.loading).toBe(false)
//         expect(wrapper.vm.error).toBe(null)
//     })

//     it('handles error during data fetching', async () => {
//         const url = 'https://example.com/api/data'
//         const errorMessage = 'Error fetching data'
//         const mockAxiosRequest = jest.fn().mockRejectedValue(new Error(errorMessage))
//         jest.mock('axios', () => ({
//             request: mockAxiosRequest,
//         }))

//         const wrapper = mount(() => {
//             const { data, loading, error } = useFetch(url)
//             return { data, loading, error }
//         })

//         expect(wrapper.vm.loading).toBe(true)

//         await wrapper.vm.$nextTick()

//         expect(mockAxiosRequest).toHaveBeenCalledWith({
//             url,
//             headers: {},
//         })

//         expect(wrapper.vm.data).toBe(null)
//         expect(wrapper.vm.loading).toBe(false)
//         expect(wrapper.vm.error).toBe(errorMessage)
//     })
// })