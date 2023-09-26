'use client';

import { Mood, MoodStatus } from '@prisma/client';
import { Card, LineChart, Title } from '@tremor/react';
import { getDate, getDaysInMonth } from 'date-fns';
import { useMemo } from 'react';

import { newEmptyArrayOfLength } from '@/lib/array/new-empty-array-of-length';

type BaseMood = Pick<Mood, 'comment' | 'status' | 'createdAt'>;

interface CharMood {
    day: number;
    'This month': number | null;
    'Last month': number | null;
}

interface Props {
    thisMonthMoods: BaseMood[];
    lastMonthMoods: BaseMood[];
}

const moodValues: { [name in MoodStatus]: number } = {
    [MoodStatus.Bad]: 0,
    [MoodStatus.Okayish]: 1,
    [MoodStatus.Average]: 2,
    [MoodStatus.Good]: 3,
    [MoodStatus.Excellent]: 4
};
const moodIndexes = Object.fromEntries(Object.entries(moodValues).map(([key, value]) => [value, key]));
const mapValueToLabel = (index: number) => moodIndexes[index];

const nullMonthMood = { comment: null, status: null, createdAt: new Date() };

const today = new Date();
const daysToDisplay = getDaysInMonth(today);
const days = newEmptyArrayOfLength(daysToDisplay).map((_, index) => index + 1);

export default function MoodTrends({ thisMonthMoods, lastMonthMoods }: Props) {
    const charMoods: CharMood[] = useMemo(() => days.reduce((acc, day) => {
        const lastMonthMood = lastMonthMoods.find((m) => day === getDate(m.createdAt)) ?? nullMonthMood;
        const thisMonthMood = thisMonthMoods.find((m) => day === getDate(m.createdAt)) ?? nullMonthMood;

        return [
            ...acc,
            { day, 'This month': moodValues[thisMonthMood?.status as MoodStatus], 'Last month': moodValues[lastMonthMood?.status as MoodStatus] }
        ];
    }, [] as CharMood[]), [thisMonthMoods, lastMonthMoods]);

    return (
        <Card>
            <Title>Your trend compared to last month</Title>
            <LineChart
                data={charMoods}
                index="day"
                categories={['This month', 'Last month']}
                colors={['emerald', 'gray']}
                valueFormatter={mapValueToLabel}
            />
        </Card>
    );
}
