'use client';

import { AiExecutionName } from '@prisma/client';
import { useState } from 'react';

import Select from '@/app/components/ui/select/select';

import { ClientCommitment } from '../../organize/types';
import { BaseMood } from '../../reflect/types';
import AiUnderstanding from '../components/ai-understanding';
import Insights from '../components/insights';
import { NullableAiExecutionName } from '../types';
import { aiExecutionNameToTopic, questions } from './constants';

interface Props {
    thisMonthMoods: BaseMood[];
    lastMonthMoods: BaseMood[];
    last4WeeksCommitments: ClientCommitment[];
}

export default function UnderstandClient({
    thisMonthMoods,
    lastMonthMoods,
    last4WeeksCommitments
}: Props) {
    const [selectedExecutionName, setSelectedExecutionName] = useState<NullableAiExecutionName>(null);
    const selectedTopic = selectedExecutionName ? aiExecutionNameToTopic[selectedExecutionName] : null;

    return (
        <div>
            <div className="mb-8 w-full sm:w-96">
                <h3 className="mb-2">What would you like to understand more about?</h3>
                <Select
                    itemGroups={questions}
                    label="What would you like to understand more about?"
                    placeholder="Select a question"
                    onValueChange={(value) => setSelectedExecutionName(value as AiExecutionName)}
                />
            </div>
            <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
                <div className="max-w-2xl grow">
                    <AiUnderstanding selectedExecutionName={selectedExecutionName} />
                </div>
                <div className="max-w-full grow sm:max-w-2xl">
                    <Insights
                        selectedTopic={selectedTopic}
                        thisMonthMoods={thisMonthMoods}
                        lastMonthMoods={lastMonthMoods}
                        last4WeeksCommitments={last4WeeksCommitments}
                    />
                </div>
            </div>
        </div>
    );
}
