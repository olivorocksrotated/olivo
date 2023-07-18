import { KeyboardEvent } from 'react';

export enum Key {
    Enter = 'Enter',
    Escape = 'Escape',
}

export type KeyEventHandler = (event: KeyboardEvent) => void;
