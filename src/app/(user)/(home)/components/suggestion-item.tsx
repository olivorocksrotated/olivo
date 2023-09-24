import React, { forwardRef, useImperativeHandle } from 'react';

import { Key } from '@/lib/keys/types';

export default forwardRef(function SuggestionItem(props: any, ref) {
    const id: string | null = props.items[0];
    const query: string = props.query;
    const selectItem = () => props.command({ id: id || query });

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }: any) => {
            if (event.key === Key.Enter) {
                selectItem();

                return true;
            }

            return false;
        }
    }));

    return (
        <button className="rounded bg-neutral-950 px-1  text-sm outline-none"
            onClick={() => selectItem()}
            type="button"
        >
            {id ? <span>{id}</span> : <span>Create: {query}</span>}
        </button>
    );
});
