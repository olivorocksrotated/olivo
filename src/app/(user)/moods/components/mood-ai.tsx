'use client';

import { AiExecution } from '@prisma/client';
import { Card, Subtitle, Title } from '@tremor/react';

import Button from '@/app/components/ui/button/button';

interface Props {
    lastSummaryExecution: AiExecution | null;
    lastAdviceExecution: AiExecution | null;
}

export default function MoodAi({ lastSummaryExecution, lastAdviceExecution }: Props) {
    const canTrigger = !lastSummaryExecution && !lastAdviceExecution;

    return (
        <Card>
            {canTrigger ?
                <div className="flex h-full items-center justify-center">
                    <Button intent="cta" label="Understand your mood with AI" />
                </div> :
                <div>
                    <Title>Summary of your mood</Title>
                    <p>{lastSummaryExecution?.response}</p>
                    <Subtitle>Summary of your mood</Subtitle>
                    <p>{lastAdviceExecution?.response}</p>
                </div>}
        </Card>
    );
}
