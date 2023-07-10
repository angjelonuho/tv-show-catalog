import { describe, expect, it } from 'vitest'
import { SortDirection, useSortByProperty } from '../../composable/useSortByProperty';


describe('useSortByProperty', () => {
    it('should sort array of objects in ascending order by a numeric property', () => {
        const array = [
            { id: 1, name: 'John', age: 30 },
            { id: 2, name: 'Jane', age: 25 },
            { id: 3, name: 'Bob', age: 40 },
        ];
        const property = 'age';
        const direction = SortDirection.Ascending;

        const sortedArray = useSortByProperty(array, property, direction);

        expect(sortedArray).toEqual([
            { id: 2, name: 'Jane', age: 25 },
            { id: 1, name: 'John', age: 30 },
            { id: 3, name: 'Bob', age: 40 },
        ]);
    });

    it('should sort array of objects in descending order by a numeric property', () => {
        const array = [
            { id: 1, name: 'John', age: 30 },
            { id: 2, name: 'Jane', age: 25 },
            { id: 3, name: 'Bob', age: 40 },
        ];
        const property = 'age';
        const direction = SortDirection.Descending;

        const sortedArray = useSortByProperty(array, property, direction);

        expect(sortedArray).toEqual([
            { id: 3, name: 'Bob', age: 40 },
            { id: 1, name: 'John', age: 30 },
            { id: 2, name: 'Jane', age: 25 },
        ]);
    });

    it('should sort array of objects in ascending order by a string property', () => {
        const array = [
            { id: 1, name: 'John', role: 'Admin' },
            { id: 2, name: 'Jane', role: 'User' },
            { id: 3, name: 'Bob', role: 'Moderator' },
        ];
        const property = 'role';
        const direction = SortDirection.Ascending;

        const sortedArray = useSortByProperty(array, property, direction);

        expect(sortedArray).toEqual([
            { id: 1, name: 'John', role: 'Admin' },
            { id: 3, name: 'Bob', role: 'Moderator' },
            { id: 2, name: 'Jane', role: 'User' },
        ]);
    });

    it('should sort array of objects in descending order by a string property', () => {
        const array = [
            { id: 1, name: 'John', role: 'Admin' },
            { id: 2, name: 'Jane', role: 'User' },
            { id: 3, name: 'Bob', role: 'Moderator' },
        ];
        const property = 'role';
        const direction = SortDirection.Descending;

        const sortedArray = useSortByProperty(array, property, direction);

        expect(sortedArray).toEqual([
            { id: 2, name: 'Jane', role: 'User' },
            { id: 3, name: 'Bob', role: 'Moderator' },
            { id: 1, name: 'John', role: 'Admin' },
        ]);
    });
});