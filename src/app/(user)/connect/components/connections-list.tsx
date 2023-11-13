'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAction } from 'next-safe-action/hook';
import { useState } from 'react';

import { createConnectionAction } from '@/lib/network/create';
import { Connection } from '@/lib/network/types';
import { isError, isLoading } from '@/lib/server-actions/status';

import ConnectButton from './connect-button';
import ConnectionCard from './connection-card';
import ConnectionError from './connection-error';
import ConnectionLoader from './connection-loader';

function AnimatedCard({ children, id }: { children: React.ReactNode; id: string }) {
    const transition = { duration: 0.5 };

    return (
        <motion.div
            className="flex w-full"
            key={id}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1, transition }}
            exit={{ opacity: 0, transition }}
        >
            {children}
        </motion.div>
    );
}

export function ConnectionList({ connections }: { connections: Connection[]}) {
    const { execute: createConnection, status, result } = useAction(createConnectionAction);
    const [interaction, setInteraction] = useState(false);

    async function onConnectionRequested(email: string) {
        setInteraction(true);
        if (email) {
            await createConnection({ userEmail: email });
        }
    }

    function onErrorCardClosed() {
        setInteraction(false);
    }

    const hasNetwork = connections.length !== 0;

    const emptyNetworkMessage = (
        <div className="py-10 text-xl">Your network is empty for now, start growing it by connecting with people.</div>
    );

    const connectionsList = (
        <AnimatePresence mode="wait">
            <div className="grid w-full grid-cols-1 gap-12 py-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {connections.map((connection: Connection) => (
                    <AnimatedCard key={connection.id} id={connection.id}>
                        <ConnectionCard connection={connection} />
                    </AnimatedCard>
                ))}
                {isLoading(status) ? <AnimatedCard id="feedbackCard"><ConnectionLoader /></AnimatedCard> : null}
                {isError(status) && interaction ? (
                    <AnimatedCard id="feedbackCardError">
                        <ConnectionError onClose={onErrorCardClosed} text={result.serverError ?? ''} />
                    </AnimatedCard>
                ) : null}
            </div>
        </AnimatePresence>
    );

    return (
        <div className="flex flex-col">
            <div><ConnectButton onConnectionRequested={onConnectionRequested} /></div>
            <div className="w-full">{hasNetwork || interaction ? connectionsList : emptyNetworkMessage}</div>
        </div>
    );
}
