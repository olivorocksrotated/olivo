'use client';

import { TbSearch } from 'react-icons/tb';

import { getFeedbackCategories, getFeedbackSuggestionTags } from '@/lib/feedback/categories';

import CategoryBatchSelector from './components/badge-selector';
import CategoryCard from './components/category-card';
import FeedbackTypeSelector from './components/feedback-type-selector';

export default function Feedback() {
    const categories = getFeedbackCategories();
    const users = [
        { id: '1', name: 'Super Doggo', role: 'Engineering Manager', portait: 'https://placedog.net/500/500' },
        { id: '2', name: 'The Boss', role: 'Engineering Manager', portait: 'https://placedog.net/300/500' }
    ];
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

    return (
        <main>
            <section className="max-w-lg">
                <div className="space-y-2 py-6 text-slate-200">
                    <h3 className="mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-4xl font-semibold text-transparent">{stepperTitles[0]}</h3>
                    <div className="flex gap-3">
                        <span className="h-5 w-24 rounded-sm bg-teal-500"></span>
                        <span className="h-5 w-24 rounded-sm bg-slate-400"></span>
                        <span className="h-5 w-24 rounded-sm bg-slate-400"></span>
                        <span className="h-5 w-24 rounded-sm bg-slate-400"></span>
                        <span className="h-5 w-24 rounded-sm bg-slate-400"></span>
                    </div>
                </div>

                {/* User selection */}
                <div className="bg-slate-800 p-3">
                    <div className="flex border border-slate-700 bg-slate-500/20">
                        <span className="p-3 py-4"><TbSearch size={16} /></span>
                        <input type="email" name="email" id="email" placeholder="Type the email" className="w-full bg-transparent p-2 focus:outline-none"></input>
                    </div>
                </div>

                <div className="mb-4 rounded-b-md bg-slate-800 p-3">
                    {users.map((user) => (
                        <div key={user.id} className="px-0 pb-10">
                            <div className="mx-0 px-0 pb-0 pt-5">
                                <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                    <div className="flex min-w-0 flex-1 items-center">
                                        <img alt={user.name} src={user.portait} className="h-10 w-10 shrink-0 rounded-full object-cover" />
                                        <div className="my-0 ml-4 mr-0 min-w-0 flex-1">
                                            <div>
                                                <span className="text-lg font-bold text-slate-200">{user.name}</span>
                                            </div>

                                            <div>
                                                <span className="text-base text-slate-300">{user.role}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <a href="#_" className="group relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-3 font-bold text-white shadow-2xl">
                                        <span className="absolute inset-0 h-full w-full bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 opacity-0 transition duration-300 ease-out group-hover:opacity-100"></span>
                                        <span className="absolute left-0 top-0 h-1/3 w-full bg-gradient-to-b from-white to-transparent opacity-5"></span>
                                        <span className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-white to-transparent opacity-5"></span>
                                        <span className="absolute bottom-0 left-0 h-full w-4 bg-gradient-to-r from-white to-transparent opacity-5"></span>
                                        <span className="absolute bottom-0 right-0 h-full w-4 bg-gradient-to-l from-white to-transparent opacity-5"></span>
                                        <span className="absolute inset-0 h-full w-full rounded-md border border-white opacity-10"></span>
                                        <span className="absolute h-0 w-0 rounded-full bg-white opacity-5 transition-all duration-300 ease-out group-hover:h-56 group-hover:w-56"></span>
                                        <span className="relative">Choose</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Feedback type selection */}
                <FeedbackTypeSelector />

                {/* Feedback categories selection */}
                <div className="relative mb-4 flex flex-wrap gap-4">
                    {
                        categories.map((category) => (
                            <CategoryCard key={category.id} category={category.name} />
                        ))
                    }
                </div>

                {/* Feedback tags for selected categories */}

                <div className="mb-4 flex flex-wrap gap-4">
                    {feedbackSuggestionTags.map((tag) => (
                        <CategoryBatchSelector key={tag.id} tag={tag.name} />
                    ))}
                </div>

                {/* Feedback note/comment */}
                <div className="mb-4 h-[150px] w-full rounded-md bg-slate-800 p-3">
                    <textarea className="h-full w-full resize-none bg-gray-600/20 p-2 text-slate-100 outline-none" placeholder="Leave a comment"></textarea>
                </div>

                <div>
                    <div>
                        <a href="#_" className="group relative inline-flex items-center justify-center overflow-hidden rounded-md p-0.5 font-bold">
                            <span className="absolute h-full w-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>

                            <span className="relative rounded-md bg-gray-900 px-6 py-3 transition-all duration-500 ease-out group-hover:bg-gray-900/0">
                                <span className="relative text-slate-200">Next step</span>
                            </span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
