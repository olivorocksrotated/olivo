'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import Button from '@/app/components/ui/button/button';
import { getFeedbackCategories, getFeedbackSuggestionTags } from '@/lib/feedback/categories';
import { Category, FeedbackEntry, FeedbackSuggestionTag, FeedbackType } from '@/lib/feedback/types';

import CategoryBadgeSelector from './components/badge-selector';
import CategoryCard from './components/category-card';
import FeedbackTypeSelector from './components/feedback-type-selector';
import FeedbackStepper from './components/stepper';
import UserSelector from './components/user-selector';
import { animationProps, transition } from './styles';

export default function Improve() {
    const [feedbackStep, setFeedbackStep] = useState(1);
    const [feedbackNote, setFeedbackNote] = useState({
        giverId: '',
        receiverId: '',
        type: FeedbackType.None,
        categories: [],
        badges: [],
        comment: ''
    } as FeedbackEntry);

    const initialStep = 1;
    const lastStep = 5;

    const connections = [
        { id: '1', name: 'Super Doggo', role: 'Engineering Manager', portait: 'https://placedog.net/500/500', email: 'super@doggo' },
        { id: '2', name: 'The Boss', role: 'Engineering Manager', portait: 'https://placedog.net/300/500', email: 'the@boss' }
    ];

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
    const handleCategoryChange = (value: Category) => {
        const updatedCategories = feedbackNote.categories.includes(value) ?
            feedbackNote.categories.filter((category) => category !== value) :
            [...feedbackNote.categories, value];

        setFeedbackNote({
            ...feedbackNote,
            categories: updatedCategories
        });
    };
    const handleBadgeChange = (value: FeedbackSuggestionTag) => {
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

    const saveFeedback = () => {
        // magic happens here
    };

    const categories = getFeedbackCategories();
    const feedbackSuggestionTags = getFeedbackSuggestionTags();

    const feedbackSteps: {[key: number]: string} = {
        1: 'whom do you want to feedback?',
        2: 'something to praise or improve?',
        3: 'what dimensions?',
        4: 'what areas do you recommend to focus on?',
        5: 'any comments?'
    };

    return (
        <div>
            <div className="min-h-[512px] max-w-lg">
                <div className="min-h-full">
                    <div className="min-h-[150px]">
                        <FeedbackStepper stepTitle={feedbackSteps[feedbackStep]} />
                    </div>

                    <div className="mb-3 w-full overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div key={feedbackStep ? feedbackStep : ''} animate={animationProps.animate} initial={animationProps.initial} exit={animationProps.exit} transition={transition}>
                                {feedbackStep === 1 && <UserSelector connections={connections} onUserSelected={handleChange} />}
                                {feedbackStep === 2 && <FeedbackTypeSelector feedbackType={feedbackNote.type} onTypeSelected={handleChange} />}
                                {feedbackStep === 3 &&
                                    <div className="relative mb-4 flex flex-wrap gap-4">
                                        {
                                            categories.map((category) => (
                                                <CategoryCard key={category.id} category={category} onCategorySelected={handleCategoryChange} />
                                            ))
                                        }
                                    </div>}
                                {feedbackStep === 4 &&
                                    <div className="mb-4 flex flex-wrap gap-4">
                                        {feedbackSuggestionTags.map((tag) => (
                                            <CategoryBadgeSelector key={tag.id} tag={tag} onBadgeSelected={handleBadgeChange} />
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
                            <div>
                                <Button
                                    type="button"
                                    intent="default"
                                    w="full"
                                    label="Previous step"
                                    disabled={feedbackStep <= 1}
                                    onClick={previousStep}
                                />
                            </div>}

                        <div>
                            <Button
                                type="button"
                                intent="default"
                                w="full"
                                label={feedbackStep === 5 ? 'Save it!' : 'Next step'}
                                onClick={feedbackStep === 5 ? saveFeedback : nextStep}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
