import * as UiAvatar from '@radix-ui/react-avatar';

import { getNameAcronym } from '../../../../lib/reports/name';

interface Props {
    report: {
        id: string;
        name: string;
        image: string;
    };
}

export default function Avatar({ report }: Props) {
    const nameAcronym = getNameAcronym(report.name);

    return (
        <UiAvatar.Root className="rounded w-20 h-20 inline-flex items-center justify-center align-middle select-none overflow-hidden">
            <UiAvatar.Image src={report.image} alt={report.name} className="w-full h-full object-cover rounded" />
            <UiAvatar.Fallback delayMs={600} className="w-full h-full rounded border border-indigo-400 flex items-center justify-center">{nameAcronym}</UiAvatar.Fallback>
        </UiAvatar.Root>
    );
}
