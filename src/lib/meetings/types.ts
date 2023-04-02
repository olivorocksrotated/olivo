export enum Rythm {
    EveryDay,
    EveryOtherDay,
    EveryWeek,
    EveryOtherWeek,
    EveryMonth,
    EveryOtherMonth
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
