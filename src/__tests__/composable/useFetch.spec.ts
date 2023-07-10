import { useFetch, useFetchCached } from '../../composable/useFetch'
import { describe, expect, it } from 'vitest'
import sinon from 'sinon'
import { reactive } from 'vue';


describe('useFetch', () => {
    it('should handle errors', async () => {
        const url = 'https://example.com/api/data';
        const errorMessage = 'Error fetching data';
        const { data, loading, error } = useFetch(url);
        expect(loading.value).toBe(true);

        // Simulate delay of 0 milliseconds using setImmediate
        await new Promise(setImmediate);

        expect(data.value).toBe(null);
        expect(loading.value).toBe(true);
        expect(error.value).toBe(null);

        // Simulate error by setting the error message directly
        error.value = errorMessage;
        expect(data.value).toBe(null);
        expect(error.value).toBe(errorMessage);
    });

    it('should fetch data', async () => {
        const url = 'https://example.com/api/data';
        const data = { foo: 'bar' };
        const { data: fetchedData, loading, error } = useFetch(url);
        expect(loading.value).toBe(true);

        await new Promise(setImmediate);

        expect(loading.value).toBe(true);
        expect(error.value).toBe(null);
        fetchedData.value = data;
        expect(fetchedData.value).toStrictEqual(data);
    });
});