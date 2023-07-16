'use client';

import { Card, Grid, Title } from '@tremor/react';

import TextLink from '@/app/components/ui/text-link/text-link';

import TasksList from './tasks-list';

export default function EinsenhowerMatrix() {
    const explanationStyles = 'mb-2 text-sm text-neutral-300 h-10';

    return (
        <div className="max-w-3xl">
            <Card>
                <h2 className="text-lg leading-relaxed">Troubles prioritizing your tasks and projects?</h2>
                <h3 className="mb-4 text-sm leading-relaxed text-neutral-300">
                    The <TextLink href="https://www.eisenhower.me/eisenhower-matrix/" target="_blank">Einsenhower Matrix</TextLink> can help you organize your thoughts and create commitments you can effectively fulfil
                </h3>
                <Grid numItems={1} numItemsSm={2} numItemsLg={2} className="gap-2">
                    <Card>
                        <Title>Do</Title>
                        <p className={explanationStyles}>Important + Urgent = Do it now</p>
                        <TasksList />
                    </Card>
                    <Card>
                        <Title>Decide</Title>
                        <p className={explanationStyles}>Important + Not urgent = Schedule it</p>
                        <TasksList />
                    </Card>
                    <Card>
                        <Title>Delegate</Title>
                        <p className={explanationStyles}>Not important + Urgent = Who can do it for you?</p>
                        <TasksList />
                    </Card>
                    <Card>
                        <Title>Delete</Title>
                        <p className={explanationStyles}>Not important + Not urgent = Get rid of it</p>
                        <TasksList />
                    </Card>
                </Grid>
            </Card>
        </div>
    );
}
