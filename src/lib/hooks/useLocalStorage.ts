/* eslint-disable no-console */
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    const [storedValue, setStoredValue] = useState(initialValue);
    const [firstLoadDone, setFirstLoadDone] = useState(false);

    // Use an effect hook on mount in order to prevent SSR inconsistencies and errors
    // This will update the state with the value from the local storage
    useEffect(() => {
        const fromLocal = () => {
            if (typeof window === 'undefined') {
                return initialValue;
            }
            try {
                const item = window.localStorage.getItem(key);
                if (!item) {
                    return initialValue;
                }

                return JSON.parse(item) as T;
            } catch (error) {
                console.error(error);

                return initialValue;
            }
        };
        setStoredValue(fromLocal);
        setFirstLoadDone(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Whenever the stored value changes, save it in the local storage
    useEffect(() => {
        // If it's the first load, don't store the value.
        // Otherwise, the initial value will overwrite the local storage.
        if (!firstLoadDone) {
            return;
        }

        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(storedValue));
            }
        } catch (error) {
            console.log(error);
        }
    }, [firstLoadDone, key, storedValue]);

    return [storedValue, setStoredValue];
}
