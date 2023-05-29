export interface Category {
    id: number;
    name: string;
}

export enum FeedbackType {
    Praise = 'praise',
    Improve = 'improve'
}
export interface FeedbackEntry {
    id: number;
    receiverId: number;
    type: FeedbackType;
    categories: Category[];
    comment: string;
}

