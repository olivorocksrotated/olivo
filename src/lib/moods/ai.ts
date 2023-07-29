import { AiExecutionId } from '@prisma/client';
import { sub } from 'date-fns';

import { getAiExecution } from '../ai/get';
import { formatDate } from '../date/format';
import prisma from '../prisma';

export async function summarizeMood(): Promise<string> {
    const now = new Date();
    const twoWeeksAgo = sub(now, { weeks: 2 });
    const lastExecution = await getAiExecution(AiExecutionId.MoodSummary, twoWeeksAgo);

    if (lastExecution) {
        throw new Error('AI executions quota exceeded to summarize moods');
    }

    const moods = await prisma.mood.findMany({
        where: {
            createdAt: { gte: twoWeeksAgo, lte: now }
        }
    });

    const prompt = `
        Tell me in detail how you perceive my mood from the past 2 weeks.
        Excellent is better than good, good is better than average, average is better than okayish, and okayish is better than bad.
        This is how I felt from the ${formatDate(twoWeeksAgo)} until the ${formatDate(now)}:
        ${moods.map((mood) => `${formatDate(mood.createdAt)}: I felt ${mood.status}. ${mood.comment}`)}
    `;

    // TODO: Call OpenAI

    return prompt;
}
