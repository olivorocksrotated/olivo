// import Notifications from '../../../notifications/notifications';
// import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { RxHamburgerMenu } from 'react-icons/rx';

import IconButton from '@/app/components/ui/icon-button/icon-button';

interface Props {
    onSidenavButtonClicked: () => void,
    onMobileSidenavClicked: () => void
}

export default function Topnav({ onSidenavButtonClicked, onMobileSidenavClicked }: Props) {
    // const { data: session } = useSession();
    // const nameAcronym = getNameAcronym(session?.user.name);
    // const firstName = getFirstName(session?.user.name);

    // {/* <div className="flex gap-2">
    //     <div className="relative h-8 min-h-[2rem] w-8 min-w-[2rem]">
    //         <span className="sr-only">Open user menu</span>
    //         <Image
    //             className="min-h-[2rem] min-w-[2rem] rounded-full object-cover"
    //             src={session?.user.image ?? ''}
    //             width={32}
    //             height={32}
    //             alt={nameAcronym}
    //         />
    //     </div>
    //     <div role="none">
    //         <p className="text-sm font-light text-white" role="none">{firstName ?? 'Me'}</p>
    //         <p className="truncate text-xs font-light text-gray-300" role="none">{session?.user.email}</p>
    //     </div>
    // </div> */}

    // {/* <UserMenu /> */}

    return (
        <nav aria-label="Top navigation" className="fixed left-0 top-0 z-40 h-12 w-full border-b border-neutral-900 p-2">
            <div className="flex w-56 items-center gap-2 pl-1">
                <div>
                    <div className="block sm:hidden">
                        <IconButton
                            label="Open mobile navigation"
                            size="s"
                            icon={RxHamburgerMenu}
                            onClick={onMobileSidenavClicked}
                        />
                    </div>
                    <div className="hidden sm:block">
                        <IconButton
                            label="Open side navigation"
                            size="s"
                            icon={RxHamburgerMenu}
                            onClick={onSidenavButtonClicked}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image alt="Olivo logo" height="30" width="30" src="/favicon.ico" />
                        <span className="font-medium">Olivo</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
