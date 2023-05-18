'use client';

import { GradientBorder } from '@/app/components/grandient-border';

import Avatar from './avatar';
import ContextButton from './context-btn';

interface Props {
    connection: {
        id: string;
        name: string;
        image: string;
    };
}

export default function Connection({ connection }: Props) {
    return (
        <GradientBorder className="flex gap-4">
            <div>
                <Avatar connection={connection} />
            </div>
            <div>
                <div className="text-lg font-extralight text-slate-100" data-cy="report-name">
                    {connection.name || 'No name'}
                </div>
                <div className="text-sm font-light text-slate-400">
                    Human Being
                </div>
            </div>
            <div className="flex grow flex-col items-end justify-between">
                <div className="pr-2"><ContextButton /></div>
            </div>
        </GradientBorder>
    );
}
