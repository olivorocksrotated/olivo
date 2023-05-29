import { Commitment } from '@prisma/client';

import AddCommitmentButton from './add-commitment-btn';
import FilteredCommitmentsList from './list/filtered-commitments-list';

interface Props {
    title: string;
    commitments: Pick<Commitment, 'id' | 'doneBy' | 'status' | 'title'>[];
}

export default function CommitmentsSection({ title, commitments }: Props) {
    return (
        <div className="max-w-2xl rounded-lg border border-neutral-900 bg-neutral-950 p-4 shadow sm:p-8">
            <div className="mb-2 flex items-baseline justify-between">
                <div className="mb-4 text-xl leading-none text-white">{title}</div>
                <div><AddCommitmentButton /></div>
            </div>
            <FilteredCommitmentsList commitments={commitments} />
        </div>
    );
}
