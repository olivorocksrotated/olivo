import { format } from 'date-fns';

import { getServerSession } from '@/lib/auth/session';
import { getNextMeetingByUser } from '@/lib/meetings/get';

import StartButton from '../../components/start-btn';

function GradientBorder({ children, className }: any) {
    return (
        <div className={`${className}`}>
            <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-blue-500 p-1">
                <div className={`${className} bg-gray-800 p-5`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

function MeetingInfo({ meeting }: { meeting: any }) {
    const startTime = format(meeting.startDate, 'p');
    const endTime = format(meeting.endDate, 'p');
    const day = format(meeting.startDate, 'do \'of\' MMMM');

    return (
        <>
            <div className="text-sm font-light text-slate-100">
                {day}
            </div>
            <div className="text-lg font-semibold text-slate-300">
                {`${startTime} - ${endTime} with ${meeting.report}`}
            </div>
        </>
    );
}

export default async function NextMeetingCard() {
    const { user } = await getServerSession();
    const meeting = await getNextMeetingByUser(user.id);

    return (
        <GradientBorder className="inline-flex gap-4 rounded-lg shadow-sm">
            <div>
                <div className="py-3 text-sm font-extralight text-slate-100">
                    Next feedback session
                </div>
                {meeting ? <MeetingInfo meeting={meeting}></MeetingInfo> : <>No feedback session scheduled</>}
            </div>
            <div className="flex items-center justify-center p-10">
                <StartButton></StartButton>
            </div>
        </GradientBorder>
    );
}
