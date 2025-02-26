import React, { useState, useRef, useEffect } from 'react';

const generateStageFrequency = (
    stageFrequency: number,
    callback: () => void,
    getRAFId?: (id: number) => void,
): void => {
    const requestAnimationFrameId = requestAnimationFrame(() => {
        if (stageFrequency > 1) {
            generateStageFrequency(stageFrequency - 1, callback, getRAFId);
        } else {
            callback();
        }
    });

    if (getRAFId) {
        getRAFId(requestAnimationFrameId);
    }
};

/**
 * @description 长列表
 * 
 * @demo ```
    const [list, setList, initList] = useSegmentedUpdate<string[]>([]);
    useEffect(() => {  
        // 每次set 都是往旧数据后追加
        setList(
            Array(30)
                .fill('')
                .map((_, index) => `${index + 1}`),
            15
        );
    }, []);


    console.log(list); // 先输出 1～15 ，再输出1～30
    
 * ```
 * 
 */
const useSegmentedUpdate = <T extends any[]>(initData: T, stageFrequency = 20) => {
    const [state, setState] = useState(initData);
    const remainingData = useRef<T | null>(null);
    const rafId = useRef<number | null>(null);

    const updateState = (newData: T, pioneer = 15) => {
        const dataToProcess = remainingData.current ? ([...remainingData.current, ...newData] as T) : newData;

        const firstBatch = dataToProcess.slice(0, pioneer) as T;
        setState((prev) => [...prev, ...firstBatch] as unknown as T);

        const rest = dataToProcess.slice(pioneer) as T;
        remainingData.current = rest;

        if (rest.length > 0 && !rafId.current) {
            generateStageFrequency(
                stageFrequency,
                () => {
                    setState((prev) => {
                        const newData = [...prev, ...(remainingData.current ?? [])] as unknown as T;
                        remainingData.current = null;
                        return newData;
                    });

                    rafId.current = null;
                },
                (id: number) => {
                    rafId.current = id;
                },
            );
        }
    };

    const toInit = (newInitData?: T) => {
        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }
        remainingData.current = null;
        setState(newInitData ?? initData);
    };

    useEffect(() => {
        return () => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    return [state, updateState, toInit] as const;
};

export default useSegmentedUpdate;
