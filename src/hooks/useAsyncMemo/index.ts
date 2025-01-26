import { useEffect, useRef, useState } from 'react';
import useExecuteOnce from '../useExecuteOnce';

type MemoParams<T> = [factory: () => T | Promise<T>, deps: unknown[]];

export default function useAsyncMemo<T>(...params: MemoParams<T>) {
    const [fn, deps] = params;
    const firstResult = useRef({
        useFirstResult: false,
    });
    const result = useRef<T>();
    const [, updateView] = useState(0);

    const setResult = (v: T) => {
        (result.current = v), updateView((e) => e + 1);
    };

    const numberOfUpdates = useRef(1);

    useExecuteOnce(async () => {
        const result = fn();

        if (!(result instanceof Promise)) {
            setResult(result);
            firstResult.current.useFirstResult = true;
        } else {
            const res = await result;
            setResult(res);
            firstResult.current.useFirstResult = true;
        }
    });

    useEffect(() => {
        if (numberOfUpdates.current > 1) {
            if (firstResult.current.useFirstResult) {
                (async () => {
                    const res = (await fn()) as T;
                    setResult(res);
                })();
            }
        } else {
            numberOfUpdates.current += 1;
        }
    }, deps);

    return result.current;
}
