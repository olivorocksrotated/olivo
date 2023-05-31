'use client';

import { Commitment } from '@prisma/client';
import clsx from 'clsx';
import { useCallback, useState } from 'react';

import { Filters as FiltersType } from '../types';
import CommitmentsList from './commitments-list';
import Filters from './filters/filters';

interface Props {
    commitments: Pick<Commitment, 'id' | 'doneBy' | 'status' | 'title'>[];
}

export default function FilteredCommitmentsList({ commitments }: Props) {
    const [filters, setFilters] = useState({
        notDone: false,
        past: false
    } as FiltersType);

    const hasCommitments = commitments.length > 0;
    const filtersStyle = clsx({
        'mb-2': hasCommitments,
        'mb-8': !hasCommitments
    });

    const handleFiltersChanged = useCallback((updatedFilters: FiltersType) => {
        setFilters(updatedFilters);
    }, []);

    return (
        <>
            <div className={filtersStyle}><Filters onFiltersChanged={handleFiltersChanged} /></div>
            {!hasCommitments ?
                <div className="text-neutral-300">There are no commitments here yet</div> :
                <div className="flow-root">
                    <CommitmentsList commitments={commitments} filters={filters} />
                </div>}
        </>
    );
}
