import { Category, FeedbackSuggestionTag } from './types';

export function getFeedbackCategories() {
    const categories: Category[] = [
        { id: '1', name: 'Communication' },
        { id: '2', name: 'Teamwork' },
        { id: '3', name: 'Leadership' },
        { id: '4', name: 'Problem solving' },
        { id: '5', name: 'Debugging' },
        { id: '6', name: 'Code quality' },
        { id: '7', name: 'Code review' }
    ];

    return categories;
}

export function getFeedbackSuggestionTags() {
    const feedbackSuggestionTags: FeedbackSuggestionTag[] = [
        { id: '1', name: 'Adapt communication style' },
        { id: '2', name: 'Ask for help' },
        { id: '3', name: 'Conduct 1-on-1s' },
        { id: '4', name: 'Articulate something' }
    ];

    return feedbackSuggestionTags;
}
