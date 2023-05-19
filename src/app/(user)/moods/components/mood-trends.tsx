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
import { getDaysInMonth, isSameDay, sub } from 'date-fns';
import { Line } from 'react-chartjs-2';
import * as colors from 'tailwindcss/colors';

import { newEmptyArrayOfLength } from '@/lib/array/newEmptyArrayOfLength';
import { formatRelativeDate } from '@/lib/date/format';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    moods: Pick<Mood, 'id' | 'comment' | 'status' | 'createdAt'>[];
}

export const moodValues: { [name in MoodStatus]: number } = {
    [MoodStatus.Bad]: 0,
    [MoodStatus.Okayish]: 1,
    [MoodStatus.Average]: 2,
    [MoodStatus.Good]: 3,
    [MoodStatus.Excellent]: 4
};

export default function MoodTrend({ moods }: Props) {
    const today = new Date();
    const daysToDisplay = getDaysInMonth(today);
    const days = newEmptyArrayOfLength(daysToDisplay).map((_, index) => sub(today, { days: daysToDisplay - 1 - index }));

    const moodsDataset = days.map((day) => {
        const mood = moods.find((m) => isSameDay(day, m.createdAt));

        return {
            ...mood,
            datasetValue: moodValues[mood?.status as MoodStatus]
        };
    });

    const moodIndex = Object.fromEntries(Object.entries(moodValues).map(([key, value]) => [value, key]));

    return (
        <div>
            <Line options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: (item) => moodIndex[item.raw as number],
                            footer: (item) => moodsDataset[item[0].dataIndex].comment ?? ''
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
                labels: days.map((day) => formatRelativeDate(day, today)),
                yLabels: [MoodStatus.Bad, MoodStatus.Okayish, MoodStatus.Average, MoodStatus.Good, MoodStatus.Excellent],
                datasets: [
                    {
                        label: 'Your mood',
                        data: moodsDataset.map((md) => md.datasetValue),
                        borderColor: colors.indigo[500],
                        backgroundColor: colors.indigo[300],
                        pointStyle: 'circle',
                        pointRadius: 5,
                        pointHoverRadius: 10
                    }
                ]
            }}
            />
        </div>
    );
}
