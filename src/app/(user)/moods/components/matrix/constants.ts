import { Mood, MoodStatus } from '@prisma/client';

export type MatrixMood = Pick<Mood, 'id' | 'comment' | 'createdAt'> & { status: MoodStatus | null }

export const colorScale: { [name in MoodStatus]: string } = {
    [MoodStatus.Bad]: 'opacity-20',
    [MoodStatus.Okayish]: 'opacity-40',
    [MoodStatus.Average]: 'opacity-60',
    [MoodStatus.Good]: 'opacity-80',
    [MoodStatus.Excellent]: 'opacity-100'
};
