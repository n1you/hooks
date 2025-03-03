import { generateUUID } from '../utils/fn';
import { useCallback, useRef } from 'react';

/**
 *
 *  @description
 *  多次调用只需要最后一次结果时
 * 
 *  @demo
 * ```
    const { getToken, checkOnly } = useCheckOnly()
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
    //  data 为 1000 的时间
 * 
 * ```
    
 */
export default function useCheckOnly() {
    const token = useRef('');

    const checkOnly = useCallback((callback: () => void, currentToken: string) => {
        if (currentToken === token.current) {
            callback();
        }
    }, []);

    const getToken = useCallback(() => {
        return (token.current = generateUUID());
    }, []);

    return {
        getToken,
        checkOnly,
    };
}
