'use client';

const feedbackEntries = [{
    id: 1,
    receiverId: 1,
    type: 'positive',
    categories: [{ name: 'communication', tags: ['meh'] }, { name: 'teamwork', tags: ['needs more'] }],
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
}];

const networkUsers = [{}];

export default async function Feedback() {
    console.log(feedbackEntries);
    console.log(networkUsers);

    return (
        <main>
            <section className="max-w-lg">
                {/* User selection */}
                <div>
                    <input type="search" placeholder="User name"></input>
                    <ul>
                        <li>Lean</li>
                        <li>Nico</li>
                    </ul>
                </div>

                {/* Feedback type selection */}
                <div className="flex gap-4">
                    <div>Praise</div>
                    <div>Improve</div>
                </div>

                {/* Feedback categories selection */}
                <div className="flex gap-4">
                    <div className="h-40 w-40 bg-slate-400">Communication</div>
                    <div className="h-40 w-40 bg-slate-400">Teamwork</div>
                    <div className="h-40 w-40 bg-slate-400">Leadership</div>
                    <div className="h-40 w-40 bg-slate-400">Problem solving</div>
                </div>

                {/* Feedback tags for selected categories */}
                <div className="flex flex-col gap-4">
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
                </div>

                {/* Feedback note/comment */}
                <div>
                    <textarea placeholder="Comment"></textarea>
                </div>

                <div>
                    <div>Save</div>
                </div>
            </section>
        </main>
    );
}
