import { BaseMood } from '../../reflect/types';
import MoodBullet from './moods/mood-bullet';

interface Props {
    selectedTopic?: 'moods';
    thisMonthMoods: BaseMood[];
}

export default function Insights({ thisMonthMoods }: Props) {
    return <MoodBullet moods={thisMonthMoods} />;
}
