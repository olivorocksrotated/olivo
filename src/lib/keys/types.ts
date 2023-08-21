import { KeyboardEvent } from 'react';

export enum Key {
    Enter = 'Enter',
    Escape = 'Escape',
    K = 'k'
}

export type KeyEventHandler = (event: KeyboardEvent) => void;

type Options = {
    considerEventHandled?: boolean;
    meta?: boolean;
};

export type KeyHandler = [Key, Options, KeyEventHandler];

