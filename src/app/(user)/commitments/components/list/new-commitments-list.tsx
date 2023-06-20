'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Commitment } from '@prisma/client';
import { IoAddOutline } from 'react-icons/io5';

import NewCommitmentCard from '../card/new-commitment-card';

interface Props {
    commitments: Pick<Commitment, 'id' | 'doneBy' | 'status' | 'title'>[];
}

export default function NewCommitmentsList({ commitments }: Props) {
    const [parent] = useAutoAnimate();

    return (
        <ul ref={parent} role="list" className="max-w-2xl grow space-y-2">
            <li className="cursor-pointer rounded-lg border border-dashed border-neutral-500 p-1 text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-400">
                <IoAddOutline size={25} className=" mx-auto my-0" />
            </li>
            {commitments.map((commitment) => <NewCommitmentCard key={commitment.id} commitment={{ ...commitment, doneBy: commitment.doneBy.toString() }} />)}
        </ul>
    );
}

/**
 * Check the concept in notebook
 * - By today {full date}
 * -- list of things not done for today
 * - Next
 * -- list of things not done by tomorrow
 * - Overdue
 * - Done
 * - Archived (last 7 days)
*/
