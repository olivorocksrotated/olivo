import { KeyboardEvent } from 'react';

export default function onEnterPressed(callback: (event: KeyboardEvent<HTMLInputElement>) => any) {
    return (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            callback(event);
        }
    };
}
