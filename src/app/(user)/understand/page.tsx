import { getServerSession } from '@/lib/auth/session';
import { getCommitments } from '@/lib/commitments/get';
import { getMoods } from '@/lib/moods/get';
import { forceCast } from '@/lib/types/type-caster';

import { ClientCommitment, ServerCommitment } from '../organize/types';
import UnderstandClient from './components/understand-client';

export default async function Understand() {
    const { user } = await getServerSession();

    const thisMonthMoods = await getMoods({
        userId: user.id,
        filters: { created: 'this month' },
        order: 'asc'
    });

    const lastMonthMoods = await getMoods({
        userId: user.id,
        filters: { created: 'last month' },
        order: 'asc'
    });

    const last4WeeksCommitments = await getCommitments({
        userId: user.id,
        filters: { doneBy: 'last 4 weeks' },
        order: { doneBy: 'asc' }
    });

    return <UnderstandClient
        thisMonthMoods={thisMonthMoods}
        lastMonthMoods={lastMonthMoods}
        last4WeeksCommitments={forceCast<ServerCommitment[], ClientCommitment[]>(last4WeeksCommitments)}
    />;
}
