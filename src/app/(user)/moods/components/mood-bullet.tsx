'use client';

import { Mood, MoodStatus } from '@prisma/client';
import { BarList, Bold, Card, Flex, Text, Title } from '@tremor/react';

interface Props {
    moods: Pick<Mood, 'id' | 'comment' | 'status' | 'createdAt'>[];
}

export default function MoodBullet({ moods }: Props) {
    const moodsByStatus = moods.reduce((acc, mood) => ({
        ...acc,
        [mood.status]: { ...acc[mood.status], value: acc[mood.status].value + 1 }
    }), {
        [MoodStatus.Bad]: { name: MoodStatus.Bad, value: 0 },
        [MoodStatus.Okayish]: { name: MoodStatus.Okayish, value: 0 },
        [MoodStatus.Average]: { name: MoodStatus.Average, value: 0 },
        [MoodStatus.Good]: { name: MoodStatus.Good, value: 0 },
        [MoodStatus.Excellent]: { name: MoodStatus.Excellent, value: 0 }
    });

    return (
        <Card className="max-w-lg">
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
