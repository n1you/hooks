import { useEffect, useMemo } from 'react';
import './App.css';
import { useAsyncMemo, useState } from './hooks';

function App() {
    const [num, serNum] = useState(() => 1);
    const [a, seta] = useState({ name: '1' });

    const newName = useAsyncMemo(() => {
        return a.name + ' ---------->';
    }, [a.name]);

    return (
        <div
            style={{ padding: 20 }}
            onClick={() => {
                serNum(
                    (e) => e + 1,
                    (value) => {
                        console.log(value === num);
                        console.log('new number', value);

                        console.log(num);
                    },
                );
                seta({ name: new Date().getTime().toString() }, (b) => {
                    console.log(a);
                    console.log(b);
                });
            }}
        >
            {num}
            <div>name: {a.name}</div>

            <p>123</p>
            {newName}
        </div>
    );
}

export default App;
