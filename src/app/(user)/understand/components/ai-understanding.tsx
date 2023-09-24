'use client';

import { AiExecution, AiExecutionName } from '@prisma/client';
import { useChat } from 'ai/react';
import { useState } from 'react';

import Button from '@/app/components/ui/button/button';
import MarkdownEditor from '@/app/components/ui/markdown-editor/markdown-editor';
import Select, { ItemGroup } from '@/app/components/ui/select/select';
import { getRelativeDate } from '@/lib/date/format';
import { fetchFromApi, getApiUrl, ResourcePath } from '@/lib/http/fetch';
import { HttpMethod } from '@/lib/http/types';

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

export default function AiUnderstanding() {
    const [body, setBody] = useState<{
        execution: null | AiExecutionName
    }>({ execution: null });

    const [lastExecutionDate, setLastExecutionDate] = useState<Date | null>(null);

    const { messages, isLoading, setInput, setMessages, handleSubmit } = useChat({
        api: getApiUrl(ResourcePath.Ai, ''),
        body
    });

    const aiResponse = messages.reduce((content, message) => (message.role !== 'user' ? content + message.content : content), '');

    const setExecutionName = (executionName: AiExecutionName) => {
        setInput(executionName);
        setBody({ execution: executionName });
    };

    const setLastStoredExecution = async (executionName: AiExecutionName) => {
        const lastExecutionResponse = await fetchFromApi({
            method: HttpMethod.GET,
            path: ResourcePath.Ai,
            attachToPath: `/${executionName}`
        });
        const lastExecution: AiExecution = await lastExecutionResponse.json();

        if (!lastExecution) {
            setMessages([]);
            setLastExecutionDate(() => null);

            return;
        }

        setMessages([{
            id: lastExecution.id,
            role: 'assistant',
            content: lastExecution.response
        }]);
        setLastExecutionDate(() => lastExecution.createdAt);
    };

    const handleSelectOption = async (executionName: AiExecutionName) => {
        setExecutionName(executionName);
        await setLastStoredExecution(executionName);
    };

    const forceSetInputAfterReset = () => {
        if (!body.execution) {
            return;
        }

        setMessages([]);
        setExecutionName(body.execution);
    };

    const handleButtonClick = () => {
        forceSetInputAfterReset();
        setLastExecutionDate(() => new Date());
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-10 flex flex-wrap gap-4">
                <div className="w-96">
                    <Select itemGroups={itemGroups}
                        label="What would you like to learn about?"
                        placeholder="Select a question"
                        disabled={isLoading}
                        onValueChange={(value) => handleSelectOption(value as AiExecutionName)}
                    />
                </div>
                <div className="w-full sm:w-64">
                    <Button type="submit"
                        intent="cta"
                        w="full"
                        label={!isLoading ? 'Get answer from AI' : 'Generating response...'}
                        loading={isLoading}
                        disabled={isLoading || !body.execution}
                        onClick={handleButtonClick}
                    />
                </div>
            </form>
            {lastExecutionDate ? (
                <p className="mb-2 text-neutral-400">Last execution {getRelativeDate(lastExecutionDate, new Date()).toLowerCase()}</p>
            ) : null}
            <div className="max-h-96 overflow-y-auto rounded border border-neutral-600 p-4 leading-loose">
                {messages.length === 0 ? <div className="text-neutral-600">Your response will appear here</div> : null}
                {messages.length !== 0 ? <MarkdownEditor disabled={true} value={aiResponse} /> : null}
            </div>
        </div>
    );
}
