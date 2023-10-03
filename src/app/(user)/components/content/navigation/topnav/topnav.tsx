import Image from 'next/image';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';

import IconButton from '@/app/components/ui/icon-button/icon-button';

import UserMenu from '../sidenav/user-menu';

interface Props {
    onSidenavButtonClicked: () => void
}

export default function Topnav({ onSidenavButtonClicked }: Props) {
    return (
        <nav aria-label="Top navigation" className="fixed left-0 top-0 h-12 w-full border-b border-neutral-900 bg-neutral-950 p-2">
            <div className="flex justify-between">
                <div className="flex w-56 items-center gap-2 pl-1">
                    <div>
                        <IconButton
                            label="Open navigation"
                            size="s"
                            icon={RxHamburgerMenu}
                            onClick={onSidenavButtonClicked}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex cursor-pointer items-center gap-2">
                            <Image alt="Olivo logo" height="30" width="30" src="/favicon.ico" />
                            <span className="font-medium">Olivo</span>
                        </Link>
                    </div>
                </div>
                <UserMenu />
            </div>
        </nav>
    );
}
