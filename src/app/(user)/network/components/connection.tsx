'use client';

import StartButton from '../../../components/start-btn';
import Avatar from './avatar';
import ContextButton from './context-btn';

interface Props {
    connection: {
        id: string;
        name: string;
        image: string;
    };
}

export default function Connection({ connection }: Props) {
    return (
        <div className="flex w-96 min-w-fit gap-4 rounded-lg bg-indigo-900 p-3">
            <div>
                <Avatar report={connection} />
            </div>
            <div>
                <div className="text-lg font-extralight text-slate-100" data-cy="report-name">
                    {connection.name || 'No name'}
                </div>
                <div className="text-sm font-light text-slate-400">
                    Developer
                </div>
            </div>
            <div className="flex grow flex-col items-end justify-between">
                <div className="pr-2"><ContextButton /></div>
                <div className="flex"><StartButton /></div>
            </div>
        </div>
    );
}
