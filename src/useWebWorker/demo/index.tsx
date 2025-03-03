import { useWebWorker } from 'Al-hooks';
import React, { useEffect } from 'react';
import TestWorker from './test.worker';

// @ts-ignore
const testWorker = new TestWorker();


export default function demo() {
    const { value, sendData ,getValue} = useWebWorker<string, number>(testWorker);

    useEffect(() => {
        sendData(Date.now());
        getValue().then(res => {
            console.log(res);
            
        })
    }, []);

    return (
        <div>
            demo
            <p>worker Value => {value}</p>
        </div>
    );
}
