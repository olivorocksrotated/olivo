'use client';

import Avatar from './avatar';

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
            <div className="text-lg" data-cy="report-name">
                {report.name || 'No name'}
            </div>
            <div className="flex flex-col items-end justify-between grow">
                <div>
                    <button type="button">...</button>
                </div>
                <div>
                    <button type="button">Play</button>
                </div>
            </div>
        </div>
    );
}
