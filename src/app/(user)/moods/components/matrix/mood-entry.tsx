import * as Tooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';

import { getRelativeDateWithoutTime } from '@/lib/date/format';

import { colorScale, MatrixMood } from './constants';

type MoodEntryModel = MatrixMood & { selected: boolean | null };

interface Props {
    mood: MoodEntryModel;
    onEntrySelected: (entry: MoodEntryModel) => void;
}

export default function MoodEntry({ mood, onEntrySelected }: Props) {
    const now = new Date();
    const hasStatus = mood.status !== null;
    const entry = (
        <div onClick={() => onEntrySelected(mood)}
            className={clsx({
                [colorScale[mood.status!]]: mood.status !== null,
                'rounded cursor-pointer': true,
                'bg-green-400': mood.status !== null || mood.selected,
                'bg-neutral-700 !opacity-100': mood.status === null || mood.selected === false
            })}
        >
        </div>
    );
    const entryWithStatus = (
        <Tooltip.Provider delayDuration={400} skipDelayDuration={1000}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>{entry}</Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content sideOffset={5} className="max-w-xs select-none rounded bg-slate-600 p-3 text-sm text-white shadow-sm">
                        <div className="text-sm">
                            <span>{mood.status}</span>{' '}
                            <span className="text-slate-400"># {getRelativeDateWithoutTime(mood.createdAt, now)}</span>
                        </div>
                        <div className="font-normal">{mood.comment ?? 'No comment here'}</div>
                        <Tooltip.Arrow className="fill-slate-600" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );

    return !hasStatus ? entry : entryWithStatus;
}
