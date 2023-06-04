'use client';

import { TbRocket, TbSchoolBell } from 'react-icons/tb';

import { FeedbackType } from '@/lib/feedback/types';

interface Props {
    onTypeSelected: (name: string, value: string) => void;
}

export default function FeedbackTypeSelector({ onTypeSelected } : Props) {
    return (
        <div className="relative mb-4 flex flex-nowrap gap-5">
            <div onClick={() => onTypeSelected('type', FeedbackType.Praise)} className="flex h-[150px] w-[245px] cursor-pointer flex-col flex-wrap justify-center rounded border border-slate-700 px-8 py-3 pl-4 font-bold uppercase text-slate-500 outline-none transition-all duration-150 ease-linear after:border-t after:border-slate-700 hover:bg-teal-700 hover:text-slate-100 hover:after:border-slate-100">
                <div><TbRocket fontSize={32} /></div>
                <h3 className="text-xl font-bold">Praise</h3>
            </div>

            <div onClick={() => onTypeSelected('type', FeedbackType.Improve)} className="flex h-[150px] w-[245px] cursor-pointer flex-col flex-wrap justify-center rounded border border-slate-700 px-8 py-3 pl-4 font-bold uppercase text-slate-500 outline-none transition-all duration-150 ease-linear after:border-t after:border-slate-700 hover:bg-amber-700 hover:text-slate-100 hover:after:border-slate-100">
                <div><TbSchoolBell fontSize={32} /></div>
                <h3 className="text-xl font-bold">Improve</h3>
            </div>
        </div>
    );
}
