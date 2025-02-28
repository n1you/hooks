import { useDeferredValue, useMemo, useState } from 'react';
import { getFuzzySearchSortData } from './fn';

/**
 * 
 * @demo
 * ```
    const { onSearch, data } = useFuzzySearchSort({
        dataSource: [ 
            { label: '0123', value: '0123' },
            { label: '123', value: '123' },
        ]
    })
    onSearch('1')
    // data => [
    //  { label: '123', value: '123' },
    //  { label: '0123', value: '0123' },
    // ]
 * ```
 */
export default function useFuzzySearchSort<T extends Record<string, string>>(params: { dataSource: Array<T>; sortKey?: keyof T }) {
    const { dataSource, sortKey = 'label' } = params;
    const [_sortValue, setSortValue] = useState<string>();
    const onSearch = (v: string) => {
        setSortValue(v);
    };

    const sortValue = useDeferredValue(_sortValue);

    const data = useMemo(() => {
        return getFuzzySearchSortData(dataSource, sortValue, sortKey);
    }, [dataSource, sortKey, sortValue]);

    return {
        isLatest: sortValue === _sortValue,
        data,
        onSearch
    };
}
