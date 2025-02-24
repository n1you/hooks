import { useEffect, useMemo } from 'react';
import './App.css';
import { useAsyncMemo, useExecuteOnce, useState } from './hooks';
import useCheckOnly from './hooks/useCheckOnly';

function App() {
    const [num, serNum] = useState(() => 1);
    const [a, seta] = useState({ name: '1' });

    const newName = useAsyncMemo(() => {
        return a.name + ' ---------->';
    }, [a.name]);

    const { getToken, checkOnly } = useCheckOnly();
    const [data, setData] = useState<number>();

    const main = (t: number) => {
        const token = getToken();
        setTimeout(() => {
            checkOnly(() => {
                setData(Date.now());
            }, token);
        }, t);
    };

    useEffect(() => {
        main(2000);
        main(1000);
    }, []);

    const asyncMemoData = useAsyncMemo(() => {
        return new Promise<string>((res) => {
            setTimeout(() => {
                res('useAsyncMemo data ' + Date.now());
            }, 1000);
        });
    }, []);

    console.log(asyncMemoData);

    const res = useExecuteOnce(() => {
        console.log('run useExecuteOnce');
        return 123;
    });

    console.log(res);

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
            data {data}
            <p></p>
            {num}
            <div>name: {a.name}</div>
            <p>123</p>
            {newName}
        </div>
    );
}

const App1 = () => {
    const asyncMemoData = useAsyncMemo(() => {
        return new Promise<string>((res) => {
            setTimeout(() => {
                res('useAsyncMemo data ' + Date.now());
            }, 1000);
        });
    }, []);

    console.log(asyncMemoData, Date.now());
    return <div>13</div>;
};

export default App1;
