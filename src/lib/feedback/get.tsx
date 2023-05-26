import { FeedbackEntry, FeedbackType } from './types';

export function getFeedbackEntries({ userId, order = 'asc' }: {
    userId: string,
    order?: 'asc' | 'desc'
}): FeedbackEntry[] {
    console.log(userId, order);

    const feedbackEntries = [{
        id: 1,
        receiverId: 1,
        type: FeedbackType.Praise,
        categories: [{ id: 1, name: 'Communication' }, { id: 2, name: 'Teamwork' }],
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }];

    return feedbackEntries;
}
