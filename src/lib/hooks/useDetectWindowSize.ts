import { useEffect, useState } from 'react';

export default function useDetectWindowSize(): {
    width: number,
    isTiny: boolean,
    isSm: boolean,
    isMd: boolean,
    isLg: boolean,
    isXl: boolean,
    is2Xl: boolean
    } {
    const [width, setWidth] = useState<number>(0);

    function handleWindowSizeChange() {
        if (typeof window !== 'undefined') {
            setWidth(window.innerWidth);
        }
    }
    useEffect(() => {
        handleWindowSizeChange();
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    return {
        width,
        isTiny: width < 640,
        isSm: width >= 640 && width < 768,
        isMd: width >= 768 && width < 1024,
        isLg: width >= 1024 && width < 1280,
        isXl: width >= 1280 && width < 1536,
        is2Xl: width >= 1536
    };
}
