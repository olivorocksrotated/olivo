'use client';

import clsx from 'clsx';
import { TbRocket, TbSchoolBell } from 'react-icons/tb';

import { FeedbackType } from '@/lib/feedback/types';

interface Props {
    onTypeSelected: (name: string, value: string) => void;
}

export default function FeedbackTypeSelector({ onTypeSelected } : Props) {
    const selectorStyles = clsx(
        'flex h-[150px] w-[245px] cursor-pointer flex-col flex-wrap justify-center rounded border border-slate-700 px-8 py-3 pl-4 font-bold uppercase text-slate-500 outline-none transition-all duration-150 ease-linear',
        'after:border-t after:border-slate-700',
        'hover:text-slate-100 hover:after:border-slate-100'
    );
    const textSelectorStyles = clsx('text-xl font-bold');

    return (
        <div className="relative mb-4 flex flex-nowrap gap-5">
            <div onClick={() => onTypeSelected('type', FeedbackType.Praise)} className={`${selectorStyles} hover:bg-teal-700`}>
                <div><TbRocket fontSize={32} /></div>
                <h3 className={textSelectorStyles}>Praise</h3>
            </div>

            <div onClick={() => onTypeSelected('type', FeedbackType.Improve)} className={`${selectorStyles} hover:bg-amber-700`}>
                <div><TbSchoolBell fontSize={32} /></div>
                <h3 className={textSelectorStyles}>Improve</h3>
            </div>
        </div>
    );
}
