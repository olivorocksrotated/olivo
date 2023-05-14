import { Commitment } from '@prisma/client';

import AddCommitmentButton from './add-commitment-btn';
import CommitmentsList from './commitments-list';

interface Props {
    title: string;
    commitments: Pick<Commitment, 'id' | 'doneBy' | 'status' | 'title'>[];
}

export default async function CommitmentsSection({ title, commitments }: Props) {
    return (
        <div className="max-w-2xl rounded-lg border border-gray-700 bg-gray-800 p-4 shadow sm:p-8">
            <div className="mb-4 flex items-baseline justify-between">
                <div className="mb-4 text-xl leading-none text-white">{title}</div>
                <div><AddCommitmentButton /></div>
            </div>
            <div className="flow-root">
                <CommitmentsList commitments={commitments} />
            </div>
        </div>
    );
}
