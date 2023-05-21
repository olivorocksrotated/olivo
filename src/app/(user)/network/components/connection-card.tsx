'use client';

import { GradientBorder } from '@/app/components/grandient-border';

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
        <GradientBorder className="flex w-full min-w-[300px] gap-4">
            <div>
                <Avatar connection={connection} />
            </div>
            <div>
                <div className="text-lg font-extralight text-slate-100" data-cy="connection-user-name">
                    {connection.name || 'No name'}
                </div>
                <div className="text-sm font-light text-slate-400">
                    Human Being
                </div>
            </div>
        </GradientBorder>
    );
}