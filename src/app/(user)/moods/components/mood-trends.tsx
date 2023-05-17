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
import { isSameDay, sub } from 'date-fns';
import { Line } from 'react-chartjs-2';
import * as colors from 'tailwindcss/colors';

import { formatRelativeDate } from '@/lib/date/format';

import { moodValues } from '../constants';

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

export default function MoodTrend({ moods }: Props) {
    const today = new Date();
    const daysToDisplay = 7;
    const days = new Array(daysToDisplay).fill(0).map((_, index) => sub(today, { days: daysToDisplay - 1 - index }));

    const values = days.map((day) => {
        const mood = moods.find((m) => isSameDay(day, m.createdAt));

        return moodValues[mood?.status as MoodStatus];
    });

    const moodIndex = Object.fromEntries(Object.entries(moodValues).map(([key, value]) => [value, key]));

    return (
        <div className="">
            <Line options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
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
                labels: days.map((day) => formatRelativeDate(day, today)),
                yLabels: [MoodStatus.Bad, MoodStatus.Okayish, MoodStatus.Average, MoodStatus.Good, MoodStatus.Excellent],
                datasets: [
                    {
                        label: 'Your mood',
                        data: values,
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
