'use client';

import { BarChart, Card, Subtitle, Title } from '@tremor/react';
import { sub } from 'date-fns';
import { useMemo } from 'react';

import { newEmptyArrayOfLength } from '@/lib/array/new-empty-array-of-length';
import { isOverdue } from '@/lib/commitments/filter';
import { findDateTimeframe } from '@/lib/date/days';
import { formatDate } from '@/lib/date/format';

import { ClientCommitment } from '../../../organize/types';

interface Props {
    commitments: ClientCommitment[];
}

const formatWeekLabel = (startDate: Date, endDate: Date) => `${formatDate(startDate, 'dd/MM')}-${formatDate(endDate, 'dd/MM')}`;

const onTimeKey = 'On time';
const overdueKey = 'Overdue';
const now = new Date();
const weeks = [
    sub(now, { weeks: 4 }),
    sub(now, { weeks: 3 }),
    sub(now, { weeks: 2 }),
    sub(now, { weeks: 1 }),
    now
];

export default function CommitmentsFulfilment({ commitments }: Props) {
    const insights = useMemo(() => commitments.reduce((acc, currentCommitment) => {
        const timeframe = findDateTimeframe({ dateToFind: currentCommitment.doneBy, timeframes: weeks });
        if (!timeframe) {
            return acc;
        }

        const isOverdueCommitment = isOverdue(now)(currentCommitment);
        const entryKey = isOverdueCommitment ? overdueKey : onTimeKey;
        const week = timeframe.startTimeframe.index;
        const weekEntry = acc[week];

        acc[week] = {
            ...weekEntry,
            [entryKey]: weekEntry[entryKey] + 1
        };

        return acc;
    }, newEmptyArrayOfLength(weeks.length - 1).map((_, index) => ({
        week: index,
        [onTimeKey]: 0,
        [overdueKey]: 0,
        weekLabel: formatWeekLabel(weeks[index], weeks[index + 1])
    }))), [commitments]);

    return (
        <Card>
            <Title>Commitments you were able to fulfil on time</Title>
            <Subtitle>Last 4 weeks</Subtitle>
            <BarChart
                className="mt-6"
                data={insights}
                index="weekLabel"
                stack={true}
                categories={[onTimeKey, overdueKey]}
                colors={['blue', 'teal']}
                yAxisWidth={48}
            />
        </Card>
    );
}
