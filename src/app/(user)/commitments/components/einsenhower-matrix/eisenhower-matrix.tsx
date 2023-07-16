'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Card, Grid, Title } from '@tremor/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

import IconButton from '@/app/components/ui/icon-button/icon-button';
import ListAddButton from '@/app/components/ui/list-add-button/list-add-button';
import TextLink from '@/app/components/ui/text-link/text-link';

interface Task {
    id: number;
    name: string;
}

export default function EinsenhowerMatrix() {
    const [nextId, setNextId] = useState(0);
    const [doTasks, setDoTasks] = useState([] as Task[]);
    const [parentDoTasks] = useAutoAnimate();

    const explanationStyles = 'mb-2 text-sm text-neutral-300';

    const createEmptyTask = () => {
        const emptyTask = { id: nextId, name: 'Type here' };
        setNextId((previous) => previous + 1);

        return emptyTask;
    };

    const addEmptyTask = (setTasks: Dispatch<SetStateAction<Task[]>>) => {
        setTasks((previous) => [createEmptyTask(), ...previous]);
    };

    const removeTask = (setTasks: Dispatch<SetStateAction<Task[]>>, taskToRemove: Task) => {
        setTasks((previous) => previous.filter((task) => task.id !== taskToRemove.id));
    };

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
                        <ul ref={parentDoTasks} role="list">
                            <li className="mb-2"><ListAddButton label="Add task" size="xs" onClick={() => addEmptyTask(setDoTasks)} /></li>
                            {doTasks.map((task) => (
                                <li key={task.id} className="mb-2 flex items-center justify-between gap-2 rounded-lg p-2 text-sm outline outline-neutral-400">
                                    <input type="text" placeholder="Your task to prioritize" className="w-full bg-transparent px-2 py-1" />
                                    <IconButton label="Delete" icon={FaTrash} size="xs" onClick={() => removeTask(setDoTasks, task)} />
                                </li>
                            ))}
                        </ul>
                    </Card>
                    <Card>
                        <Title>Decide</Title>
                        <p className={explanationStyles}>Important + Not urgent = Schedule it</p>
                    </Card>
                    <Card>
                        <Title>Delegate</Title>
                        <p className={explanationStyles}>Not important + Urgent = Who can do it for you?</p>
                    </Card>
                    <Card>
                        <Title>Delete</Title>
                        <p className={explanationStyles}>Not important + Not urgent = Get rid of it</p>
                    </Card>
                </Grid>
            </Card>
        </div>
    );
}
