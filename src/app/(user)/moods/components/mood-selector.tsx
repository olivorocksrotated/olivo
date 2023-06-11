'use client';

import { Mood, MoodStatus } from '@prisma/client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { TbMoodCheck } from 'react-icons/tb';
import { useZact } from 'zact/client';

import DialogButton from '@/app/components/dialog-button';
import Button from '@/app/components/ui/button';
import { createMoodAction } from '@/lib/moods/create';
import { updateMoodAction } from '@/lib/moods/update';
import { createBasicClientNotification } from '@/lib/notifications/create';

interface Props {
    todaysMood: Pick<Mood, 'id' | 'status' | 'comment' | 'createdAt'> | null;
}

export interface MoodOption {
    icon: string;
    name: MoodStatus;
}

export const moodMap: { [name in MoodStatus]: MoodOption } = {
    [MoodStatus.Bad]: { icon: '💩', name: MoodStatus.Bad },
    [MoodStatus.Okayish]: { icon: '😓', name: MoodStatus.Okayish },
    [MoodStatus.Average]: { icon: '🆗', name: MoodStatus.Average },
    [MoodStatus.Good]: { icon: '🙂', name: MoodStatus.Good },
    [MoodStatus.Excellent]: { icon: '💚', name: MoodStatus.Excellent }
};

const nullMoodOption: MoodOption = { icon: '', name: '' as MoodStatus };
const nullState = { option: nullMoodOption, comment: '' };
const moodOptions = Object.values(moodMap);

export default function MoodSelector({ todaysMood }: Props) {
    const [selectedMood, setSelectedMood] = useState(nullState);

    useEffect(() => setSelectedMood(() => {
        const isMoodCheckAlreadyDoneToday = !!todaysMood;

        return !isMoodCheckAlreadyDoneToday ? nullState : {
            option: moodMap[todaysMood!.status] ?? nullMoodOption,
            comment: todaysMood.comment ?? ''
        };
    }), [todaysMood]);

    const { mutate: createMood, isLoading: isCreatingMood } = useZact(createMoodAction);
    const { mutate: updateMood } = useZact(updateMoodAction);

    const handleMoodSave = async () => {
        if (!selectedMood.option.name || isCreatingMood) {
            return;
        }

        const action = !todaysMood?.id ?
            createMood({ status: selectedMood.option.name, comment: selectedMood.comment }) :
            updateMood({ id: todaysMood!.id, status: selectedMood.option.name, comment: selectedMood.comment });

        await action;
        createBasicClientNotification({
            title: 'Mood saved, keep it up!',
            destination: 'browser',
            icon: 'success'
        });
    };

    return (
        <div>
            <DialogButton onSubmit={handleMoodSave}
                dialog={{
                    title: 'How are you feeling today?',
                    actionLabel: 'Save my mood',
                    actionDisabled: !selectedMood?.option.name
                }}
                openButton={<Button label="How are you feeling today?" intent="cta" icon={TbMoodCheck} />}
            >
                <div className="mb-6">
                    <div className="flex gap-2">
                        {moodOptions.map((mood) => (
                            <div key={mood.name}
                                onClick={() => setSelectedMood((previous) => ({ ...previous, option: mood }))}
                                className={clsx({
                                    'flex w-10 cursor-pointer flex-col items-center rounded p-2 transition': true,
                                    'sm:w-20': true,
                                    'bg-neutral-700 hover:bg-neutral-600': mood.name !== selectedMood.option?.name,
                                    'bg-neutral-500 hover:bg-neutral-500': mood.name === selectedMood.option?.name
                                })}
                            >
                                <div className="text-2xl">{mood.icon}</div>
                                <div className="hidden sm:block">{mood.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className={clsx('mb-2', { 'text-neutral-500': !selectedMood.option.name })}>
                        {selectedMood.option.icon} {`What is making you feel ${selectedMood.option.name.toLowerCase() || '...'}?`}
                    </div>
                    <div className="mb-2 w-full">
                        <textarea autoFocus
                            value={selectedMood.comment}
                            onChange={(event) => setSelectedMood((previous) => ({ ...previous, comment: event.target.value }))}
                            disabled={!selectedMood.option.name}
                            placeholder="Optional"
                            className="h-20 max-h-20 w-full resize-none rounded p-2"
                        />
                    </div>
                </div>
            </DialogButton>
        </div>
    );
}
