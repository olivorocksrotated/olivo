import * as UiAvatar from '@radix-ui/react-avatar';

import { getNameAcronym } from '../../../../lib/name/name';

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
        <UiAvatar.Root className="inline-flex h-20 w-20 select-none items-center justify-center overflow-hidden rounded align-middle">
            <UiAvatar.Image src={report.image} alt={report.name} className="h-full w-full rounded object-cover" />
            <UiAvatar.Fallback delayMs={600} className="flex h-full w-full items-center justify-center rounded border border-indigo-400">{nameAcronym}</UiAvatar.Fallback>
        </UiAvatar.Root>
    );
}
