import { CommitmentStatus } from '@prisma/client';

import { getServerSession } from '@/lib/auth/session';
import { getCommitments } from '@/lib/commitments/get';
import { getTodaysMood } from '@/lib/moods/get';
import { getFirstName } from '@/lib/name/name';
import { forceCast } from '@/lib/types/type-caster';

import PageTitle from '../components/ui/page-title/page-title';
import CommitmentsList from './commitments/components/list/commitments-list';
import { ClientCommitment, ServerCommitment } from './commitments/types';
import MoodSelector from './moods/components/mood-selector';

const statusWeight = {
    [CommitmentStatus.InProgress]: 1,
    [CommitmentStatus.NotStartedYet]: 2,
    [CommitmentStatus.Done]: 3,
    [CommitmentStatus.Abandoned]: 4
};

export default async function Home() {
    const { user } = await getServerSession();
    const firstName = getFirstName(user.name);

    const todaysMood = await getTodaysMood(user.id);
    const commitments = await getCommitments({
        userId: user.id,
        filters: { status: 'not-abandoned', doneBy: 'today' },
        order: { createdAt: 'desc' }
    });

    const sortedCommitments = commitments.sort((first, second) => statusWeight[first.status] - statusWeight[second.status]);
    const notDoneCommitmentsCount = commitments.filter((commitment) => commitment.status === CommitmentStatus.InProgress || commitment.status === CommitmentStatus.NotStartedYet).length;

    return (
        <article>
            <PageTitle text={`👋 Hey, ${firstName}`} />
            <div className="mb-10"><MoodSelector todaysMood={todaysMood} /></div>
            <div className="max-w-2xl rounded-lg p-4 pt-6 outline outline-1 outline-neutral-800">
                <div className="mb-8 flex items-center justify-between text-xl leading-none">
                    <h2 className="text-white">
                        {notDoneCommitmentsCount > 0 ? 'Commitments for today' : 'All done for today 🎉'}
                    </h2>
                    <div className="text-neutral-300">{notDoneCommitmentsCount} left</div>
                </div>
                <CommitmentsList commitments={forceCast<ServerCommitment[], ClientCommitment[]>(sortedCommitments)} />
            </div>
        </article>
    );
}
