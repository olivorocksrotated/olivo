import { useEffect } from 'react';

export default function useScheduler(callback: Function, milliseconds: number) {
    useEffect(() => {
        setTimeout(() => callback(), milliseconds);
    }, []);
}
