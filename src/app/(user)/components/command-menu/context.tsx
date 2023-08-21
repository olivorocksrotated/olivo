import { createContext } from 'react';

import { CommandsList } from './commands/types';

type CommandMenuContextType = {
    setCommandList: (commands: CommandsList) => void,
    exit: () => void
};

function throwUninitializedContextError() {
    throw new Error('CommandMenuContext is not initialized');
}

const uninitializedContext = {
    setCommandList: () => throwUninitializedContextError(),
    exit: () => throwUninitializedContextError()
};

export const CommandMenuContext = createContext<CommandMenuContextType>(uninitializedContext);
