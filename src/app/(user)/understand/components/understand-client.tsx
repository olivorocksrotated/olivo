'use client';

import { AiExecutionName } from '@prisma/client';
import { useState } from 'react';

import Select, { ItemGroup } from '@/app/components/ui/select/select';

import { BaseMood } from '../../reflect/types';
import AiUnderstanding from '../components/ai-understanding';
import Insights from '../components/insights';
import { NullableAiExecutionName } from '../types';

interface Props {
    thisMonthMoods: BaseMood[];
}

const questions: ItemGroup[] = [
    {
        label: 'Mood',
        items: [
            {
                label: 'What can you tell me about my mood?',
                value: AiExecutionName.MoodSummary
            },
            {
                label: 'What can I do to improve my mood?',
                value: AiExecutionName.MoodAdvice
            }
        ]
    }
];

export default function UnderstandClient({ thisMonthMoods }: Props) {
    const [selectedExecutionName, setSelectedExecutionName] = useState<NullableAiExecutionName>(null);

    return (
        <div>
            <div className="w-96">
                <Select itemGroups={questions}
                    label="What would you like to understand more about?"
                    placeholder="Select a question"
                    onValueChange={(value) => setSelectedExecutionName(value as AiExecutionName)}
                />
            </div>
            <div className="flex gap-4">
                <AiUnderstanding selectedExecutionName={selectedExecutionName} />
                <Insights thisMonthMoods={thisMonthMoods} />
            </div>
        </div>
    );
}
