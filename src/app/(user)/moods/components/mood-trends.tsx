'use client';

import { Mood, MoodStatus } from '@prisma/client';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import { getDate, getDaysInMonth } from 'date-fns';
import { Line } from 'react-chartjs-2';
import * as colors from 'tailwindcss/colors';

import { newEmptyArrayOfLength } from '@/lib/array/newEmptyArrayOfLength';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type BaseMood = Pick<Mood, 'comment' | 'status' | 'createdAt'>;
type DatasetMood = (Pick<BaseMood, 'comment' | 'createdAt'> & { status: null | MoodStatus, datasetValue: number });
interface Props {
    thisMonthMoods: BaseMood[];
    lastMonthMoods: BaseMood[];
}

export const moodValues: { [name in MoodStatus]: number } = {
    [MoodStatus.Bad]: 0,
    [MoodStatus.Okayish]: 1,
    [MoodStatus.Average]: 2,
    [MoodStatus.Good]: 3,
    [MoodStatus.Excellent]: 4
};

const nullMonthMood = { comment: null, status: null, createdAt: new Date() };

export default function MoodTrend({ thisMonthMoods, lastMonthMoods }: Props) {
    const today = new Date();
    const daysToDisplay = getDaysInMonth(today);
    const days = newEmptyArrayOfLength(daysToDisplay).map((_, index) => index + 1);

    const datasets: {
        lastMonth: DatasetMood[],
        thisMonth: DatasetMood[]
    } = days.reduce((acc, day) => {
        const lastMonthMood = lastMonthMoods.find((m) => day === getDate(m.createdAt)) ?? nullMonthMood;
        const thisMonthMood = thisMonthMoods.find((m) => day === getDate(m.createdAt)) ?? nullMonthMood;

        return {
            lastMonth: [...acc.lastMonth, { ...lastMonthMood, datasetValue: moodValues[lastMonthMood?.status as MoodStatus] }],
            thisMonth: [...acc.thisMonth, { ...thisMonthMood, datasetValue: moodValues[thisMonthMood?.status as MoodStatus] }]
        };
    }, {
        lastMonth: [] as DatasetMood[],
        thisMonth: [] as DatasetMood[]
    });

    const moodIndex = Object.fromEntries(Object.entries(moodValues).map(([key, value]) => [value, key]));

    return (
        <div>
            <Line options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        align: 'center'
                    },
                    tooltip: {
                        callbacks: {
                            label: (item) => moodIndex[item.raw as number]
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            stepSize: 1,
                            callback: (value) => moodIndex[value as number]
                        },
                        grid: {
                            color: (context) => (context.tick.value === moodValues[MoodStatus.Average] ? colors.slate[500] : 'transparent')
                        }
                    }
                }
            }} data={{
                labels: days.map((day) => day.toString()),
                yLabels: [MoodStatus.Bad, MoodStatus.Okayish, MoodStatus.Average, MoodStatus.Good, MoodStatus.Excellent],
                datasets: [
                    {
                        label: 'This month',
                        data: datasets.thisMonth.map((md) => md.datasetValue),
                        borderColor: colors.green[500],
                        backgroundColor: colors.green[300],
                        pointStyle: 'circle',
                        pointRadius: 4,
                        pointHoverRadius: 7,
                        borderJoinStyle: 'round'
                    },
                    {
                        label: 'Last month',
                        data: datasets.lastMonth.map((md) => md.datasetValue),
                        borderColor: colors.indigo[500],
                        backgroundColor: colors.indigo[300],
                        pointStyle: 'circle',
                        pointRadius: 4,
                        pointHoverRadius: 7,
                        borderJoinStyle: 'round',
                        borderDash: [2, 2]
                    }
                ]
            }}
            />
        </div>
    );
}
