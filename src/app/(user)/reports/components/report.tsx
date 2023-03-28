'use client';

import StartButton from '../../../components/start-btn';
import Avatar from './avatar';
import ContextButton from './context-btn';

interface Props {
    report: {
        id: string;
        name: string;
        image: string;
    };
}

export default function Report({ report }: Props) {
    return (
        <div className="p-3 rounded-lg w-96 min-w-fit flex gap-4 bg-indigo-900">
            <div>
                <Avatar report={report} />
            </div>
            <div>
                <div className="font-extralight text-lg text-slate-100" data-cy="report-name">
                    {report.name || 'No name'}
                </div>
                <div className="font-light text-sm text-slate-400">
                    Developer
                </div>
            </div>
            <div className="flex flex-col items-end justify-between grow">
                <div className="pr-2"><ContextButton /></div>
                <div className="flex"><StartButton /></div>
            </div>
        </div>
    );
}
