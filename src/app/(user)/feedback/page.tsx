'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { getFeedbackCategories, getFeedbackSuggestionTags } from '@/lib/feedback/categories';

import CategoryBatchSelector from './components/badge-selector';
import CategoryCard from './components/category-card';
import FeedbackTypeSelector from './components/feedback-type-selector';
import FeedbackStepper from './components/stepper';
import UserSelector from './components/user-selector';

export default function Feedback() {
    const [feedbackStep, setFeedbackStep] = useState(1);

    const previousStep = () => {
        if (feedbackStep === 0) {
            return;
        }
        setFeedbackStep(feedbackStep - 1);
    };

    const nextStep = () => {
        if (feedbackStep === 5) {
            return;
        }
        setFeedbackStep(feedbackStep + 1);
    };

    const categories = getFeedbackCategories();
    const stepperTitles = [
        'whom do you want to feedback?',
        'something to praise or improve?',
        'what areas to work on?',
        'what areas standed-out?',
        'what to improve?',
        'what to praise?',
        'any comments?'
    ];
    const feedbackSuggestionTags = getFeedbackSuggestionTags();

    const transition = {
        duration: 0.7
    };

    return (
        <main>
            <section className="max-w-lg">
                <FeedbackStepper step={feedbackStep} setepTitle={stepperTitles[feedbackStep]} />

                <AnimatePresence mode="wait">

                    {feedbackStep === 1 &&
                            <motion.div key={feedbackStep} animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0, translateX: '-100%' }} transition={transition}>
                                <UserSelector />
                            </motion.div>}

                    {feedbackStep === 2 &&
                            <motion.div key={feedbackStep} animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0, translateX: '-100%' }} transition={transition}>
                                <FeedbackTypeSelector />
                            </motion.div>}

                    {feedbackStep === 3 &&
                            <motion.div key={feedbackStep} animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0, translateX: '-100%' }} transition={transition}>
                                <div className="relative mb-4 flex flex-wrap gap-4">
                                    {
                                        categories.map((category) => (
                                            <CategoryCard key={category.id} category={category.name} />
                                        ))
                                    }
                                </div>
                            </motion.div>}

                    {feedbackStep === 4 &&
                            <motion.div key={feedbackStep} animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0, translateX: '-100%' }} transition={transition}>
                                <div className="mb-4 flex flex-wrap gap-4">
                                    {feedbackSuggestionTags.map((tag) => (
                                        <CategoryBatchSelector key={tag.id} tag={tag.name} />
                                    ))}
                                </div>
                            </motion.div>}

                    {feedbackStep === 5 &&
                            <motion.div key={feedbackStep} animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0, translateX: '-100%' }} transition={transition}>
                                <div className="mb-4 h-[150px] w-full rounded-md bg-slate-800 p-3">
                                    <textarea className="h-full w-full resize-none bg-gray-600/20 p-2 text-slate-100 outline-none" placeholder="Leave a comment"></textarea>
                                </div>
                            </motion.div>}


                </AnimatePresence>

                <div className="flex flex-nowrap justify-between">
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

            </section>
        </main>
    );
}
