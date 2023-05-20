'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

import InProgressStatusMarker from '../status-marker/in-progress';
import NotStartedStatusMarker from '../status-marker/not-started';
import PastStatusMarker from '../status-marker/past';
import { Filters as FiltersType } from '../types';

interface Props {
    onFiltersChanged: (filters: FiltersType) => void;
}

export default function Filters({ onFiltersChanged }: Props) {
    const [notDoneFilter, setNotDoneFilter] = useState(false);
    const [pastFilter, setPastFilter] = useState(false);

    const selectedFilterStyle = 'bg-slate-500';
    const notSelectedFilterStyle = 'bg-slate-600';
    const filterStyle = clsx(
        'flex w-fit cursor-pointer items-center rounded p-[5px] transition',
        'hover:bg-slate-500 hover:shadow'
    );

    useEffect(() => {
        onFiltersChanged({ notDone: notDoneFilter, past: pastFilter });
    }, [notDoneFilter, pastFilter, onFiltersChanged]);

    return (
        <div className="mb-2 flex gap-2">
            <div onClick={() => setNotDoneFilter((previous) => !previous)}
                className={clsx({
                    [filterStyle]: true,
                    [notSelectedFilterStyle]: !notDoneFilter,
                    [selectedFilterStyle]: !!notDoneFilter
                })}
            >
                <span><NotStartedStatusMarker /></span>
                <span className="-ml-1 mr-1"><InProgressStatusMarker /></span>
                <span className="text-xs">Not done</span>
            </div>
            <div onClick={() => setPastFilter((previous) => !previous)}
                className={clsx({
                    [filterStyle]: true,
                    [notSelectedFilterStyle]: !pastFilter,
                    [selectedFilterStyle]: !!pastFilter
                })}
            >
                <span className="mr-1"><PastStatusMarker /></span>
                <span className="text-xs">Past</span>
            </div>
        </div>
    );
}
