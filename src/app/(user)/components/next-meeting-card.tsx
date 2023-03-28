import StartButton from '../reports/components/start-btn';

export default function NextMeetingCard() {
    return (
        <div className="p-3 rounded-lg inline-flex gap-4 bg-indigo-700 shadow-sm shadow-indigo-300">
            <div>
                <div className="font-extralight text-sm text-slate-100 py-3">
                    Next feedback session
                </div>
                <div className="font-light text-sm text-slate-100">
                    1st of December
                </div>
                <div className="font-semibold text-lg text-slate-300">
                    10:30 - 11:30 am with Amit
                </div>
            </div>
            <div className="flex justify-center items-center p-10">
                <StartButton></StartButton>
            </div>
        </div>
    );
}
