import { TbSearch } from 'react-icons/tb';

interface Props {
    onUserSelected: (name: string, value: string) => void;
}

export default function UserSelector({ onUserSelected }: Props) {
    const users = [
        { id: '1', name: 'Super Doggo', role: 'Engineering Manager', portait: 'https://placedog.net/500/500' },
        { id: '2', name: 'The Boss', role: 'Engineering Manager', portait: 'https://placedog.net/300/500' }
    ];

    return (
        <section>
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

                                <div className="group relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-3 font-bold text-white shadow-2xl">
                                    <span className="absolute inset-0 h-full w-full bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 opacity-0 transition duration-300 ease-out group-hover:opacity-100"></span>
                                    <span className="absolute left-0 top-0 h-1/3 w-full bg-gradient-to-b from-white to-transparent opacity-5"></span>
                                    <span className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-white to-transparent opacity-5"></span>
                                    <span className="absolute bottom-0 left-0 h-full w-4 bg-gradient-to-r from-white to-transparent opacity-5"></span>
                                    <span className="absolute bottom-0 right-0 h-full w-4 bg-gradient-to-l from-white to-transparent opacity-5"></span>
                                    <span className="absolute inset-0 h-full w-full rounded-md border border-white opacity-10"></span>
                                    <span className="absolute h-0 w-0 rounded-full bg-white opacity-5 transition-all duration-300 ease-out group-hover:h-56 group-hover:w-56"></span>
                                    <span className="relative" onClick={() => onUserSelected('receiver', user.name)}>Choose</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
