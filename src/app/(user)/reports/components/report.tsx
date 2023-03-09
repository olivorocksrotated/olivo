'use client';

interface Props {
    report: {
        id: string;
        name: string | null;
    };
}

export default function Report({ report }: Props) {
    return (
        <div data-cy="report-name">{report.name ?? 'No name'}</div>
    );
}

