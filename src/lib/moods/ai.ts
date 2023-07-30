import { AiExecutionName } from '@prisma/client';
import { sub } from 'date-fns';

import { createAiExecution } from '../ai/create';
import { getAiExecution, getAiResponse } from '../ai/get';
import { formatDate } from '../date/format';
import { getMoods } from './get';

const moodStatusPrompt = 'Excellent is better than good, good is better than average, average is better than okayish, and okayish is better than bad.';

export async function canExecuteAi({ userId, executionName, createdAfter }: {
    userId: string,
    executionName: AiExecutionName
    createdAfter: Date
}): Promise<boolean> {
    const lastExecution = await getAiExecution({ userId, executionName, createdAfter });

    return !lastExecution;
}

export async function summarizeMood(userId: string): Promise<string> {
    const now = new Date();
    const twoWeeksAgo = sub(now, { weeks: 2 });
    const executionName = AiExecutionName.MoodSummary;

    if (!canExecuteAi({ userId, executionName, createdAfter: twoWeeksAgo })) {
        throw new Error('AI executions quota exceeded to summarize moods');
    }

    const moods = await getMoods({
        userId,
        filters: { created: { value: 'between', startDate: twoWeeksAgo, endDate: now } }
    });

    const prompt = `
        Tell me in detail how you perceive my mood from the past 2 weeks. Use empathetic voice and tone.
        ${moodStatusPrompt}
        This is how I felt from the ${formatDate(twoWeeksAgo)} until the ${formatDate(now)}:
        ${moods.map((mood) => `${formatDate(mood.createdAt)}: I felt ${mood.status}. ${mood.comment}`)}
    `;

    const response = await getAiResponse(prompt);
    await createAiExecution({ userId, executionName, response });

    return response;
}

export async function adviseMood(userId: string): Promise<string> {
    const now = new Date();
    const twoWeeksAgo = sub(now, { weeks: 2 });
    const executionName = AiExecutionName.MoodAdvice;

    if (!canExecuteAi({ userId, executionName, createdAfter: twoWeeksAgo })) {
        throw new Error('AI executions quota exceeded to get advice on moods');
    }

    const moods = await getMoods({
        userId,
        filters: { created: { value: 'between', startDate: twoWeeksAgo, endDate: now } }
    });

    const prompt = `
        Tell me in detail what can I do to improve my mood. Use empathetic voice and tone.
        ${moodStatusPrompt}
        This is how I felt from the ${formatDate(twoWeeksAgo)} until the ${formatDate(now)}:
        ${moods.map((mood) => `${formatDate(mood.createdAt)}: I felt ${mood.status}. ${mood.comment}`)}
    `;

    const response = await getAiResponse(prompt);
    await createAiExecution({ userId, executionName, response });

    return response;
}
