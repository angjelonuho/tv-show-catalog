// This composable is used to sort an array of objects by a property of the objects.

export enum SortDirection {
    Ascending = 'asc',
    Descending = 'desc'
}

const getValueByPath = <T>(obj: T, path: string): unknown => {
    const parts = path.split('.');
    let value: unknown = obj;
    for (const part of parts) {
        value = (value as { [key: string]: unknown })[part];
        if (value === undefined) {
            break;
        }
    }
    return value;
}

export const useSortByProperty = <T>(array: T[], property: string, direction: SortDirection): T[] => {
    return array.slice().sort((a, b) => {
        const valueA = getValueByPath(a, property);
        const valueB = getValueByPath(b, property);

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return direction === SortDirection.Descending ? valueB - valueA : valueA - valueB;
        }

        const stringA = String(valueA || '');
        const stringB = String(valueB || '');
        return direction === SortDirection.Descending ? stringB.localeCompare(stringA) : stringA.localeCompare(stringB);
    });
}
