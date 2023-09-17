import { getServerSession } from '@/lib/auth/session';
import { getTodaysMood } from '@/lib/moods/get';
import { getFirstName } from '@/lib/name/name';
import { FilterOption } from '@/lib/notes/get-notes-by-tags';

import PageTitle from '../components/ui/page-title/page-title';
import Workspace from './components/workspace/workspace';
import MoodSelector from './moods/components/mood-selector';

export default async function Home({ searchParams }: { searchParams: { selectedTagsFilter?: string, operator?: FilterOption } }) {
    const { user } = await getServerSession();
    const firstName = getFirstName(user.name);

    const todaysMood = await getTodaysMood(user.id);

    return (
        <article className="flex h-full max-h-full flex-col pr-16">
            <div className="flex flex-col gap-5  py-4 xl:flex-row xl:items-center xl:gap-10">
                <PageTitle text={`👋 Hey, ${firstName}`} />
                <MoodSelector todaysMood={todaysMood} />
            </div>
            <div className="min-h-0 grow">
                <Workspace searchParams={searchParams}></Workspace>
            </div>
        </article>
    );
}
