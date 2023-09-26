'use client';

import { AiExecutionName } from '@prisma/client';
import { useState } from 'react';

import Select, { ItemGroup } from '@/app/components/ui/select/select';

import { BaseMood } from '../../reflect/types';
import AiUnderstanding from '../components/ai-understanding';
import Insights from '../components/insights';
import { NullableAiExecutionName } from '../types';
import { aiExecutionNameToTopic } from './constants';

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
    const selectedTopic = selectedExecutionName ? aiExecutionNameToTopic[selectedExecutionName] : null;

    return (
        <div>
            <div className="mb-8 w-96">
                <h3 className="mb-2">Select a question you would like to answer</h3>
                <Select itemGroups={questions}
                    label="What would you like to understand more about?"
                    placeholder="Select a question"
                    onValueChange={(value) => setSelectedExecutionName(value as AiExecutionName)}
                />
            </div>
            <div className="flex flex-wrap gap-4">
                <div className="max-w-2xl"><AiUnderstanding selectedExecutionName={selectedExecutionName} /></div>
                <Insights selectedTopic={selectedTopic} thisMonthMoods={thisMonthMoods} />
            </div>
        </div>
    );
}
