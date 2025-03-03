import { useAsyncMemo } from 'Al-hooks';
import React from 'react';

export default function demo() {
    const memo1 = useAsyncMemo(
        () =>
            new Promise<string>((res) => {
                setTimeout(() => {
                    res('123');
                }, 2000);
            }),
        [],
    );

    const memo2 = useAsyncMemo(() => 321, []);

    return (
        <div>
            <p>demo</p>
            <p>memo1 result: {memo1 ?? '-'}</p>
            <p>memo2 result: {memo2 ?? '-'}</p>
        </div>
    );
}
