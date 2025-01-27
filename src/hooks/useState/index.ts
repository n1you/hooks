import { useCallback, useLayoutEffect, useRef, useState as RUS } from 'react';
import useExecuteOnce from '../useExecuteOnce';

type SetState<S> = (value: S | ((preValue: S) => S), callback?: CallBackFN<S>) => void;
type CallBackFN<T> = (value: T) => void;

// type ExtractFNType<T> = T extends (...p: any[]) => any ? ReturnType<T> : T;

export default function useState<S>(initialState: S | (() => S)): [S, SetState<S>] {
    const [, setValue] = RUS(initialState);

    const data = useRef<{ data: S }>({ data: undefined as any });

    useExecuteOnce(() => {
        data.current.data = initialState instanceof Function ? initialState() : initialState;
    });
    const [callback, setCallback] = RUS<null | CallBackFN<S>>(null);

    const setData: SetState<S> = useCallback((action, callback) => {
        const value = typeof action === 'function' ? (action as Function)(data.current.data) : action;
        setValue(value);
        data.current.data = value;
        callback && setCallback(() => callback);
    }, []);

    useLayoutEffect(() => {
        if (callback) {
            callback(data.current.data);
        }
    }, [callback]);

    return [data.current.data, setData];
    // as [ExtractFNType<S>, SetState<S>];
}
