import { onKeyPressed } from './on-key-pressed';
import { Key } from './types';

const onEnterPressed = onKeyPressed.bind(null, Key.Enter, {});
export default onEnterPressed;
