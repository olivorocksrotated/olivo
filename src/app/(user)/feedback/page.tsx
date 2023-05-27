'use client';

import { TbRocket, TbSchoolBell, TbSearch } from 'react-icons/tb';

import { getFeedbackCategories } from '@/lib/feedback/categories';

export default function Feedback() {
    const categories = getFeedbackCategories();
    const users = [
        { id: '1', name: 'Super Doggo', role: 'Engineering Manager', portait: 'https://placedog.net/500/500' },
        { id: '2', name: 'The Boss', role: 'Engineering Manager', portait: 'https://placedog.net/300/500' }
    ];

    return (
        <main>
            <section className="max-w-lg">
                {/* User selection */}
                <div className="bg-slate-700 p-3">
                    <div className="flex rounded-t-md border border-slate-700 bg-gray-600/20">
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
                <div className="relative mb-4 flex justify-between gap-4">
                    <div className="mb-1 mr-1 flex h-[150px] w-[242px] cursor-pointer flex-col flex-wrap justify-center gap-y-4 rounded border border-slate-700 px-8 py-3 pl-4 font-bold uppercase text-slate-500 outline-none transition-all duration-150 ease-linear hover:bg-teal-700 hover:text-slate-100">
                        <div><TbRocket fontSize={32} /></div>
                        <h3 className="text-xl font-bold">Praise</h3>
                    </div>

                    <div className="mb-1 mr-1 flex h-[150px] w-[242px] cursor-pointer flex-col flex-wrap justify-center gap-y-4 rounded border border-slate-700 px-8 py-3 pl-4 font-bold uppercase text-slate-500 outline-none transition-all duration-150 ease-linear hover:bg-amber-700 hover:text-slate-100">
                        <div><TbSchoolBell fontSize={32} /></div>
                        <h3 className="text-xl font-bold">Improve</h3>
                    </div>
                </div>

                {/* Feedback categories selection */}
                <div className="relative mb-4 flex flex-wrap gap-4">
                    {
                        categories.map((category) => (
                            <div key={category.id} className="flex h-[100px] w-[160px] cursor-pointer flex-col justify-center bg-slate-700 uppercase transition duration-300 ease-in-out hover:scale-110 hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-600">
                                <h3 className="pl-3 text-sm font-bold">{category.name}</h3>
                            </div>
                        ))
                    }
                </div>

                {/* Feedback tags for selected categories */}
                {/* <div className="flex flex-col gap-4">
                    <div className="">
                        <div>Communication</div>
                        <div className="flex gap-4">
                            <div>Needs more</div>
                            <div>Needs less</div>
                            <div>Keep doing</div>
                        </div>
                    </div>

                    <div className="">
                        <div>Teamwork</div>
                        <div className="flex gap-4">
                            <div>Needs more</div>
                            <div>Needs less</div>
                            <div>Keep doing</div>
                        </div>
                    </div>
                </div> */}

                {/* Feedback note/comment */}

                <div className="mb-4 h-[150px] w-full rounded-md bg-slate-700 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] p-[2px] hover:bg-gradient-to-r">
                    <div className="flex h-full flex-col justify-between rounded-lg bg-gray-600/20 p-3 hover:bg-slate-700">
                        <textarea className="h-full w-full resize-none bg-gray-600/20 p-2 text-slate-100 outline-none" placeholder="Leave a comment"></textarea>
                    </div>
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
