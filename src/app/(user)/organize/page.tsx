import { getServerSession } from '@/lib/auth/session';
import { getCommitments } from '@/lib/commitments/get';
import { forceCast } from '@/lib/types/type-caster';

import CommitmentsFulfilment from './components/commitments-fulfilment';
import EinsenhowerMatrix from './components/einsenhower-matrix/eisenhower-matrix';
import CommitmentsTabs from './components/list/commitments-tabs';
import { ClientCommitment, ServerCommitment } from './types';

export default async function Organize() {
    const { user } = await getServerSession();

    const today = await getCommitments({
        userId: user.id,
        filters: { status: 'to-do', doneBy: 'today' },
        order: { createdAt: 'desc' }
    });

    const next = await getCommitments({
        userId: user.id,
        filters: { status: 'to-do', doneBy: 'next' },
        order: { doneBy: 'asc' }
    });

    const overdue = await getCommitments({
        userId: user.id,
        filters: { status: 'to-do', doneBy: 'overdue' },
        order: { doneBy: 'asc' }
    });

    const resolved = await getCommitments({
        userId: user.id,
        filters: { status: 'resolved' },
        order: { doneBy: 'desc' },
        take: 30
    });

    const last4Weeks = await getCommitments({
        userId: user.id,
        filters: { doneBy: 'last 4 weeks' },
        order: { doneBy: 'asc' }
    });

    return (
        <div className="flex flex-col gap-8 sm:flex-row">
            <div className="grow sm:mb-0 sm:min-w-[500px]">
                <CommitmentsTabs today={forceCast<ServerCommitment[], ClientCommitment[]>(today)}
                    next={forceCast<ServerCommitment[], ClientCommitment[]>(next)}
                    overdue={forceCast<ServerCommitment[], ClientCommitment[]>(overdue)}
                    resolved={forceCast<ServerCommitment[], ClientCommitment[]>(resolved)}
                />
            </div>
            <div className="max-w-3xl">
                <div className="mb-8">
                    <CommitmentsFulfilment commitments={forceCast<ServerCommitment[], ClientCommitment[]>(last4Weeks)} />
                </div>
                <EinsenhowerMatrix />
            </div>
        </div>
    );
}
