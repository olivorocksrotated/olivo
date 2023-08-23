'use client';

import { AiExecutionName } from '@prisma/client';
import { useChat } from 'ai/react';
import { useState } from 'react';

import Button from '@/app/components/ui/button/button';
import Select, { ItemGroup } from '@/app/components/ui/select/select';

const itemGroups: ItemGroup[] = [
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

export default function Ask() {
    const [body, setBody] = useState<{
        execution: null | AiExecutionName
    }>({ execution: null });

    const { messages, isLoading, setInput, setMessages, handleSubmit } = useChat({ body });

    const handleSelectOption = (value: AiExecutionName) => {
        setInput(value);
        setBody({ execution: value });
    };

    const forceSetInputAfterReset = () => {
        if (!body.execution) {
            return;
        }

        setMessages([]);
        handleSelectOption(body.execution);
    };

    return (
        <div className="flex flex-col justify-between gap-10">
            <form onSubmit={handleSubmit} className="flex gap-8">
                <div className="w-96">
                    <Select itemGroups={itemGroups}
                        label="What would you like to learn about?"
                        placeholder="Select a question"
                        disabled={isLoading}
                        onValueChange={(value) => handleSelectOption(value as AiExecutionName)}
                    />
                </div>
                <Button type="submit"
                    intent="cta"
                    label={!isLoading ? 'Get answer from AI' : 'Generating response...'}
                    loading={isLoading}
                    disabled={isLoading || !body.execution}
                    onClick={forceSetInputAfterReset}
                />
            </form>
            <div className="max-h-96 overflow-y-auto rounded border border-neutral-600 p-4 leading-loose">
                {messages.length === 0 && !isLoading ? (
                    <div className="text-neutral-600">Your response will appear here</div>
                ) : null}
                {messages.map((m) => (m.role !== 'user' ? <div key={m.id}>{m.content}</div> : null))}
            </div>
        </div>
    );
}
