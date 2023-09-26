import { BaseMood } from '../../reflect/types';
import MoodBullet from './moods/mood-bullet';
import { InsightTopic } from './types';

interface Props {
    selectedTopic: null | InsightTopic;
    thisMonthMoods: BaseMood[];
}

export default function Insights({
    selectedTopic,
    thisMonthMoods
}: Props) {
    return (
        selectedTopic === InsightTopic.Moods ? <MoodBullet moods={thisMonthMoods} /> : null
    );
}
