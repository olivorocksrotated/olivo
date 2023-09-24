import { getServerSession } from '@/lib/auth/session';
import { getMoods } from '@/lib/moods/get';

import UnderstandClient from './components/understand-client';

export default async function Understand() {
    const { user } = await getServerSession();

    const thisMonthMoods = await getMoods({
        userId: user.id,
        filters: { created: 'this month' },
        order: 'asc'
    });

    return <UnderstandClient thisMonthMoods={thisMonthMoods} />;
}
