import Mention from '@tiptap/extension-mention';
import StarterKit from '@tiptap/starter-kit';

import suggestion from './suggestions';
import { Tag } from './tag';

const mentionStyles = 'text-pink-400 font-bold italic';

const tagStyles = 'text-purple-400 font-bold italic';

const network = ['Rafa', 'Andrey', 'Irem', 'Ali', 'Lisa', 'Beto', 'Oleh', 'Cozette', 'Oscar', 'Alex'];

export function editorExtensions(tags: string[]) {
    return [
        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false
            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false
            }
        }),
        Mention.configure({
            HTMLAttributes: {
                class: mentionStyles
            },
            suggestion: suggestion(network)
        }),
        Tag.configure({
            HTMLAttributes: {
                class: tagStyles
            },
            suggestion: suggestion(tags)
        })
    ];
}
