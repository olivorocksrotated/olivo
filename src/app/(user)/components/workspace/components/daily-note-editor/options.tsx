import { Selection } from '@tiptap/pm/state';
import { useZact } from 'zact/client';

import { createNoteAction } from '@/lib/notes/create';

import { getTagsFromFragment } from '../editor-utils';

export default function Options({ selection }: { selection?: Selection }) {
    const { mutate: createNote } = useZact(createNoteAction);

    const options = [
        { label: 'Unresolved note',
            action: () => {
                if (selection) {
                    const tags = getTagsFromFragment(selection.content().content);
                    createNote({ text: JSON.stringify({ ...selection.content(), type: 'doc' }), tags });
                }
            } },
        /* eslint-disable no-empty-function */
        { label: 'Task', action: () => {} },
        /* eslint-disable no-empty-function */
        { label: 'Commitment', action: () => {} },
        /* eslint-disable no-empty-function */
        { label: 'Feedback', action: () => {} }
    ];

    return (
        <div className="p-2">
            <div className="text-sm text-neutral-200">Turn into</div>
            <div className="flex flex-col items-start">
                {options.map((option) => (
                    <button onClick={option.action}
                        className="w-full rounded px-2 py-1 text-left outline-none hover:bg-neutral-500 focus:bg-neutral-500"
                        type="button"
                        key={option.label}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
