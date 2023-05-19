'use client';

import { Mood, MoodStatus } from '@prisma/client';
import clsx from 'clsx';
import { getDay, getWeekOfMonth, getWeeksInMonth } from 'date-fns';
import { Fragment, useState } from 'react';

type MatrixMood = Pick<Mood, 'id' | 'comment' | 'status' | 'createdAt'>;

interface Props {
    moods: MatrixMood[];
}

interface WeeklyMood {
    week: number;
    moods: MatrixMood[]
}

const daysOfTheWeek = [
    { name: 'Sunday', abbreviation: 'Su', value: 0 },
    { name: 'Monday', abbreviation: 'M', value: 1 },
    { name: 'Tuesday', abbreviation: 'T', value: 2 },
    { name: 'Wednesday', abbreviation: 'W', value: 3 },
    { name: 'Thursday', abbreviation: 'Th', value: 4 },
    { name: 'Friday', abbreviation: 'F', value: 5 },
    { name: 'Saturday', abbreviation: 'S', value: 6 }
];

const colorScale: { [name in MoodStatus]: string } = {
    [MoodStatus.Bad]: 'opacity-20',
    [MoodStatus.Okayish]: 'opacity-40',
    [MoodStatus.Average]: 'opacity-60',
    [MoodStatus.Good]: 'opacity-80',
    [MoodStatus.Excellent]: 'opacity-100'
};

export default function MoodMatrix({ moods }: Props) {
    const [selectedMoodStatus, setSelectedMoodStatus] = useState(null as unknown as (null | MoodStatus));

    const today = new Date();
    const weeksOfThisMonth = getWeeksInMonth(today);

    const weeklyMoods: WeeklyMood[] = new Array(weeksOfThisMonth).fill(0).map((_, index) => {
        const week = index + 1;

        const moodsForThisWeek = daysOfTheWeek.map((day) => {
            const nullMood = { id: `${week}-${day.value}`, comment: '', status: null as unknown as MoodStatus, createdAt: new Date() };
            const foundMood = moods.find((mood) => getWeekOfMonth(mood.createdAt) === week && getDay(mood.createdAt) === day.value);

            return foundMood || nullMood;
        });

        return { week, moods: moodsForThisWeek };
    });

    const handleSelectStatus = (status: (null | MoodStatus)) => {
        if (selectedMoodStatus === status) {
            return setSelectedMoodStatus(null);
        }

        setSelectedMoodStatus(status);
    };

    return (
        <div className="flex flex-row items-center gap-5 sm:flex-col sm:items-start">
            <div className="mb-6 grid grid-cols-8 gap-2">
                <div></div>
                {daysOfTheWeek.map((day) => <div key={day.value} className="text-center">{day.abbreviation}</div>)}

                {weeklyMoods.map((weekly) => (
                    <Fragment key={weekly.week}>
                        <div className="text-sm"># {weekly.week} </div>
                        {weekly.moods.map((mood) => (
                            <div key={mood.id}
                                onClick={() => handleSelectStatus(mood.status)}
                                className={clsx({
                                    [colorScale[mood.status] ?? '']: true,
                                    'rounded cursor-pointer': true,
                                    'bg-green-400': !!colorScale[mood.status],
                                    'bg-neutral-700 !opacity-100': !colorScale[mood.status] || selectedMoodStatus && selectedMoodStatus !== mood.status
                                })}
                            >
                            </div>))}
                    </Fragment>
                ))}
            </div>
            <div className="flex flex-row justify-end gap-2 sm:flex-col">
                <div className="flex flex-col-reverse gap-1 sm:flex-row">
                    {(Object.keys(colorScale) as MoodStatus[]).map((moodStatus) => (
                        <div key={moodStatus}
                            className={clsx({
                                'h-4 w-4 rounded cursor-pointer': true,
                                'hover:outline hover:outline-1 hover:outline-white': true,
                                'outline outline-1 outline-white': selectedMoodStatus === moodStatus
                            })}
                            onClick={() => handleSelectStatus(moodStatus)}
                        >
                            <div className={`h-full w-full rounded bg-green-400 ${colorScale[moodStatus]}`}></div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col justify-between text-xs sm:flex-row-reverse">
                    <div>{MoodStatus.Excellent}</div>
                    <div>{MoodStatus.Bad}</div>
                </div>
            </div>
        </div>
    );
}
