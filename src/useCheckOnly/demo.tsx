import { useCheckOnly } from 'Al-hooks';
import React, { useEffect, useState } from 'react';

export default function demo() {
    const { getToken, checkOnly } = useCheckOnly();
    const [data, setData] = useState<number>();

    const main = (t: number) => {
        const token = getToken();
        setTimeout(() => {
            const data = Date.now();
            console.log(data, t);

            checkOnly(() => {
                setData(data);
            }, token);
        }, t);
    };

    useEffect(() => {
        main(2000);
        main(1000);
    }, []);

    return (
        <div>
            demo
            <p>data: {data}</p>
        </div>
    );
}
