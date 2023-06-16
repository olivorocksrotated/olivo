'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { getFeedbackCategories, getFeedbackSuggestionTags } from '@/lib/feedback/categories';

import CategoryBadgeSelector from './components/badge-selector';
import CategoryCard from './components/category-card';
import FeedbackTypeSelector from './components/feedback-type-selector';
import FeedbackStepper from './components/stepper';
import UserSelector from './components/user-selector';

interface FeedbackNote {
    receiver: string;
    type: string;
    categories: string[];
    badges: string[];
    comment: string;
}

export default function Feedback() {
    const [feedbackStep, setFeedbackStep] = useState(1);
    const [feedbackNote, setFeedbackNote] = useState({
        receiver: '',
        type: '',
        categories: [],
        badges: [],
        comment: ''
    } as FeedbackNote);

    const initialStep = 1;
    const lastStep = 5;

    const nextStep = () => {
        if (feedbackStep === lastStep) {
            return;
        }

        setFeedbackStep(feedbackStep + 1);
    };
    const previousStep = () => {
        if (feedbackStep === initialStep) {
            return;
        }
        setFeedbackStep(feedbackStep - 1);
    };
    const handleChange = (name: string, value: any) => {
        setFeedbackNote({
            ...feedbackNote,
            [name]: value
        });
    };
    const handleCategoryChange = (value: string) => {
        const updatedCategories = feedbackNote.categories.includes(value) ?
            feedbackNote.categories.filter((category) => category !== value) :
            [...feedbackNote.categories, value];

        setFeedbackNote({
            ...feedbackNote,
            categories: updatedCategories
        });
    };
    const handleBadgeChange = (value: string) => {
        const updatedBadges = feedbackNote.badges.includes(value) ?
            feedbackNote.badges.filter((badge) => badge !== value) :
            [...feedbackNote.badges, value];

        setFeedbackNote({
            ...feedbackNote,
            badges: updatedBadges
        });
    };
    const handleCommentUpdated = (element: { target: { name: string; value: any; }; }) => {
        handleChange(element.target.name, element.target.value);
    };

    const categories = getFeedbackCategories();
    const feedbackSuggestionTags = getFeedbackSuggestionTags();

    const feedbackSteps = [
        'whom do you want to feedback?',
        'something to praise or improve?',
        'what areas do you want to focus on?',
        'what do you want to share?',
        'any comments?'
    ];
    const animationProps = {
        initial: { x: 10, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -10, opacity: 0 }
    };
    const transition = {
        duration: 0.2
    };

    return (
        <div>
            <div className="min-h-[512px] max-w-lg">
                <div>
                    <div>
                        <FeedbackStepper step={feedbackStep} stepTitle={feedbackSteps[feedbackStep]} />
                    </div>

                    <div className="w-full overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div key={feedbackStep ? feedbackStep : ''} animate={animationProps.animate} initial={animationProps.initial} exit={animationProps.exit} transition={transition}>
                                {feedbackStep === 1 && <UserSelector onUserSelected={handleChange} />}
                                {feedbackStep === 2 && <FeedbackTypeSelector onTypeSelected={handleChange} />}
                                {feedbackStep === 3 &&
                                    <div className="relative mb-4 flex flex-wrap gap-4">
                                        {
                                            categories.map((category) => (
                                                <CategoryCard key={category.id} category={category.name} onCategorySelected={handleCategoryChange} />
                                            ))
                                        }
                                    </div>}
                                {feedbackStep === 4 &&
                                    <div className="mb-4 flex flex-wrap gap-4">
                                        {feedbackSuggestionTags.map((tag) => (
                                            <CategoryBadgeSelector key={tag.id} tag={tag.name} onBadgeSelected={handleBadgeChange} />
                                        ))}
                                    </div>}
                                {feedbackStep === 5 &&
                                    <div className="mb-4 h-[150px] w-full rounded-md bg-slate-800 p-3">
                                        <textarea name="comment" onChange={handleCommentUpdated} className="h-full w-full resize-none bg-gray-600/20 p-2 text-slate-100 outline-none" placeholder="Leave a comment"></textarea>
                                    </div>}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex flex-wrap justify-between gap-y-2">
                        {feedbackStep > 1 &&
                            <div className="cursor-pointer">
                                <div onClick={previousStep} className="group relative inline-flex items-center justify-center overflow-hidden rounded-md p-0.5 font-bold">
                                    <span className="absolute h-full w-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>

                                    <span className="relative rounded-md bg-gray-900 px-6 py-3 transition-all duration-500 ease-out group-hover:bg-gray-900/0">
                                        <span className="relative text-slate-200">Previous step</span>
                                    </span>
                                </div>
                            </div>}

                        <div className="cursor-pointer">
                            <div onClick={nextStep} className="group relative inline-flex items-center justify-center overflow-hidden rounded-md p-0.5 font-bold">
                                <span className="absolute h-full w-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>

                                <span className="relative rounded-md bg-gray-900 px-6 py-3 transition-all duration-500 ease-out group-hover:bg-gray-900/0">
                                    {feedbackStep < 5 && <span className="relative text-slate-200">Next step</span>}
                                    {feedbackStep === 5 && <span className="relative text-slate-200">Save!</span>}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
