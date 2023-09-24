'use client';

import { AiExecution, AiExecutionName } from '@prisma/client';
import { useChat } from 'ai/react';
import { useCallback, useEffect, useState } from 'react';

import Button from '@/app/components/ui/button/button';
import MarkdownEditor from '@/app/components/ui/markdown-editor/markdown-editor';
import { getRelativeDate } from '@/lib/date/format';
import { fetchFromApi, getApiUrl, ResourcePath } from '@/lib/http/fetch';
import { HttpMethod } from '@/lib/http/types';

import { NullableAiExecutionName } from '../types';

interface Props {
    selectedExecutionName: NullableAiExecutionName;
}

export default function AiUnderstanding({ selectedExecutionName }: Props) {
    const [body, setBody] = useState<{
        execution: NullableAiExecutionName
    }>({ execution: null });

    const [lastExecutionDate, setLastExecutionDate] = useState<Date | null>(null);

    const { messages, isLoading, setInput, setMessages, handleSubmit } = useChat({
        api: getApiUrl(ResourcePath.Ai, ''),
        body
    });

    const aiResponse = messages.reduce((content, message) => (message.role !== 'user' ? content + message.content : content), '');

    const setExecutionName = useCallback((executionName: AiExecutionName) => {
        setInput(executionName);
        setBody({ execution: executionName });
    }, [setInput]);

    const setLastStoredExecution = useCallback(async (executionName: AiExecutionName) => {
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
    }, [setMessages]);

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

    useEffect(() => {
        const handleSelectOption = async (executionName: NullableAiExecutionName) => {
            if (!executionName) {
                return;
            }
            setExecutionName(executionName);
            await setLastStoredExecution(executionName);
        };
        handleSelectOption(selectedExecutionName);
    }, [selectedExecutionName, setExecutionName, setLastStoredExecution]);

    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-10 flex flex-wrap gap-4">
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
