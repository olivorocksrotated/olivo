'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Card, Grid, Title } from '@tremor/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { IoAddOutline } from 'react-icons/io5';

import IconButton from '@/app/components/ui/icon-button/icon-button';

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
        <Grid numItems={1} numItemsSm={2} numItemsLg={2} className="gap-2">
            <Card>
                <Title>Do</Title>
                <p className={explanationStyles}>Important + Urgent = Do it now</p>
                <ul ref={parentDoTasks} role="list">
                    <li title="Add task"
                        className="mb-2 cursor-pointer rounded-lg border border-dashed border-neutral-500 p-1 text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-400"
                        onClick={() => addEmptyTask(setDoTasks)}
                    >
                        <IoAddOutline size={15} className="mx-auto my-0" />
                    </li>
                    {doTasks.map((task) => (
                        <li key={task.id} className="mb-2 flex items-center justify-between gap-2 rounded-lg p-2 text-sm outline outline-neutral-400">
                            <div>{task.name}</div>
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
    );
}
