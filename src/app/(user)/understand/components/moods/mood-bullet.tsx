'use client';

import { Mood, MoodStatus } from '@prisma/client';
import { BarList, Bold, Card, Flex, Text, Title } from '@tremor/react';
import { useMemo } from 'react';

interface Props {
    moods: Pick<Mood, 'id' | 'comment' | 'status' | 'createdAt'>[];
}

export default function MoodBullet({ moods }: Props) {
    const moodsByStatus = useMemo(() => moods.reduce((acc, mood) => ({
        ...acc,
        [mood.status]: { ...acc[mood.status], value: acc[mood.status].value + 1 }
    }), {
        [MoodStatus.Excellent]: { name: MoodStatus.Excellent, value: 0 },
        [MoodStatus.Good]: { name: MoodStatus.Good, value: 0 },
        [MoodStatus.Average]: { name: MoodStatus.Average, value: 0 },
        [MoodStatus.Okayish]: { name: MoodStatus.Okayish, value: 0 },
        [MoodStatus.Bad]: { name: MoodStatus.Bad, value: 0 }
    }), [moods]);

    return (
        <Card className="max-h-96 sm:max-h-80">
            <Title className="mb-4">Summary of your mood through the month</Title>
            <Flex className="mb-2">
                <Text>
                    <Bold>Mood</Bold>
                </Text>
                <Text>
                    <Bold>Count</Bold>
                </Text>
            </Flex>
            <BarList data={Object.values(moodsByStatus)} />
        </Card>
    );
}
