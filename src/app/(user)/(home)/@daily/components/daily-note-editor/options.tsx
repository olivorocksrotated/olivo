import { Selection } from '@tiptap/pm/state';
import { AiOutlinePushpin } from 'react-icons/ai';
import { MdEditNote } from 'react-icons/md';
import { useZact } from 'zact/client';

import { createNoteAction } from '@/lib/notes/create';

import { getTagsFromFragment } from '../../../components/editor-utils';


export default function Options({ selection }: { selection?: Selection }) {
    const { mutate: createNote } = useZact(createNoteAction);

    function createNoteFromSelection(extraTags?: string[]) {
        if (selection) {
            const tags = getTagsFromFragment(selection.content().content);
            createNote({ text: JSON.stringify({ ...selection.content(), type: 'doc' }), tags: [...tags, ...extraTags || []] });
        }
    }

    const options = [
        {
            icon: null,
            sectionTitle: '',
            actions: [
                {
                    label: 'Pin',
                    icon: <AiOutlinePushpin className="mr-2" />,
                    exec: () => createNoteFromSelection(['pinned'])
                }
            ]
        },
        {
            icon: null,
            sectionTitle: 'Turn into',
            actions: [
                {
                    label: 'Standalone Note',
                    icon: <MdEditNote className="mr-2" />,
                    exec: () => createNoteFromSelection()
                }
            ]
        }
    ];

    return (
        <div className="h-64 w-64 rounded border border-neutral-950 bg-neutral-900 shadow-xl">
            <div className="flex flex-col items-start">
                {
                    options.map((option, index) => (
                        <div key={option.sectionTitle} className={`flex w-full flex-col ${index > 0 ? ' my-1 border-t border-neutral-950 ' : ''}`}>
                            <div className="mx-1 mt-2 text-sm text-neutral-400">{option.sectionTitle}</div>
                            {option.actions.map((action) => (
                                <div key={action.label}
                                    className="mx-1 rounded-sm hover:bg-neutral-700 focus:bg-neutral-700"
                                >
                                    <button onClick={action.exec}
                                        className="mx-2 flex items-center px-2 py-1 outline-none"
                                        type="button"
                                    >
                                        {action.icon} {action.label}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
