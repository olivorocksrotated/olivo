'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { Connection } from '@/lib/network/types';

import Avatar from './avatar';

type Props = { connection: Connection };

export default function ConnectionCard({ connection }: Props) {
    return (
        <Link href={`/network/${connection.id}`} className="w-full min-w-[300px]">
            <motion.div whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className="flex  cursor-pointer gap-4 border border-neutral-900 bg-neutral-950 p-5"
            >
                <div>
                    <Avatar user={connection.user} />
                </div>
                <div>
                    <div className="text-lg font-extralight text-neutral-100" data-cy="connection-user-name">
                        {connection.user.name || 'No name'}
                    </div>
                    <div className="text-sm font-light text-neutral-400">
                        Human Being
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
