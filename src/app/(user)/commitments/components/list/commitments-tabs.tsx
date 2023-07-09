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
        'px-4 py-2',
        'hover:bg-neutral-700',
        'focus:bg-neutral-700',
        'data-[state=active]:bg-neutral-600',
        'first:rounded-l-lg last:rounded-r-lg'
    );

    const tabContentStyles = 'max-w-2xl';

    return (
        <Tabs.Root defaultValue="today">
            <Tabs.List aria-label="Manage your commitments" className="mb-8 w-fit rounded-lg bg-neutral-800">
                <Tabs.Trigger value="today" className={tabStyles}>Today</Tabs.Trigger>
                <Tabs.Trigger value="next" className={tabStyles}>Next</Tabs.Trigger>
                <Tabs.Trigger value="overdue" className={tabStyles}>Overdue</Tabs.Trigger>
                <Tabs.Trigger value="resolved" className={tabStyles}>Resolved</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="today" className={tabContentStyles}>
                <CommitmentsList commitments={today} />
            </Tabs.Content>
            <Tabs.Content value="next" className={tabContentStyles}>
                <CommitmentsList commitments={next} />
            </Tabs.Content>
            <Tabs.Content value="overdue" className={tabContentStyles}>
                <CommitmentsList commitments={overdue} />
            </Tabs.Content>
            <Tabs.Content value="resolved" className={tabContentStyles}>
                <CommitmentsList commitments={resolved} />
            </Tabs.Content>
        </Tabs.Root>
    );
}
