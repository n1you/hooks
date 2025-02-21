import { useDeferredValue, useMemo, useState } from 'react';
import { getFuzzySearchSortData } from './fn';

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
