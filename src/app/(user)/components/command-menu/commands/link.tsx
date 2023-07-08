import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';

import { NavigationLink } from '@/app/navigation';

type LinkCommandProps = {
    link: NavigationLink,
    onSelect: (value: NavigationLink) => void
};

export default function LinkCommand({ link, onSelect }: LinkCommandProps) {
    const router = useRouter();
    function navigate() {
        router.push(link.path);
        onSelect(link);
    }

    return (
        <Command.Item onSelect={navigate}>
            <span className="text-neutral-400">{link.icon}</span>
            <span>{link.title}</span>
        </Command.Item>
    );
}
