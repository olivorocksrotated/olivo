'use client';

import { Mood, MoodStatus } from '@prisma/client';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useZact } from 'zact/client';

import { useDebounce } from '@/lib/hooks/useDebounce';
import { createMoodAction } from '@/lib/moods/create';
import { updateMoodAction } from '@/lib/moods/update';

import { MoodOption, moodOptions as moodMap } from '../constants';

interface Props {
    todaysMood: Pick<Mood, 'id' | 'status' | 'comment' | 'createdAt'> | null;
}

const nullMoodOption: MoodOption = { icon: '', name: '' as MoodStatus };
const nullState = { option: nullMoodOption, comment: '' };
const moodOptions = Object.values(moodMap);

export default function MoodSelector({ todaysMood }: Props) {
    const [selectedMood, setSelectedMood] = useState(nullState);
    const debouncedSelectedMood = useDebounce(selectedMood, 1000);

    useEffect(() => setSelectedMood(() => {
        const isMoodCheckAlreadyDoneToday = !!todaysMood;

        return !isMoodCheckAlreadyDoneToday ? nullState : {
            option: moodMap[todaysMood!.status] ?? nullMoodOption,
            comment: todaysMood.comment ?? ''
        };
    }), [todaysMood]);

    const { mutate: createMood, isLoading: isCreatingMood } = useZact(createMoodAction);
    const { mutate: updateMood } = useZact(updateMoodAction);

    const handleMoodClick = async (mood: MoodOption) => {
        if (isCreatingMood) {
            return;
        }

        setSelectedMood((previous) => ({ ...previous, option: mood }));
        const action = !todaysMood?.id ?
            createMood({ status: mood.name }) :
            updateMood({ id: todaysMood!.id, status: mood.name });

        await action;
    };

    useEffect(() => {
        async function updateComment() {
            if (!todaysMood || !debouncedSelectedMood.comment || todaysMood?.comment === debouncedSelectedMood.comment) {
                return;
            }
            await updateMood({ id: todaysMood!.id, comment: debouncedSelectedMood.comment });
        }
        updateComment();
    }, [debouncedSelectedMood, todaysMood, updateMood]);

    const expandedHeight = '290px';
    const parentContainerHeight = { initial: !selectedMood.option?.name ? '150px' : expandedHeight, expanded: expandedHeight };

    return (
        <motion.div className="rounded border border-indigo-700 bg-gray-800 p-4 sm:w-fit"
            initial={{ height: parentContainerHeight.initial }}
            animate={{ height: selectedMood.option?.name ? parentContainerHeight.expanded : parentContainerHeight.initial }}
        >
            <div className="mb-4 text-lg text-white">How are you feeling today?</div>
            <div className="mb-4 flex gap-2">
                {moodOptions.map((mood) => (
                    <div key={mood.name}
                        onClick={() => handleMoodClick(mood)}
                        className={clsx({
                            'flex w-20 cursor-pointer flex-col items-center rounded p-2 transition': true,
                            'bg-slate-700 hover:bg-slate-600': mood.name !== selectedMood.option?.name,
                            'bg-slate-500 hover:bg-slate-500': mood.name === selectedMood.option?.name
                        })}
                    >
                        <div className="text-2xl">{mood.icon}</div>
                        <div className="hidden sm:block">{mood.name}</div>
                    </div>
                ))}
            </div>
            <div className={clsx({
                'border-t border-gray-700 pt-3': true,
                hidden: !selectedMood.option?.name,
                block: selectedMood.option?.name
            })}
            >
                <div className="mb-2">Would you like to share a bit more?</div>
                <div className="mb-2 w-full">
                    <textarea autoFocus
                        value={selectedMood.comment}
                        onChange={(event) => setSelectedMood((previous) => ({ ...previous, comment: event.target.value }))}
                        placeholder={`What is making you feel ${selectedMood.option.name.toLowerCase()}?`}
                        className="h-20 max-h-20 w-full resize-none rounded p-2"
                    />
                </div>
            </div>
        </motion.div>
    );
}
