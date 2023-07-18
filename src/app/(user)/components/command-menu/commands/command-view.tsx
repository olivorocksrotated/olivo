import { ReactNode, useContext } from 'react';
import { AiOutlineEnter, AiOutlineRollback } from 'react-icons/ai';

import { onKeyPressed } from '@/lib/keys/on-key-pressed';
import { Key } from '@/lib/keys/types';

import { CommandMenuContext } from '../context';

function CommandBackButton() {
    return (
        <div className="m-2 flex">
            <div className="flex items-center gap-2 rounded bg-neutral-700 px-2 py-1 text-[10px] font-semibold">
                <AiOutlineRollback></AiOutlineRollback><span>ESC</span>
            </div>
        </div>
    );
}

export default function CommandView({ onEsc, title, children, actionLabel, commands }: { commands?: any, actionLabel: string, title: string; onEsc: () => void, children: ReactNode }) {
    const { setCommandList } = useContext(CommandMenuContext) as any;

    function executeAction() {
        if (commands) {
            setCommandList(commands);
        }
    }

    const onKeyDown = onKeyPressed([
        [Key.Escape, { considerEventHandled: true }, onEsc],
        [Key.Enter, { considerEventHandled: true, meta: true }, executeAction]
    ]);

    return (
        <div onKeyDown={onKeyDown} className="flex h-full flex-col justify-between">
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
                <div>{actionLabel}</div>
                <div className="flex items-center gap-2 rounded bg-neutral-700 p-2 text-sm font-semibold">
                    ⌘
                    <AiOutlineEnter></AiOutlineEnter>
                </div>
            </div>
        </div>
    );
}
