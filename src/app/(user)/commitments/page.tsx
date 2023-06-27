import { getServerSession } from '@/lib/auth/session';
import { getCommitments } from '@/lib/commitments/get';
import { forceCast } from '@/lib/types/type-caster';

import CommitmentsTabs from './components/list/commitments-tabs';
import { ClientCommitment, ServerCommitment } from './types';

export default async function Commitments() {
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

    return <CommitmentsTabs today={forceCast<ServerCommitment[], ClientCommitment[]>(today)}
        next={forceCast<ServerCommitment[], ClientCommitment[]>(next)}
        overdue={forceCast<ServerCommitment[], ClientCommitment[]>(overdue)}
        resolved={forceCast<ServerCommitment[], ClientCommitment[]>(resolved)}
    />;
}
