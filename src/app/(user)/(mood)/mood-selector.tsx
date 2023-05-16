'use client';

import { Mood, MoodStatus } from '@prisma/client';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useZact } from 'zact/client';

import { createMoodAction } from '@/lib/moods/create';
import { updateMoodAction } from '@/lib/moods/update';

interface Props {
    todaysMood: Pick<Mood, 'id' | 'status' | 'comment' | 'createdAt'> | null;
}

interface MoodOption {
    icon: string;
    name: MoodStatus;
}

const moodOptions: MoodOption[] = [
    { icon: '💩', name: MoodStatus.Bad },
    { icon: '😓', name: MoodStatus.Okayish },
    { icon: '🆗', name: MoodStatus.Average },
    { icon: '🙂', name: MoodStatus.Good },
    { icon: '💚', name: MoodStatus.Excellent }
];
const nullMoodOption: MoodOption = { icon: '', name: '' as MoodStatus };
const nullState = { option: nullMoodOption, comment: '' };

export default function MoodSelector({ todaysMood }: Props) {
    const [moodChoice, setMoodChoice] = useState(nullState);
    useEffect(() => setMoodChoice(() => {
        const isMoodCheckAlreadyDoneToday = !!todaysMood;

        return !isMoodCheckAlreadyDoneToday ? nullState : {
            option: moodOptions.find(({ name }) => name === todaysMood!.status) ?? nullMoodOption,
            comment: todaysMood.comment ?? ''
        };
    }), [todaysMood]);

    const { mutate: createMood, isLoading: isCreatingMood } = useZact(createMoodAction);
    const { mutate: updateMood, isLoading: isUpdatingMood } = useZact(updateMoodAction);

    const handleMoodClick = async (mood: MoodOption) => {
        if (isCreatingMood) {
            return;
        }

        setMoodChoice((previous) => ({ ...previous, option: mood }));
        const action = !todaysMood?.id ?
            createMood({ status: mood.name }) :
            updateMood({ id: todaysMood!.id, status: mood.name });

        await action;
    };

    const handleSaveComment = async () => {
        await updateMood({ id: todaysMood!.id, comment: moodChoice.comment });
    };

    const parentContainerHeight = { initial: !moodChoice.option?.name ? '150px' : '250px', expanded: '250px' };

    return (
        <motion.div className="rounded border border-indigo-700 bg-gray-800 p-4 sm:w-fit"
            initial={{ height: parentContainerHeight.initial }}
            animate={{ height: moodChoice.option?.name ? parentContainerHeight.expanded : parentContainerHeight.initial }}
        >
            <div className="mb-4 text-lg text-white">How are you feeling today?</div>
            <div className="mb-4 flex gap-2">
                {moodOptions.map((mood) => (
                    <div key={mood.name}
                        onClick={() => handleMoodClick(mood)}
                        className={clsx({
                            'flex w-20 cursor-pointer flex-col items-center rounded p-2 transition': true,
                            'bg-slate-700 hover:bg-slate-600': mood.name !== moodChoice.option?.name,
                            'bg-slate-500 hover:bg-slate-500': mood.name === moodChoice.option?.name
                        })}
                    >
                        <div className="text-2xl">{mood.icon}</div>
                        <div className="hidden sm:block">{mood.name}</div>
                    </div>
                ))}
            </div>
            <div className={clsx({
                'border-t border-gray-700 pt-3': true,
                hidden: !moodChoice.option?.name,
                block: moodChoice.option?.name
            })}
            >
                <div className="mb-2">Would you like to share a bit more?</div>
                <div className="flex gap-2">
                    <div className="w-full">
                        <input type="text"
                            autoFocus
                            value={moodChoice.comment}
                            onChange={(event) => setMoodChoice((previous) => ({ ...previous, comment: event.target.value }))}
                            placeholder={`What is making you feel ${moodChoice.option.name.toLowerCase()}?`}
                            className="w-full p-2"
                        />
                    </div>
                    <div>
                        <button type="submit"
                            disabled={!moodChoice.comment || !todaysMood?.id || isUpdatingMood}
                            onClick={handleSaveComment}
                            className="rounded border border-slate-400 px-3 py-2 hover:enabled:border-slate-300 disabled:opacity-50"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
