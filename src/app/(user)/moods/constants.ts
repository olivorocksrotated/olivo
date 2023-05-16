import { MoodStatus } from '@prisma/client';

export interface MoodOption {
    icon: string;
    name: MoodStatus;
}

export const moodOptions: MoodOption[] = [
    { icon: '💩', name: MoodStatus.Bad },
    { icon: '😓', name: MoodStatus.Okayish },
    { icon: '🆗', name: MoodStatus.Average },
    { icon: '🙂', name: MoodStatus.Good },
    { icon: '💚', name: MoodStatus.Excellent }
];
