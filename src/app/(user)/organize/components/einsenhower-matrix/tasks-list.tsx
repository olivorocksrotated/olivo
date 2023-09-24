'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdOutlineRefresh } from 'react-icons/md';

import IconButton from '@/app/components/ui/icon-button/icon-button';
import Input from '@/app/components/ui/input/input';
import ListAddButton from '@/app/components/ui/list-add-button/list-add-button';
import { replace } from '@/lib/array/replace';
import useLocalStorage from '@/lib/hooks/useLocalStorage';

interface Task {
    id: number;
    name: string;
}

interface Props {
    listId: string;
}

export default function TasksList({ listId }: Props) {
    const [nextId, setNextId] = useState(0);
    const [tasks, setTasks] = useLocalStorage(`em-${listId}`, [] as Task[]);
    const [parent] = useAutoAnimate();

    const createEmptyTask = () => {
        const emptyTask = { id: nextId, name: '' };
        setNextId((previous) => previous + 1);

        return emptyTask;
    };

    const addEmptyTask = () => {
        const emptyTask = createEmptyTask();
        setTasks((previous) => [emptyTask, ...previous]);
    };

    const editTask = (taskId: number, newValue: string) => {
        setTasks((previous) => replace(
            previous,
            { id: taskId, name: newValue },
            ({ id }) => id === taskId
        ));
    };

    const removeTask = (taskToRemove: Task) => {
        setTasks((previous) => previous.filter((task) => task.id !== taskToRemove.id));
    };

    const resetTasks = () => {
        setTasks([]);
    };

    return (
        <ul ref={parent} role="list">
            <li className="mb-3 flex justify-between gap-2">
                <ListAddButton label="Add task" size="s" onClick={addEmptyTask} />
                <IconButton label="Reset tasks" size="s" icon={MdOutlineRefresh} onClick={resetTasks} />
            </li>
            {tasks.map((task) => (
                <li key={task.id} className="mb-3 flex items-center justify-between gap-2 rounded-lg text-sm outline-neutral-700">
                    <Input type="text"
                        placeholder="Your task to prioritize"
                        value={task.name}
                        onChange={(event) => editTask(task.id, event.target.value)}
                    />
                    <IconButton label="Delete" icon={FaTrash} size="xs" onClick={() => removeTask(task)} />
                </li>
            ))}
        </ul>
    );
}
