export interface Category {
    id: string;
    name: string;
}

export interface FeedbackSuggestionTag {
    id: string;
    name: string;
}

export enum FeedbackType {
    Praise = 'praise',
    Improve = 'improve',
    None = 'none'
}
export interface FeedbackEntry {
    id?: string;
    giverId: string;
    receiverId: string;
    type: FeedbackType;
    categories: Category[];
    badges: FeedbackSuggestionTag[];
    comment: string;
}

