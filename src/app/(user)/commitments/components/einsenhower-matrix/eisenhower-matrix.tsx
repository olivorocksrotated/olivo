'use client';

import { Card, Grid, Subtitle, Title } from '@tremor/react';

import TextLink from '@/app/components/ui/text-link/text-link';

import TasksList from './tasks-list';

export default function EinsenhowerMatrix() {
    const explanationStyles = 'mb-2 text-sm text-neutral-300 h-10';

    return (
        <div className="max-w-3xl">
            <Card>
                <Title>Troubles prioritizing your tasks and projects?</Title>
                <Subtitle className="mb-4">
                    The <TextLink href="https://www.eisenhower.me/eisenhower-matrix/" target="_blank">Einsenhower Matrix</TextLink> can help you organize your thoughts and create commitments you can effectively fulfil
                </Subtitle>
                <Grid numItems={1} numItemsSm={2} numItemsLg={2} className="gap-2">
                    <Card>
                        <Title>Important + Urgent</Title>
                        <p className={explanationStyles}>Do it now</p>
                        <TasksList />
                    </Card>
                    <Card>
                        <Title>Important + Not urgent</Title>
                        <p className={explanationStyles}>Schedule it</p>
                        <TasksList />
                    </Card>
                    <Card>
                        <Title>Not important + Urgent</Title>
                        <p className={explanationStyles}>Who can do it for you?</p>
                        <TasksList />
                    </Card>
                    <Card>
                        <Title>Not important + Not urgent</Title>
                        <p className={explanationStyles}>Get rid of it</p>
                        <TasksList />
                    </Card>
                </Grid>
            </Card>
        </div>
    );
}
