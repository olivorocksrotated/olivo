import { BaseMood } from '../../reflect/types';
import MoodBullet from './moods/mood-bullet';
import MoodTrends from './moods/mood-trends';
import { InsightTopic } from './types';

interface Props {
    selectedTopic: null | InsightTopic;
    thisMonthMoods: BaseMood[];
    lastMonthMoods: BaseMood[];
}

export default function Insights({
    selectedTopic,
    thisMonthMoods,
    lastMonthMoods
}: Props) {
    return (
        selectedTopic === InsightTopic.Moods ? (
            <div>
                <div className="mb-8"><MoodBullet moods={thisMonthMoods} /></div>
                <MoodTrends thisMonthMoods={thisMonthMoods} lastMonthMoods={lastMonthMoods} />
            </div>
        ) : null
    );
}
