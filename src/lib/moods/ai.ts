import { AiExecutionName } from '@prisma/client';
import { sub } from 'date-fns';

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

    if (!canExecuteAi({ userId, executionName: AiExecutionName.MoodSummary, createdAfter: twoWeeksAgo })) {
        throw new Error('AI executions quota exceeded to summarize moods');
    }

    const moods = await getMoods({
        userId,
        filters: { created: { value: 'between', startDate: twoWeeksAgo, endDate: now } }
    });

    const prompt = `
        Tell me in detail how you perceive my mood from the past 2 weeks.
        ${moodStatusPrompt}
        This is how I felt from the ${formatDate(twoWeeksAgo)} until the ${formatDate(now)}:
        ${moods.map((mood) => `${formatDate(mood.createdAt)}: I felt ${mood.status}. ${mood.comment}`)}
    `;

    return getAiResponse(prompt);
}

export async function adviseMood(userId: string): Promise<string> {
    const now = new Date();
    const twoWeeksAgo = sub(now, { weeks: 2 });

    if (!canExecuteAi({ userId, executionName: AiExecutionName.MoodAdvice, createdAfter: twoWeeksAgo })) {
        throw new Error('AI executions quota exceeded to get advice on moods');
    }

    const moods = await getMoods({
        userId,
        filters: { created: { value: 'between', startDate: twoWeeksAgo, endDate: now } }
    });

    const prompt = `
        Tell me in detail what can I do to improve my mood.
        ${moodStatusPrompt}
        This is how I felt from the ${formatDate(twoWeeksAgo)} until the ${formatDate(now)}:
        ${moods.map((mood) => `${formatDate(mood.createdAt)}: I felt ${mood.status}. ${mood.comment}`)}
    `;

    return getAiResponse(prompt);
}
