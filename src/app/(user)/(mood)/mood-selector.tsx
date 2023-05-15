'use client';

import { MoodStatus } from '@prisma/client';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface MoodChoice {
    icon: string;
    name: string;
}

export default function MoodSelector() {
    const nullMood: MoodChoice = { icon: '', name: '' };
    const moods: MoodChoice[] = [
        { icon: '💩', name: MoodStatus.Bad },
        { icon: '😓', name: MoodStatus.Okayish },
        { icon: '🆗', name: MoodStatus.Average },
        { icon: '🙂', name: MoodStatus.Good },
        { icon: '💚', name: MoodStatus.Excellent }
    ];

    const [currentMoodChoice, setCurrentMoodChoice] = useState(nullMood);
    const [comment, setComment] = useState('');

    const moodStyle = clsx(
        'flex w-20 cursor-pointer flex-col items-center rounded bg-slate-700 p-2 transition',
        'hover:bg-slate-600'
    );

    const parentHeight = { initial: '150px', expanded: '250px' };

    const handleMoodClick = (mood: MoodChoice) => {
        setCurrentMoodChoice(mood);
    };

    const handleSaveComment = () => {
        setCurrentMoodChoice(nullMood);
        setComment('');
    };

    return (
        <motion.div className="rounded border border-indigo-700 bg-gray-800 p-4 sm:w-fit"
            initial={{ height: parentHeight.initial }}
            animate={{ height: currentMoodChoice.name ? parentHeight.expanded : parentHeight.initial }}
        >
            <div className="mb-4 text-lg text-white">
                How are you feeling today?
            </div>
            <div className="mb-4 flex gap-2">
                {moods.map((mood) => (
                    <div key={mood.name}
                        onClick={() => handleMoodClick(mood)}
                        className={`${moodStyle} ${clsx({ 'bg-slate-500 hover:bg-slate-500': mood.name === currentMoodChoice.name })}`}
                    >
                        <div className="text-2xl">{mood.icon}</div>
                        <div className="hidden sm:block">{mood.name}</div>
                    </div>
                ))}
            </div>
            {currentMoodChoice.name ?
                <motion.div className="border-t border-gray-700 pt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="mb-2">Would you like to share a bit more?</div>
                    <form>
                        <div className="flex gap-2">
                            <div className="w-full">
                                <input type="text"
                                    autoFocus
                                    value={comment}
                                    onChange={(event) => setComment(event.target.value)}
                                    placeholder={`What is making you feel ${currentMoodChoice.name.toLowerCase()}?`}
                                    className="w-full p-2"
                                />
                            </div>
                            <div>
                                <button type="submit"
                                    disabled={!comment}
                                    className="rounded border border-slate-400 px-3 py-2 hover:enabled:border-slate-300 disabled:opacity-50" onClick={handleSaveComment}
                                >
                                        Save
                                </button>
                            </div>
                        </div>
                    </form>
                </motion.div> : null}
        </motion.div>
    );
}
