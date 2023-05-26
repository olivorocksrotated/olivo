import Link from 'next/link';

import { UnfinishedCommitmentsNotificationType } from '../types';

interface Props {
    notification: UnfinishedCommitmentsNotificationType;
}

export default function UnfinishedCommitmentsNotification({ notification }: Props) {
    return (
        <p>
            {notification.payload.unfinishedCommitments > 0 ?
                <span>You still have {notification.payload.unfinishedCommitments} <Link className="text-sky-500" href="/commitments">unfinished commitments</Link> for today</span> :
                'All done today :)'}
        </p>
    );
}
