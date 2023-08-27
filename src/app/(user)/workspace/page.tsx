import { DailyNotes } from './components/dailyNotes';

export default function Workspace() {
    return (
        <div className="grid h-full grid-cols-2 gap-4 pr-32">
            <div className="rounded-lg bg-neutral-900 p-5">
                <div className="mb-5 text-xl">Daily Notes</div>
                <div className="h-full w-full">
                    <DailyNotes></DailyNotes>
                </div>

            </div>

            <div className="rounded-lg bg-neutral-900 p-5">
                <div className="mb-5 text-xl">Tags</div>
            </div>
        </div>
    );
}
