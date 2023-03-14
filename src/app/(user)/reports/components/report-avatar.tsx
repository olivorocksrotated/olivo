import * as Avatar from '@radix-ui/react-avatar';

interface Props {
    report: {
        id: string;
        name: string;
        image: string;
    };
}

export default function ReportAvatar({ report }: Props) {
    const nameAcronym = report.name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');

    return (
        <Avatar.Root className="rounded-full w-20 h-20 inline-flex items-center justify-center align-middle select-none overflow-hidden">
            <Avatar.Image src={report.image} alt={report.name} className="w-full h-full object-cover" style={{ borderRadius: 'inherit' }} />
            <Avatar.Fallback>{nameAcronym}</Avatar.Fallback>
        </Avatar.Root>
    );
}
