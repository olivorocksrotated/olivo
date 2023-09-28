'use server';

import { sub } from 'date-fns';

import { formatDate } from '../date/format';
import { getCommitments } from './get';
import { groupCommitmentsByOverdue } from './group';

export async function createOvercommitmentPrompt(userId: string): Promise<string> {
    const referenceDate = new Date();
    const fourWeeksAgo = sub(referenceDate, { weeks: 4 });
    const commitments = await getCommitments({
        userId,
        filters: { doneBy: 'last 4 weeks' }
    });

    const groupedCommitments = groupCommitmentsByOverdue({ commitments, referenceDate });

    return `
        Tell me in detail if I am overcommitting, and tell me what is the reason. Use empathetic voice and tone.
        These are the commitments I created for myself from the ${formatDate(fourWeeksAgo)} until the ${formatDate(referenceDate)}.
        I was not able to finish these commitments on time:
        ${groupedCommitments.overdue.map((commitment) => `I committed to "${commitment.title}" by ${commitment.doneBy}, and ${commitment.doneAt ? `I got it done on the ${commitment.doneAt}` : 'I could not get it done yet'};`)}.
        I could finish these commitments on time:
        ${groupedCommitments.onTime.map((commitment) => `I committed to "${commitment.title}" by ${commitment.doneBy}, and I got it done on the ${commitment.doneAt};`)}.
    `;
}
