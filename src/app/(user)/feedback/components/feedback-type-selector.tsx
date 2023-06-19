'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { TbRocket, TbSchoolBell } from 'react-icons/tb';

import { FeedbackType } from '@/lib/feedback/types';

interface Props {
    feedbackType: FeedbackType;
    onTypeSelected: (name: string, value: string) => void;
}

export default function FeedbackTypeSelector({ feedbackType, onTypeSelected }: Props) {
    const [selectedType, setSelectedType] = useState(feedbackType);

    const selectorStyles = clsx(
        'flex h-[150px] w-[245px] cursor-pointer flex-col flex-wrap justify-center rounded-md border px-8 py-3 pl-4 shadow-md outline-none transition-all duration-150 ease-linear',
        'after:border-t after:border-slate-500',
        'hover:border-teal-600 hover:bg-slate-700 hover:text-slate-100 hover:after:border-t-slate-100'
    );
    const textSelectorStyles = clsx('text-xl font-bold uppercase');
    const praiseStyles = clsx({
        'text-slate-100 border-teal-600 after:border-t-slate-100 bg-slate-700 shadow-slate-700': selectedType === FeedbackType.Praise,
        'border-slate-500 text-slate-500': selectedType !== FeedbackType.Praise
    });
    const improveStyles = clsx({
        'text-slate-100 border-teal-600 after:border-t-slate-100 bg-slate-700 shadow-slate-700': selectedType === FeedbackType.Improve,
        'border-slate-500 text-slate-500': selectedType !== FeedbackType.Improve
    });

    const handleClick = (option: FeedbackType) => {
        setSelectedType(option);
        onTypeSelected('type', option);
    };

    return (
        <div className="relative mb-4 flex flex-nowrap gap-5">
            <div onClick={() => handleClick(FeedbackType.Praise)} className={`${selectorStyles} ${praiseStyles}`}>
                <div><TbRocket fontSize={32} /></div>
                <h3 className={textSelectorStyles}>Praise</h3>
            </div>

            <div onClick={() => handleClick(FeedbackType.Improve)} className={`${selectorStyles} ${improveStyles}`}>
                <div><TbSchoolBell fontSize={32} /></div>
                <h3 className={textSelectorStyles}>Improve</h3>
            </div>
        </div>
    );
}
