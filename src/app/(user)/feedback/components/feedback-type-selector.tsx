'use client';

import { TbRocket, TbSchoolBell } from 'react-icons/tb';

export default function FeedbackTypeSelector() {
    return (
        <div className="relative mb-4 flex justify-between gap-4">
            <div className="mb-1 mr-1 flex h-[150px] w-[200px] cursor-pointer flex-col flex-wrap justify-center gap-y-4 rounded border border-slate-700 px-8 py-3 pl-4 font-bold uppercase text-slate-500 outline-none transition-all duration-150 ease-linear hover:bg-teal-700 hover:text-slate-100">
                <div><TbRocket fontSize={32} /></div>
                <h3 className="text-xl font-bold">Praise</h3>
            </div>

            <div className="mb-1 mr-1 flex h-[150px] w-[242px] cursor-pointer flex-col flex-wrap justify-center gap-y-4 rounded border border-slate-700 px-8 py-3 pl-4 font-bold uppercase text-slate-500 outline-none transition-all duration-150 ease-linear hover:bg-amber-700 hover:text-slate-100">
                <div><TbSchoolBell fontSize={32} /></div>
                <h3 className="text-xl font-bold">Improve</h3>
            </div>
        </div>
    );
}
