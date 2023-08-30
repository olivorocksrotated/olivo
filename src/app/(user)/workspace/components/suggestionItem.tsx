import React, { forwardRef, useImperativeHandle } from 'react';

import { Key } from '@/lib/keys/types';

export default forwardRef(function SuggestionItem(props: any, ref) {
    const item = props.items[0];
    const selectItem = () => props.command({ id: item });

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }: any) => {
            if (event.key === Key.Enter) {
                selectItem();

                return true;
            }

            return false;
        }
    }));

    return item ? (
        <button className="rounded bg-neutral-950 px-1  text-sm outline-none"
            onClick={() => selectItem()}
            type="button"
        >
            {item}
        </button>
    ) : null;
});
