'use client';
import * as Avatar from '@radix-ui/react-avatar';

interface Props {
    report: {
        id: string;
        name: string;
        image: string;
    };
}

function ReportAvatar({ report }: Props) {
    const nameAcronym = report.name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');

    return (
        <Avatar.Root className="rounded w-28 h-28 inline-flex items-center justify-center align-middle select-none overflow-hidden">
            <Avatar.Image src={report.image} alt={report.name} className="w-full h-full object-cover" style={{ borderRadius: 'inherit' }} />
            <Avatar.Fallback>{nameAcronym}</Avatar.Fallback>
        </Avatar.Root>
    );
}

export default function Report({ report }: Props) {
    return (
        <div className="p-4 rounded w-96 min-w-fit flex gap-4 bg-indigo-500">
            <div>
                <ReportAvatar report={report} />
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
