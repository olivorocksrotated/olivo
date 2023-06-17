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
    Improve = 'improve'
}
export interface FeedbackEntry {
    id?: string;
    giverId: string;
    receiverId: string;
    type: FeedbackType | null;
    categories: Category[];
    badges: FeedbackSuggestionTag[];
    comment: string;
}

