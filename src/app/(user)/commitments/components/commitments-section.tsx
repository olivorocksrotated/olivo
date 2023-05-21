import { Commitment } from '@prisma/client';

import AddCommitmentButton from './add-commitment-btn';
import FilteredCommitmentsList from './list/filtered-commitments-list';

interface Props {
    title: string;
    commitments: Pick<Commitment, 'id' | 'doneBy' | 'status' | 'title'>[];
}

export default async function CommitmentsSection({ title, commitments }: Props) {
    // I am not sure why this is happening, but I'm gonna share my struggle here.
    // For whatever reason, turning this into a client component and calling the
    // "set" function of a "useState" hook, makes the whole app to hang.
    // I couldn't find why this happens, I couldn't find memory leaks, nothing.
    // My guess is that there's a problem with Server Side components and Client
    // Components, and for whatever reason it blows up. That is why all the client
    // behavior is abstracted under other components.

    return (
        <div className="max-w-2xl rounded-lg border border-gray-700 bg-gray-800 p-4 shadow sm:p-8">
            <div className="mb-2 flex items-baseline justify-between">
                <div className="mb-4 text-xl leading-none text-white">{title}</div>
                <div><AddCommitmentButton /></div>
            </div>
            <FilteredCommitmentsList commitments={commitments} />
        </div>
    );
}
