import { Mood } from '@prisma/client';

interface Props {
    moods: Pick<Mood, 'id' | 'comment' | 'status' | 'createdAt'>[];
}

export default function MoodsList({ moods }: Props) {
    return (
        <div>
            <ul role="list" className="divide-y divide-gray-700">
                {moods.map((mood) => (
                    <li key={mood.id} className="py-3 sm:py-4">
                        {mood.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}
