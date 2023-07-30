import { AiExecutionName, Mood } from '@prisma/client';
import { sub } from 'date-fns';

import { createAiExecution } from '../ai/create';
import { canExecuteAi, getAiResponse } from '../ai/get';
import { formatDate } from '../date/format';
import { getMoods } from './get';

function createPrompt({ action, startDate, endDate, moods }: {
    action: string,
    startDate: Date,
    endDate: Date
    moods: Mood[]
}): string {
    return `
        ${action}
        'Excellent is better than good, good is better than average, average is better than okayish, and okayish is better than bad.'
        This is how I felt from the ${formatDate(startDate)} until the ${formatDate(endDate)}:
        ${moods.map((mood) => `${formatDate(mood.createdAt)}: I felt ${mood.status}. ${mood.comment}`)}
    `;
}

export function getMoodExecutionTimeframe() {
    const now = new Date();
    const twoWeeksAgo = sub(now, { weeks: 2 });

    return { startDate: twoWeeksAgo, endDate: now };
}

export async function summarizeMood(userId: string): Promise<string> {
    const executionTimeframe = getMoodExecutionTimeframe();
    const executionName = AiExecutionName.MoodSummary;

    if (!canExecuteAi({ userId, executionName, createdAfter: executionTimeframe.startDate })) {
        throw new Error('AI executions quota exceeded to summarize moods');
    }

    const moods = await getMoods({
        userId,
        filters: { created: { value: 'between', ...executionTimeframe } }
    });

    const prompt = createPrompt({
        action: 'Tell me in detail how you perceive my mood from the past 2 weeks. Use empathetic voice and tone.',
        moods,
        ...executionTimeframe
    });

    const response = await getAiResponse(prompt);
    await createAiExecution({ userId, executionName, response });

    return response;
}

export async function adviseMood(userId: string): Promise<string> {
    const executionTimeframe = getMoodExecutionTimeframe();
    const executionName = AiExecutionName.MoodAdvice;

    if (!canExecuteAi({ userId, executionName, createdAfter: executionTimeframe.startDate })) {
        throw new Error('AI executions quota exceeded to get advice on moods');
    }

    const moods = await getMoods({
        userId,
        filters: { created: { value: 'between', ...executionTimeframe } }
    });

    const prompt = createPrompt({
        action: 'Tell me in detail what can I do to improve my mood. Use empathetic voice and tone.',
        moods,
        ...executionTimeframe
    });

    const response = await getAiResponse(prompt);
    await createAiExecution({ userId, executionName, response });

    return response;
}
