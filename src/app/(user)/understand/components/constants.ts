import { AiExecutionName } from '@prisma/client';

import { ItemGroup } from '@/app/components/ui/select/select';

import { InsightTopic } from './types';

export const aiExecutionNameToTopic = {
    [AiExecutionName.MoodAdvice]: InsightTopic.Moods,
    [AiExecutionName.MoodSummary]: InsightTopic.Moods,
    [AiExecutionName.Overcommitment]: InsightTopic.Commitments
};

export const questions: ItemGroup[] = [
    {
        label: 'Mood',
        items: [
            {
                label: 'How is my mood fluctuating?',
                value: AiExecutionName.MoodSummary
            },
            {
                label: 'What can I do to improve my mood?',
                value: AiExecutionName.MoodAdvice
            }
        ]
    },
    {
        label: 'Commitments',
        items: [
            {
                label: 'Am I overcommitting?',
                value: AiExecutionName.Overcommitment
            }
        ]
    }
];
