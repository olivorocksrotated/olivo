import CommitmentCard from '../../commitments/components/card/commitment-card';
import { ClientCommitment } from '../../commitments/types';

export default function Commitments({ commitments }: { commitments: ClientCommitment[]; }) {
    return (
        <ul role="list">
            {commitments.map((commitment) => <CommitmentCard key={commitment.id} commitment={commitment} />)}
        </ul>
    );
}
