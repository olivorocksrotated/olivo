import * as UiAvatar from '@radix-ui/react-avatar';

interface Props {
    report: {
        id: string;
        name: string;
        image: string;
    };
}

export default function Avatar({ report }: Props) {
    const nameAcronym = report.name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');

    return (
        <UiAvatar.Root className="rounded-full w-20 h-20 inline-flex items-center justify-center align-middle select-none overflow-hidden">
            <UiAvatar.Image src={report.image} alt={report.name} className="w-full h-full object-cover" style={{ borderRadius: 'inherit' }} />
            <UiAvatar.Fallback>{nameAcronym}</UiAvatar.Fallback>
        </UiAvatar.Root>
    );
}
