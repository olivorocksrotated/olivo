import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';

import { NavigationLink } from '@/app/navigation';

export default function LinkCommand({ link, onSelect }: { link: NavigationLink, onSelect: (value: NavigationLink) => void }) {
    const router = useRouter();
    function navigateTo(path: string) {
        return () => {
            router.push(path);
            onSelect(link);
        };
    }

    return (
        <Command.Item onSelect={navigateTo(link.path)}>
            <span className="text-neutral-400">{link.icon}</span>
            <span>{link.title}</span>
        </Command.Item>
    );
}
