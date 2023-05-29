import { useState } from 'react';

interface Props {
    tag: string;
}

export default function CategoryBatchSelector({ tag }: Props) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div className={`flex cursor-pointer items-center space-x-1 rounded-full border border-slate-700 p-2 text-sm hover:bg-slate-700 ${isClicked ? 'bg-slate-700' : ''}`}
            onClick={handleClick}
        >
            <div className={`h-2 w-2 ${isClicked ? 'bg-teal-600' : 'bg-slate-500'} rounded-full`}></div>
            <div className={` ${isClicked ? 'text-slate-100' : 'text-slate-400'}`}>{tag}</div>
        </div>
    );
}
