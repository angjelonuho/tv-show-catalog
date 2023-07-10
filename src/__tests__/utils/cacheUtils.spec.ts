import { describe, expect, it } from 'vitest';
import CacheService from '../../utils/cacheUtils';

describe('CacheService', () => {
    it('should get and set values in the cache', () => {
        const cacheService = new CacheService<string>();

        const key = 'foo';
        const value = 'bar';
        cacheService.set(key, value);
        const retrievedValue = cacheService.get(key);
        expect(retrievedValue).toBe(value);
    });

    it('should return null for non-existing keys', () => {
        const cacheService = new CacheService<string>();

        const key = 'nonExistingKey';
        const retrievedValue = cacheService.get(key);

        expect(retrievedValue).toBeNull();
    });

    it('should clear values from the cache', () => {
        const cacheService = new CacheService<string>();

        const key = 'foo';
        const value = 'bar';

        cacheService.set(key, value);
        cacheService.clear(key);
        const retrievedValue = cacheService.get(key);

        expect(retrievedValue).toBeNull();
    });

    it('should not clear other values from the cache', () => {
        const cacheService = new CacheService<string>();

        const key = 'foo';
        const value = 'bar';
        const otherKey = 'otherFoo';
        const otherValue = 'otherBar';

        cacheService.set(key, value);
        cacheService.set(otherKey, otherValue);
        cacheService.clear(key);
        const retrievedValue = cacheService.get(otherKey);
        expect(retrievedValue).toBe(otherValue);
    });

    it('should not return a value after it has been cleared', () => {
        const cacheService = new CacheService<string>();
        const key = 'foo';
        const value = 'bar';

        cacheService.set(key, value);
        cacheService.clear(key);
        const retrievedValue = cacheService.get(key);
        expect(retrievedValue).toBeNull();
    })

});
