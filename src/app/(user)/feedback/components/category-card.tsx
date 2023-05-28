'use client';

import { useState } from 'react';

interface Props {
    category: string;
}

export default function CategoryCard({ category }: Props) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div className="relative flex h-40 w-40 cursor-pointer flex-col justify-end overflow-hidden rounded-md bg-slate-700 shadow-lg" onClick={handleClick}>
            <div className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border ${isClicked ? 'border-teal-600' : 'border-slate-500'}`}>
                <svg className={`h-4 w-4 text-teal-600 ${isClicked ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>

            <div className="pb-3 pl-3 font-semibold">{category}</div>
        </div>
    );
}
