import { KeyboardEvent } from 'react';

import { Key } from './types';

type Options = {
    considerEventHandled?: boolean;
};

export function onKeyPressed(key: Key, { considerEventHandled }: Options, callback: (event: KeyboardEvent) => void) {
    return (event: KeyboardEvent) => {
        if (event.key === key) {
            if (considerEventHandled) {
                event.stopPropagation();
                event.preventDefault();
            }

            return callback(event);
        }
    };
}
