import Mention from '@tiptap/extension-mention';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import StarterKit from '@tiptap/starter-kit';

import suggestion from './suggestions';
import { Tag } from './tag';

const styles = 'border rounded border-neutral-600 bold text-neutral-300 p-1';

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
                class: styles
            },
            suggestion: suggestion(network)
        }),
        Tag.configure({
            HTMLAttributes: {
                class: styles
            },
            suggestion: suggestion(tags)
        }),
        TaskList.configure({
            HTMLAttributes: {
                class: 'list-none'
            }
        }),
        TaskItem.configure({
            nested: true
        })
    ];
}
