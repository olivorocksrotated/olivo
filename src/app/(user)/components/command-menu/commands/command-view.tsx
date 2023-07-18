import { ReactNode, useContext } from 'react';
import { AiOutlineEnter, AiOutlineRollback } from 'react-icons/ai';

import { onKeyPressed } from '@/lib/keys/on-key-pressed';
import { Key, KeyHandler } from '@/lib/keys/types';

import { CommandMenuContext } from '../context';
import { CommandsList } from './types';

function KeyButton({ children }: { children: ReactNode }) {
    return (
        <div className="flex items-center gap-2 rounded bg-neutral-700 px-2 py-1 text-[10px] font-semibold">
            {children}
        </div>
    );
}

function CommandBackButton() {
    return (
        <div className="m-2 flex">
            <KeyButton>
                <AiOutlineRollback></AiOutlineRollback><span>ESC</span>
            </KeyButton>
        </div>
    );
}

type CommandViewProps = {
    commands?: CommandsList,
    action: {
        label: string,
        execute: () => void
    }
    title: string;
    children: ReactNode
};

export default function CommandView({ title, children, action, commands }: CommandViewProps) {
    const { setCommandList } = useContext(CommandMenuContext) as any;

    function showSubCommands() {
        setCommandList(commands);
    }

    const keyEventHandlers: KeyHandler[] = [
        [Key.Enter, { considerEventHandled: true, meta: true }, action.execute]
    ];

    if (commands) {
        keyEventHandlers.push([Key.K, { considerEventHandled: true, meta: true }, showSubCommands]);
    }

    return (
        <div onKeyDown={onKeyPressed(keyEventHandlers)} className="flex h-full flex-col justify-between">
            <div className="flex h-full flex-col">
                <div className="m-2 flex items-center justify-between">
                    <div className="font-bold">{title}</div>
                    <CommandBackButton></CommandBackButton>
                </div>
                <div className="grow p-5">
                    {children}
                </div>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-neutral-700 p-2">
                <div>{action.label}</div>
                <KeyButton>⌘<AiOutlineEnter></AiOutlineEnter></KeyButton>
                {commands ? <><div>More options</div><KeyButton>⌘K</KeyButton></> : null}
            </div>

        </div>
    );
}
