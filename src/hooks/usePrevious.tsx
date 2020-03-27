/**
 * 记录上一次数据
 */
import { useEffect, useRef } from 'react';
import { deepCopy } from 'utils/index';

/**
 * @param value 用来存储的数据
 */
function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
        ref.current = deepCopy(value);
    });
    return ref.current;
}

export default usePrevious;
