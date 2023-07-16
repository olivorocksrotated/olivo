'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

import IconButton from '@/app/components/ui/icon-button/icon-button';
import ListAddButton from '@/app/components/ui/list-add-button/list-add-button';

interface Task {
    id: number;
    name: string;
}

export default function TasksList() {
    const [nextId, setNextId] = useState(0);
    const [tasks, setTasks] = useState([] as Task[]);
    const [parent] = useAutoAnimate();

    const createEmptyTask = () => {
        const emptyTask = { id: nextId, name: '' };
        setNextId((previous) => previous + 1);

        return emptyTask;
    };

    const addEmptyTask = (setter: Dispatch<SetStateAction<Task[]>>) => {
        setter((previous) => [createEmptyTask(), ...previous]);
    };

    const removeTask = (setter: Dispatch<SetStateAction<Task[]>>, taskToRemove: Task) => {
        setter((previous) => previous.filter((task) => task.id !== taskToRemove.id));
    };

    return (
        <ul ref={parent} role="list">
            <li className="mb-2"><ListAddButton label="Add task" size="xs" onClick={() => addEmptyTask(setTasks)} /></li>
            {tasks.map((task) => (
                <li key={task.id} className="mb-2 flex items-center justify-between gap-2 rounded-lg p-2 text-sm outline outline-neutral-400">
                    <input type="text" placeholder="Your task to prioritize" className="w-full bg-transparent px-2 py-1" />
                    <IconButton label="Delete" icon={FaTrash} size="xs" onClick={() => removeTask(setTasks, task)} />
                </li>
            ))}
        </ul>
    );
}
