import * as Tooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';

import { colorScale, MatrixMood } from './constants';

type MoodEntryModel = MatrixMood & { selected: boolean | null };

interface Props {
    mood: MoodEntryModel;
    onEntrySelected: (entry: MoodEntryModel) => void;
}

export default function MoodEntry({ mood, onEntrySelected }: Props) {
    return (
        <Tooltip.Provider key={mood.id} delayDuration={400} skipDelayDuration={1000}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <div onClick={() => onEntrySelected(mood)}
                        className={clsx({
                            [colorScale[mood.status!]]: mood.status !== null,
                            rounded: true,
                            'bg-green-400 cursor-pointer': mood.status !== null || mood.selected,
                            'bg-neutral-700 !opacity-100': mood.status === null || mood.selected === false
                        })}
                    >
                    </div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content sideOffset={5}
                        className="max-w-xs select-none rounded bg-slate-600 p-3 text-sm text-white shadow-sm"
                    >
                        {mood.comment}
                        <Tooltip.Arrow className="fill-slate-600" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}
