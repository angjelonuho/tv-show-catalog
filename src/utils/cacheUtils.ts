class CacheService<T> {
    private cache: Record<string, T> = {};

    public get(key: string): T | null {
        return this.cache[key] || null;
    }

    public set(key: string, value: T): void {
        this.cache[key] = value;
    }

    public clear(key: string): void {
        delete this.cache[key];
    }
}

export default CacheService;
