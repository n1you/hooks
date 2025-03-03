import { useExecuteOnce } from 'Al-hooks';
import React, { useState } from 'react';

export default function demo() {
    const [time, setTime] = useState<number>();
    const [count, setCount] = useState<number>(0);

    useExecuteOnce(
        () => {
            setTimeout(() => {
                console.log(Date.now());

                setTime(Date.now());
            }, Math.random() * 2500);
        },
        { executionPhase: ['mount', 'render'] },
    );

    return (
        <div>
            one render: {time}
            <p>count: {count}</p>
            <button onClick={() => setCount((e) => e + 1)}>click</button>
        </div>
    );
}
