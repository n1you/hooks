import { useFuzzySearchSort } from 'Al-hooks';
import React from 'react';

export default function demo() {
    const { onSearch, data } = useFuzzySearchSort({
        dataSource: [
            { label: '0123', value: '0123' },
            { label: '123', value: '123' },
            { label: '1234', value: '1234' },
            { label: '001234', value: '001234' },
        ],
    });

    return (
        <div>
            <input
                type="text"
                onChange={(e) => {
                    onSearch(e.target.value);
                }}
            />
            <pre>{JSON.stringify(data)}</pre>
        </div>
    );
}
