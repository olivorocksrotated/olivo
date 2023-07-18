import { KeyboardEvent } from 'react';

import { KeyHandler } from './types';

export function onKeyPressed(handlers: KeyHandler[]) {
    return (event: KeyboardEvent) => {
        for (const [key, { considerEventHandled, meta }, handler] of handlers) {
            if (event.key === key && (meta ? event.metaKey : true)) {
                if (considerEventHandled) {
                    event.stopPropagation();
                    event.preventDefault();
                }

                return handler(event);
            }
        }
    };
}
