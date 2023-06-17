import { useState } from 'react';

export function useCloseUiComponent(): [boolean, () => void] {
    const [isClosed, setIsClosed] = useState(false);

    const close = () => {
        setIsClosed(() => true);
        setTimeout(() => setIsClosed(() => false), 100);
    };

    return [isClosed, close];
}
