'use client';

interface Props {
    report: {
        id: string;
        name: string | null;
    };
}

export default function Report({ report }: Props) {
    return (
        <div data-cy="report-name" className="p-4 rounded bg-lime-400 w-96 min-w-fit" style={{ backgroundColor: '#a3c072' }}>
            {report.name ?? 'No name'}
        </div>
    );
}

