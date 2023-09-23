import { Note } from '@prisma/client';

import { FilterOption } from '@/lib/notes/get-notes-by-tags';

import TagsContext from './components/tags-context/tags-context';
import YesterdayContext from './components/yesterday-context/yesteray-context';

type ContextProps = {
    tags: string[],
    notes: Note[],
    selectedTagsFilter?: string[],
    selectedOperator?: FilterOption
};

export default function Context(props: ContextProps) {
    return (
        <>
            <TagsContext {...props}></TagsContext>
            <YesterdayContext></YesterdayContext>
        </>
    );
}
