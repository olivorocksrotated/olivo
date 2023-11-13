import { getServerSession } from '@/lib/auth/session';
import { createCommitmentAction } from '@/lib/commitments/create';
import { getCommitments } from '@/lib/commitments/get';
import { updateCommitmentAction } from '@/lib/commitments/update';
import { forceCast } from '@/lib/types/type-caster';

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

    return (
        <div className="flex flex-col gap-8 sm:flex-row">
            <div className="grow sm:mb-0 sm:min-w-[500px]">
                <CommitmentsTabs
                    today={forceCast<ServerCommitment[], ClientCommitment[]>(today)}
                    next={forceCast<ServerCommitment[], ClientCommitment[]>(next)}
                    overdue={forceCast<ServerCommitment[], ClientCommitment[]>(overdue)}
                    resolved={forceCast<ServerCommitment[], ClientCommitment[]>(resolved)}
                    createCommitmentAction={createCommitmentAction}
                    updateCommitmentAction={updateCommitmentAction}
                />
            </div>
            <div className="max-w-3xl">
                <EinsenhowerMatrix />
            </div>
        </div>
    );
}
