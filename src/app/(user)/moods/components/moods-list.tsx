import { Mood } from '@prisma/client';

import { formatRelativeDate } from '@/lib/date/format';

import { moodOptions } from '../constants';

interface Props {
    moods: Pick<Mood, 'id' | 'comment' | 'status' | 'createdAt'>[];
}


export default function MoodsList({ moods }: Props) {
    const now = new Date();

    return (
        <div className="w-fit">
            <ul role="list" className="divide-y divide-gray-700">
                {moods.map((mood) => (
                    <li key={mood.id} className="py-3 sm:py-4">
                        <div className="text-lg">
                            {moodOptions[mood.status].icon} {formatRelativeDate(mood.createdAt, now)} you were feeling <strong>{mood.status.toLowerCase()}</strong>
                        </div>
                        {mood.comment ? (
                            <div>
                                <span className="text-gray-400">Because...</span> <span>{mood.comment}</span>
                            </div>) : null}
                    </li>
                ))}
            </ul>
        </div>
    );
}
