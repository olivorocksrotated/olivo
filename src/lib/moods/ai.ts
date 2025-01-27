'use server';

import { Mood } from '@prisma/client';

import { formatDate } from '../date/format';
import { getMoodExecutionTimeframe } from './ai-timeframe';
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
        ${moods.map((mood) => `${formatDate(mood.createdAt)}: I felt ${mood.status}. ${mood.comment};`)}
    `;
}

export async function createMoodSummaryPrompt(userId: string): Promise<string> {
    const executionTimeframe = getMoodExecutionTimeframe();

    const moods = await getMoods({
        userId,
        filters: { created: { value: 'between', ...executionTimeframe } }
    });

    return createPrompt({
        action: 'Tell me in detail how you perceive my mood. Provide a brief summary of what happened, and focus on finding patterns.',
        moods,
        ...executionTimeframe
    });
}

export async function createMoodAdvicePrompt(userId: string): Promise<string> {
    const executionTimeframe = getMoodExecutionTimeframe();

    const moods = await getMoods({
        userId,
        filters: { created: { value: 'between', ...executionTimeframe } }
    });

    return createPrompt({
        action: 'Tell me in detail what actions can I take to improve my mood. Use empathetic voice and tone.',
        moods,
        ...executionTimeframe
    });
}
