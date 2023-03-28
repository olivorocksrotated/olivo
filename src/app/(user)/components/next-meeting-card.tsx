import { format } from 'date-fns';

import { getServerSession } from '@/lib/auth/session';
import { getNextMeetingByUser } from '@/lib/meetings/get';

import StartButton from '../../components/start-btn';

export default async function NextMeetingCard() {
    const { user } = await getServerSession();
    const meeting = await getNextMeetingByUser(user.id);

    const startTime = format(meeting.startDate, 'p');
    const endTime = format(meeting.startDate, 'p');
    const day = format(meeting.startDate, 'do \'of\' MMMM');

    return (
        <div className="p-3 rounded-lg inline-flex gap-4 bg-indigo-700 shadow-sm shadow-indigo-300">
            <div>
                <div className="font-extralight text-sm text-slate-100 py-3">
                    Next feedback session
                </div>
                <div className="font-light text-sm text-slate-100">
                    {day}
                </div>
                <div className="font-semibold text-lg text-slate-300">
                    {`${startTime} - ${endTime} with ${meeting.report}`}
                </div>
            </div>
            <div className="flex justify-center items-center p-10">
                <StartButton></StartButton>
            </div>
        </div>
    );
}
