import { useCallback, useEffect } from 'react';

function debounce<Callback extends(...args: any) => void>(func: Callback, wait: number) {
    let timeoutId: NodeJS.Timeout;
    function executedFunction(...args: Parameters<Callback>) {
        const later = () => {
            clearTimeout(timeoutId);
            func(...args);
        };
        clearTimeout(timeoutId);
        timeoutId = setTimeout(later, wait);
    }
    executedFunction.cancel = function() {
        clearTimeout(timeoutId);
    };

    return executedFunction;
}

function useDebouncedCallback<Callback extends(...args: any) => void>(callback: Callback, delay = 1000, deps: any[] = []) {
    const dobouncedFunction = debounce(callback, delay);
    const debouncedCallback = useCallback(dobouncedFunction, [delay, ...deps]);
    useEffect(() => () => {
        debouncedCallback.cancel();
    }, [delay, ...deps]);

    return debouncedCallback;
}

export default useDebouncedCallback;
