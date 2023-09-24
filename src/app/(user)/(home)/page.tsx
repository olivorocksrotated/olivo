import { getServerSession } from '@/lib/auth/session';
import { getTodaysMood } from '@/lib/moods/get';
import { getFirstName } from '@/lib/name/name';

import PageTitle from '../../components/ui/page-title/page-title';
import MoodSelector from './../moods/components/mood-selector';

export default async function Home() {
    const { user } = await getServerSession();
    const firstName = getFirstName(user.name);

    const todaysMood = await getTodaysMood(user.id);

    return (
        <div className="flex flex-col gap-5  py-4 xl:flex-row xl:items-center xl:gap-10">
            <PageTitle text={`👋 Hey, ${firstName}`} />
            <MoodSelector todaysMood={todaysMood} />
        </div>
    );
}
