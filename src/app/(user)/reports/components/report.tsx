'use client';

interface Props {
    report: {
        id: string;
        name: string | null;
    };
}

export default function Report({ report }: Props) {
    return (
        <div>{report.name ?? 'No name'}</div>
    );
}

