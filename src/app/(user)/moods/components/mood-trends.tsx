import { Mood } from '@prisma/client';

interface Props {
    moods: Pick<Mood, 'id' | 'comment' | 'status' | 'createdAt'>[];
}

export default function MoodTrend({ moods }: Props) {
    return (
        <div>{moods.map((m) => m.status)}</div>
    );
}
