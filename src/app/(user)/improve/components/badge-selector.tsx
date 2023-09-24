import clsx from 'clsx';
import { useState } from 'react';

import { FeedbackSuggestionTag } from '@/lib/feedback/types';

interface Props {
    tag: FeedbackSuggestionTag;
    onBadgeSelected: (value: FeedbackSuggestionTag) => void;
}

export default function CategoryBadgeSelector({ tag, onBadgeSelected }: Props) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
        onBadgeSelected(tag);
    };

    const badgeWrapperStyles = clsx(
        'flex cursor-pointer items-center space-x-1 rounded-full border border-slate-700 p-2 text-sm',
        'hover:bg-slate-700',
        { 'bg-slate-700': isClicked }
    );
    const dotStyles = clsx(
        'h-2 w-2 rounded-full',
        { 'bg-teal-600': isClicked, 'bg-slate-500': !isClicked }
    );
    const badgeTextStyles = clsx({
        'text-slate-100': isClicked,
        'text-slate-400': !isClicked
    });

    return (
        <div className={badgeWrapperStyles}
            onClick={handleClick}
        >
            <div className={dotStyles}></div>
            <div className={badgeTextStyles}>{tag.name}</div>
        </div>
    );
}
