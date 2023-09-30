import { ClientCommitment } from '../../organize/types';
import { BaseMood } from '../../reflect/types';
import CommitmentsFulfilment from './commitments/commitments-fulfilment';
import MoodBullet from './moods/mood-bullet';
import MoodTrends from './moods/mood-trends';
import { InsightTopic } from './types';

interface Props {
    selectedTopic: null | InsightTopic;
    thisMonthMoods: BaseMood[];
    lastMonthMoods: BaseMood[];
    last4WeeksCommitments: ClientCommitment[];
}

export default function Insights({
    selectedTopic,
    thisMonthMoods,
    lastMonthMoods,
    last4WeeksCommitments
}: Props) {
    return (
        <>
            {selectedTopic === InsightTopic.Moods ? (
                <div>
                    <div className="mb-8"><MoodBullet moods={thisMonthMoods} /></div>
                    <MoodTrends thisMonthMoods={thisMonthMoods} lastMonthMoods={lastMonthMoods} />
                </div>
            ) : null}

            {selectedTopic === InsightTopic.Commitments ? (
                <CommitmentsFulfilment commitments={last4WeeksCommitments} />
            ) : null}
        </>
    );
}
