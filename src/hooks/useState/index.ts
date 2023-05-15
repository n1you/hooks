import { useCallback, useLayoutEffect, useRef, useState } from 'react';

type initData<T> = ((prevState: T) => T) | T;

export default <T extends any>(initData: T) => {
    type CallBackFN = (value: T) => void;
    const [, setValue] = useState(initData);
    const data = useRef({data: initData});
    const [callback, setCallback] = useState<null | CallBackFN>(null);

    type SetState = (value: initData<T>, callback?: CallBackFN) => void;
    const setData: SetState = useCallback((action, callback) => {
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

    console.log('data',data);
    

    return [data.current.data, setData] as [T, SetState];
};
