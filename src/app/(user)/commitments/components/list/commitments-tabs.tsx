'use client';

import * as Tabs from '@radix-ui/react-tabs';

import { ServerCommitment } from '../../types';
import CommitmentsList from './commitments-list';

interface Props {
    today: ServerCommitment[];
    next: ServerCommitment[];
    overdue: ServerCommitment[];
    resolved: ServerCommitment[];
}

export default function CommitmentsTabs({ today, next, overdue, resolved }: Props) {
    return (
        <Tabs.Root defaultValue="today">
            <Tabs.List aria-label="Manage your commitments">
                <Tabs.Trigger value="today">Today</Tabs.Trigger>
                <Tabs.Trigger value="next">Next</Tabs.Trigger>
                <Tabs.Trigger value="overdue">Overdue</Tabs.Trigger>
                <Tabs.Trigger value="resolved">Resolved</Tabs.Trigger>
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
