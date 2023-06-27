'use client';

import * as Tabs from '@radix-ui/react-tabs';
import clsx from 'clsx';

import { ClientCommitment } from '../../types';
import CommitmentsList from './commitments-list';

interface Props {
    today: ClientCommitment[];
    next: ClientCommitment[];
    overdue: ClientCommitment[];
    resolved: ClientCommitment[];
}

export default function CommitmentsTabs({ today, next, overdue, resolved }: Props) {
    const tabStyles = clsx(
        'p-4',
        'hover:bg-neutral-700',
        'focus:bg-neutral-700',
        'data-[state=active]:bg-neutral-600',
        'first:rounded-l-lg last:rounded-r-lg'
    );

    return (
        <Tabs.Root defaultValue="today">
            <Tabs.List aria-label="Manage your commitments" className="mb-8 w-fit rounded-lg bg-neutral-800">
                <Tabs.Trigger value="today" className={tabStyles}>Today</Tabs.Trigger>
                <Tabs.Trigger value="next" className={tabStyles}>Next</Tabs.Trigger>
                <Tabs.Trigger value="overdue" className={tabStyles}>Overdue</Tabs.Trigger>
                <Tabs.Trigger value="resolved" className={tabStyles}>Resolved</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="today">
                <CommitmentsList commitments={today} />
            </Tabs.Content>
            <Tabs.Content value="next">
                <CommitmentsList commitments={next} />
            </Tabs.Content>
            <Tabs.Content value="overdue">
                <CommitmentsList commitments={overdue} />
            </Tabs.Content>
            <Tabs.Content value="resolved">
                <CommitmentsList commitments={resolved} />
            </Tabs.Content>
        </Tabs.Root>
    );
}
