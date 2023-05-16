import PageTitle from '@/app/components/page-title';
import { getServerSession } from '@/lib/auth/session';
import { getMoods } from '@/lib/moods/get';

export default async function Moods() {
    const { user } = await getServerSession();
    const moods = await getMoods(user.id, { from: 'last week' });

    const hasMoods = moods.length !== 0;
    const noMoods = (
        <div>You do not have any moods yet</div>
    );

    return (
        <main>
            <PageTitle text="Your mood" />
            {!hasMoods ? noMoods : <div>Hello</div>}
        </main>
    );
}
