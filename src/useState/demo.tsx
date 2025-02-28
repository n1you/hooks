import { useState } from 'Al-hooks';
import React from 'react';

export default function demo() {
    const [a, setA] = useState(0);
    return (
        <div>
            <p>text: {a}</p>
            <button
                onClick={() => {
                    setA((e) => e + 1);
                }}
            >
                add
            </button>
        </div>
    );
}
