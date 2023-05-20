'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useZact } from 'zact/client';

import { createConnectionAction } from '@/lib/network/create';

import ConnectButton from './connect-button';
import ConnectionCard from './connection-card';
import ConnectionError from './connection-error';
import ConnectionLoader from './connection-loader';

type Connection = { id: string, image: string, name: string };

function AnimatedCard({ children, key }: { children: React.ReactNode; key: string }) {
    const transition = { duration: 0.5 };

    return (
        <motion.div className="flex w-full"
            key={key}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1, transition }}
            exit={{ opacity: 0, transition }}
        >
            {children}
        </motion.div>
    );
}

export function ConnectionList({ connections }: { connections: Connection[]}) {
    const { mutate: createConnection, isLoading, error } = useZact(createConnectionAction);
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
            <div className="grid w-full grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {connections.map((connection: Connection) => (
                    <AnimatedCard key={connection.id}>
                        <ConnectionCard connection={connection} />
                    </AnimatedCard>
                ))}
                {isLoading ? <AnimatedCard key="feedbackCard"><ConnectionLoader></ConnectionLoader></AnimatedCard> : null}
                {error && interaction ? (
                    <AnimatedCard key="feedbackCardError">
                        <ConnectionError onClose={onErrorCardClosed} text={error.message} />
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
