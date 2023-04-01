export enum Rythm {
    'everyDay',
    'everyOtherDay',
    'everyWeek',
    'everyOtherWeek',
    'everyMonth',
    'everyOtherMonth'
}

export type MeetingDescription = {
    startDate: Date;
    rythm: Rythm;
    duration: number;
    report: string;
};

export type Meeting = {
    startDate: Date;
    endDate: Date;
    report: string;
};
