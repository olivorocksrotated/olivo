'use client';

import { Mood, MoodStatus } from '@prisma/client';
import { Card, Select, SelectItem, Subtitle, Title } from '@tremor/react';
import { useMemo, useState } from 'react';

import { formatDate } from '@/lib/date/format';

type BaseMood = Pick<Mood, 'id' | 'comment' | 'status' | 'createdAt'>;

interface Props {
    thisMonthMoods: BaseMood[];
    lastMonthMoods: BaseMood[];
}

const allMoodStatus = Object.keys(MoodStatus);

export default function MoodSummary({ thisMonthMoods, lastMonthMoods }: Props) {
    const moodsByStatus = useMemo(() => [...thisMonthMoods, ...lastMonthMoods].reduce((acc, mood) => ({
        ...acc,
        ...mood.comment ? { [mood.status]: [...acc[mood.status], mood] } : {}
    }), {
        [MoodStatus.Bad]: [] as BaseMood[],
        [MoodStatus.Okayish]: [] as BaseMood[],
        [MoodStatus.Average]: [] as BaseMood[],
        [MoodStatus.Good]: [] as BaseMood[],
        [MoodStatus.Excellent]: [] as BaseMood[]
    }), [thisMonthMoods, lastMonthMoods]);

    const [selectedMood, setSelectedMood] = useState(MoodStatus.Excellent as MoodStatus);

    return (
        <Card>
            <Title>Your comments through the months</Title>
            <Subtitle className="mb-4 !text-neutral-300">This summary can help you find patterns and draw conclusions about what is moving your needle and your mood</Subtitle>
            <div className="mb-4 w-full sm:max-w-[200px]">
                <Select placeholder="Select a mood" onValueChange={(value) => setSelectedMood(value as MoodStatus)} value={selectedMood}>
                    {allMoodStatus.map((status) => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                </Select>
            </div>
            <div>
                {moodsByStatus[selectedMood].length > 0 ? moodsByStatus[selectedMood].map((mood) => (
                    <ul key={mood.id}>
                        <li className="mb-2">
                            <p>{mood.comment}</p>
                            <div className="text-xs text-neutral-400">{formatDate(mood.createdAt)}</div>
                        </li>
                    </ul>
                )) : <p className="text-sm text-neutral-300">There are no comments about your {selectedMood.toLowerCase()} moods</p>}
            </div>
        </Card>
    );
}
