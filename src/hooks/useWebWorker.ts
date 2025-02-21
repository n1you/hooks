import { useCallback, useEffect, useRef, useState } from 'react';

interface WorkerConstructor {
    new (): Worker;
}
/**
 *  返回结果只能在 函数组件中使用
 */
export function WorkerWrapper<V, P>(WorkerClass: WorkerConstructor) {
    const workerInstance = new WorkerClass();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return () => useWebWorker<V, P>(workerInstance);
}

/**
 *
 *  接收 worker
 *  - vite： import xxx form 'file?worker'
 *  - webpack： import xxx form coreSymbolFilter.worker
 *
 * const xx = new xxx()
 *
 *  const { value, senData } = useWebWorker<type>(xx);
 */
export default function useWebWorker<V, P>(workerInstance: Worker) {
    const workerInstance_ = useRef<Worker>(workerInstance);

    const [value, setValue] = useState<V>();

    const getValue = useCallback(
        () =>
            new Promise<V>((res) => {
                const getMessage = (ev: MessageEvent<V>) => {
                    res(ev.data);
                    workerInstance_.current.removeEventListener('message', getMessage);
                };

                workerInstance_.current.addEventListener('message', getMessage);
            }),
        []
    );

    useEffect(() => {
        const getMessage = (ev: MessageEvent<V>) => {
            setValue(ev.data);
        };
        workerInstance_.current.addEventListener('message', getMessage);

        return () => {
            workerInstance_.current.removeEventListener('message', getMessage);
            workerInstance = undefined!;
        };
    }, []);

    const sendData = useRef((data: P, opt?: Parameters<Worker['postMessage']>[1]) => {
        workerInstance_.current.postMessage(data, opt);
    });

    return { value, sendData: sendData.current, getValue };
}
