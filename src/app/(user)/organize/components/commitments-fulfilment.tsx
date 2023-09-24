'use client';

import { BarChart, Card, Subtitle, Title } from '@tremor/react';
import { sub } from 'date-fns';

import { isOverdue } from '@/lib/commitments/filter';
import { isBetween } from '@/lib/date/days';
import { formatDate } from '@/lib/date/format';

import { ClientCommitment } from '../types';

interface Props {
    commitments: ClientCommitment[];
}

const now = new Date();
const weeks = [
    sub(now, { weeks: 4 }),
    sub(now, { weeks: 3 }),
    sub(now, { weeks: 2 }),
    sub(now, { weeks: 1 }),
    now
];
const getCommitmentWeek = ({ doneBy }: ClientCommitment) => weeks.reduce((weeksAcc, currentWeekDate, currentIndex, originalWeeks) => {
    const weekFound = weeksAcc !== -1;
    const isLastWeek = currentIndex === originalWeeks.length - 1;
    if (weekFound || isLastWeek) {
        return weeksAcc;
    }

    const startDate = currentWeekDate;
    const endDate = originalWeeks[currentIndex + 1];

    return isBetween(doneBy, startDate, endDate) ? currentIndex : weeksAcc;
}, -1);

const formatWeekLabel = (startDate: Date, endDate: Date) => `${formatDate(startDate, 'dd/MM')}-${formatDate(endDate, 'dd/MM')}`;

export default function CommitmentsFulfilment({ commitments }: Props) {
    const commitmentsSplitByFulfilment = commitments.reduce((commitmentsAcc, commitment) => {
        const week: number = getCommitmentWeek(commitment);
        const weekEntry = commitmentsAcc[week];
        const isOverdueCommitment = isOverdue(now)(commitment);

        commitmentsAcc[week] = {
            ...commitmentsAcc[week],
            'On time': !isOverdueCommitment ? weekEntry['On time'] + 1 : weekEntry['On time'],
            Overdue: isOverdueCommitment ? weekEntry.Overdue + 1 : weekEntry.Overdue
        };

        return commitmentsAcc;
    }, [
        { week: 0, 'On time': 0, Overdue: 0, weekLabel: formatWeekLabel(weeks[0], weeks[1]) },
        { week: 1, 'On time': 0, Overdue: 0, weekLabel: formatWeekLabel(weeks[1], weeks[2]) },
        { week: 2, 'On time': 0, Overdue: 0, weekLabel: formatWeekLabel(weeks[2], weeks[3]) },
        { week: 3, 'On time': 0, Overdue: 0, weekLabel: formatWeekLabel(weeks[3], weeks[4]) }
    ]);

    return (
        <Card>
            <Title>Commitments you were able to fulfil on time</Title>
            <Subtitle>Last 4 weeks</Subtitle>
            <BarChart className="mt-6"
                data={commitmentsSplitByFulfilment}
                index="weekLabel"
                stack={true}
                categories={['On time', 'Overdue']}
                colors={['blue', 'teal']}
                yAxisWidth={48}
            />
        </Card>
    );
}
