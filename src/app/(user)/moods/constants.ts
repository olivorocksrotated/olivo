import { MoodStatus } from '@prisma/client';

export interface MoodOption {
    icon: string;
    name: MoodStatus;
}

export const moodOptions: { [name in MoodStatus]: MoodOption } = {
    [MoodStatus.Bad]: { icon: '💩', name: MoodStatus.Bad },
    [MoodStatus.Okayish]: { icon: '😓', name: MoodStatus.Okayish },
    [MoodStatus.Average]: { icon: '🆗', name: MoodStatus.Average },
    [MoodStatus.Good]: { icon: '🙂', name: MoodStatus.Good },
    [MoodStatus.Excellent]: { icon: '💚', name: MoodStatus.Excellent }
};

export const moodValues: { [name in MoodStatus]: number } = {
    [MoodStatus.Bad]: 0,
    [MoodStatus.Okayish]: 1,
    [MoodStatus.Average]: 2,
    [MoodStatus.Good]: 3,
    [MoodStatus.Excellent]: 4
};
