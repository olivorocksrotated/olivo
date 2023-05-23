'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import useLocalStorage from '@/lib/hooks/useLocalStorage';

import InProgressStatusMarker from '../../status-marker/in-progress';
import NotStartedStatusMarker from '../../status-marker/not-started';
import PastStatusMarker from '../../status-marker/past';
import { Filters as FiltersType } from '../../types';

interface Props {
    onFiltersChanged: (filters: FiltersType) => void;
}

const defaultFilters: FiltersType = { notDone: false, past: false };

export default function Filters({ onFiltersChanged }: Props) {
    const currentPath = usePathname();
    const clearedCurrentPath = currentPath?.replaceAll('/', '');
    const localStorageKey = `cf-${clearedCurrentPath}`;

    const [filters, setFilters] = useLocalStorage(localStorageKey, defaultFilters);

    const selectedFilterStyle = 'bg-slate-500';
    const notSelectedFilterStyle = 'bg-slate-600';
    const filterStyle = clsx(
        'flex w-fit cursor-pointer items-center rounded p-[5px] transition',
        'hover:bg-slate-500'
    );

    useEffect(() => onFiltersChanged(filters), [filters, onFiltersChanged]);

    return (
        <div className="mb-2 flex gap-2">
            <div onClick={() => setFilters((previous) => ({ ...previous, notDone: !previous.notDone }))}
                className={clsx({
                    [filterStyle]: true,
                    [notSelectedFilterStyle]: !filters.notDone,
                    [selectedFilterStyle]: !!filters.notDone
                })}
            >
                <span><NotStartedStatusMarker /></span>
                <span className="-ml-1 mr-1"><InProgressStatusMarker /></span>
                <span className="text-xs">To-do</span>
            </div>
            <div onClick={() => setFilters((previous) => ({ ...previous, past: !previous.past }))}
                className={clsx({
                    [filterStyle]: true,
                    [notSelectedFilterStyle]: !filters.past,
                    [selectedFilterStyle]: !!filters.past
                })}
            >
                <span className="mr-1"><PastStatusMarker /></span>
                <span className="text-xs">Past</span>
            </div>
        </div>
    );
}
