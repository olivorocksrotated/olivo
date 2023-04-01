export type MeetingDescription = {
    startDate: Date;
    interval: string;
    duration: number;
    report: string;
};

export type Meeting = {
    startDate: Date;
    endDate: Date;
    report: string;
};
