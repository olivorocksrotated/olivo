'use client';

import { Commitment } from '@prisma/client';
import { useCallback, useState } from 'react';

import CommitmentsList from './commitments-list';
import Filters from './filters/filters';
import { Filters as FiltersType } from './types';

interface Props {
    commitments: Pick<Commitment, 'id' | 'doneBy' | 'status' | 'title'>[];
}

export default function FilteredCommitmentsList({ commitments }: Props) {
    const [filters, setFilters] = useState({
        notDone: false,
        past: false
    } as FiltersType);

    const handleFiltersChanged = useCallback((updatedFilters: FiltersType) => {
        setFilters(updatedFilters);
    }, []);

    return (
        <>
            <Filters onFiltersChanged={handleFiltersChanged} />
            <div className="flow-root">
                <CommitmentsList commitments={commitments} filters={filters} />
            </div>
        </>
    );
}
