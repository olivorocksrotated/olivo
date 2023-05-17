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
    const lastWeek = [...Array.from([6, 5, 4, 3, 2, 1]).map((n) => sub(today, { days: n })), today];
    const values = lastWeek.map((day) => {
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
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            stepSize: 1,
                            callback: (value) => moodIndex[value as number]
                        },
                        grid: {
                            color: (context) => (context.tick.value === 2 ? 'green' : 'transparent')
                        }
                    }
                }
            }} data={{
                labels: lastWeek.map((day) => formatRelativeDate(day, today)),
                yLabels: [MoodStatus.Bad, MoodStatus.Okayish, MoodStatus.Average, MoodStatus.Good, MoodStatus.Excellent],
                datasets: [
                    {
                        label: 'Your mood',
                        data: values,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
