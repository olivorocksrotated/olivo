'use server';

import { Mood } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';

import { getStreamedAiResponse } from '../ai/get';
import { getServerSession } from '../auth/session';
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
        ${moods.map((mood) => `${formatDate(mood.createdAt)}: I felt ${mood.status}. ${mood.comment}`)}
    `;
}

export async function createMoodSummaryPrompt(userId: string): Promise<string> {
    const executionTimeframe = getMoodExecutionTimeframe();

    const moods = await getMoods({
        userId,
        filters: { created: { value: 'between', ...executionTimeframe } }
    });

    return createPrompt({
        action: 'Tell me in detail how you perceive my mood. Use empathetic voice and tone.',
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
        action: 'Tell me in detail what can I do to improve my mood. Use empathetic voice and tone.',
        moods,
        ...executionTimeframe
    });
}

export async function summarizeMood(userId: string) {
    const executionTimeframe = getMoodExecutionTimeframe();
    // const executionName = AiExecutionName.MoodSummary;

    const moods = await getMoods({
        userId,
        filters: { created: { value: 'between', ...executionTimeframe } }
    });

    const prompt = createPrompt({
        action: 'Tell me in detail how you perceive my mood. Use empathetic voice and tone.',
        moods,
        ...executionTimeframe
    });

    const response = await getStreamedAiResponse(prompt);
    // await createAiExecution({ userId, executionName, prompt, response });

    return response;
}

async function adviseMood(userId: string) {
    const executionTimeframe = getMoodExecutionTimeframe();
    // const executionName = AiExecutionName.MoodAdvice;

    const moods = await getMoods({
        userId,
        filters: { created: { value: 'between', ...executionTimeframe } }
    });

    const prompt = createPrompt({
        action: 'Tell me in detail what can I do to improve my mood. Use empathetic voice and tone.',
        moods,
        ...executionTimeframe
    });

    const response = await getStreamedAiResponse(prompt);
    // await createAiExecution({ userId, executionName, prompt, response });

    return response;
}

export const summarizeMoodAction = zact()(
    async () => {
        const { user } = await getServerSession();
        const summary = await summarizeMood(user.id);
        const advise = await adviseMood(user.id);

        revalidatePath('/moods');

        return { summary, advise };
    }
);
