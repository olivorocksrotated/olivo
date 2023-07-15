'use client';

import { Card, Grid, Title } from '@tremor/react';

export default function EinsenhowerMatrix() {
    return (
        <Grid numItems={1} numItemsSm={2} numItemsLg={2} className="gap-2">
            <Card>
                <Title>Do</Title>
                <p className="text-sm text-neutral-300">Important + Urgent = Do it now</p>
            </Card>
            <Card>
                <Title>Decide</Title>
                <p className="text-sm text-neutral-300">Important + Not urgent = Schedule it</p>
            </Card>
            <Card>
                <Title>Delegate</Title>
                <p className="text-sm text-neutral-300">Not important + Urgent = Who can do it for you?</p>
            </Card>
            <Card>
                <Title>Delete</Title>
                <p className="text-sm text-neutral-300">Not important + Not urgent = Get rid of it</p>
            </Card>
        </Grid>
    );
}
