'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="m-0 bg-black text-white">
            <div className="flex h-full flex-col items-center justify-center gap-5">
                <div className="flex items-center justify-between gap-5">
                    <h1 className="border-r border-neutral-500 pr-5 text-2xl leading-10">Ups</h1>
                    <div>Something went wrong here.</div>
                </div>
                <button type="button" onClick={() => reset()} className="rounded border border-red-400 p-2">Try again</button>
            </div>
        </div>
    );
}
