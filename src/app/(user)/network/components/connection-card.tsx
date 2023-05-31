'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import Avatar from './avatar';

interface Props {
    connection: {
        id: string;
        name: string;
        image: string;
    };
}

export default function Connection({ connection }: Props) {
    return (
        <Link href={`/network/${connection.id}`} className="w-full min-w-[300px]">
            <motion.div whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className="flex  cursor-pointer gap-4 border border-neutral-900 bg-neutral-950 p-5"
            >
                <div>
                    <Avatar connection={connection} />
                </div>
                <div>
                    <div className="text-lg font-extralight text-neutral-100" data-cy="connection-user-name">
                        {connection.name || 'No name'}
                    </div>
                    <div className="text-sm font-light text-neutral-400">
                        Human Being
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
