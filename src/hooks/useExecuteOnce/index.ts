import { useEffect, useMemo, useRef } from 'react';

const executionPhaseType = {
    mount: 'mount',
    render: 'render',
    unMount: 'unMount',
} as const;

type ExecutionPhaseType = (typeof executionPhaseType)[keyof typeof executionPhaseType];

export default function useExecuteOnce<T>(
    factory: () => T,
    /**
     * @default executionPhase = render
     */
    options?: {
        executionPhase: ExecutionPhaseType[] | ExecutionPhaseType;
    },
) {
    const { executionPhase: pExecutionPhase = executionPhaseType.render } = options ?? {};

    const _executionPhase = useMemo(
        () => (typeof pExecutionPhase === 'string' ? [pExecutionPhase] : pExecutionPhase),
        [pExecutionPhase],
    );

    const allowExecution = useRef<ExecutionPhaseType[]>([]);

    // 跳过依赖;
    const executionPhase = useRef(_executionPhase);
    const runFN = (phase: ExecutionPhaseType) => {
        if (!allowExecution.current.includes(phase)) {
            factory();
            allowExecution.current.push(phase);
        }
    };
    const fn = useRef(runFN);

    executionPhase.current = _executionPhase;
    fn.current = runFN;

    if (executionPhase.current.includes(executionPhaseType.render)) {
        fn.current(executionPhaseType.render);
    }

    useEffect(() => {
        if (executionPhase.current.includes(executionPhaseType.mount)) {
            fn.current(executionPhaseType['mount']);
        }

        return () => {
            if (executionPhase.current.includes(executionPhaseType['unMount'])) {
                fn.current(executionPhaseType['unMount']);
            }
        };
    }, []);
}
