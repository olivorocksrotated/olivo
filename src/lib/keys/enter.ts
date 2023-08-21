import { onKeyPressed } from './on-key-pressed';
import { Key, KeyEventHandler } from './types';

const onEnterPressed = (handler: KeyEventHandler) => onKeyPressed([[Key.Enter, {}, handler]]);
export default onEnterPressed;
