'use client';

import { AiExecution } from '@prisma/client';
import { Card, Subtitle, Title } from '@tremor/react';
import clsx from 'clsx';
import { useZact } from 'zact/client';

import Button from '@/app/components/ui/button/button';
import { summarizeMoodAction } from '@/lib/moods/ai';

interface Props {
    lastSummaryExecution: AiExecution | null;
    lastAdviceExecution: AiExecution | null;
}

export default function MoodAi({ lastSummaryExecution, lastAdviceExecution }: Props) {
    const hasSummary = lastSummaryExecution || lastAdviceExecution;

    const { mutate: summarizeMood, isLoading: isSummarizingMood } = useZact(summarizeMoodAction);

    const paragraphStyles = clsx(
        'max-h-64 overflow-auto rounded-lg border border-neutral-600 p-4 leading-loose',
        { 'opacity-30': isSummarizingMood }
    );

    return (
        <Card>
            {!hasSummary ?
                <div className="flex h-full items-center justify-center">
                    <Button intent="cta"
                        label={!isSummarizingMood ? 'Understand your mood with AI' : 'Generating a response...'}
                        disabled={isSummarizingMood}
                        loading={isSummarizingMood}
                        onClick={() => summarizeMood(undefined)}
                    />
                </div> :
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <Title>Summary of your mood</Title>
                        <Button intent="cta"
                            size="s"
                            label={!isSummarizingMood ? '✨ Refresh response' : 'Regenerating...'}
                            disabled={isSummarizingMood}
                            loading={isSummarizingMood}
                            onClick={() => summarizeMood(undefined)}
                        />
                    </div>
                    <p className={`mb-6 ${paragraphStyles}`}>{lastSummaryExecution?.response}</p>
                    <Subtitle className="mb-4 text-lg">What can you do to improve your mood?</Subtitle>
                    <p className={paragraphStyles}>{lastAdviceExecution?.response}</p>
                </div>}
        </Card>
    );
}
