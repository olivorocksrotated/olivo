import { ChangeEvent, useState } from 'react';
import { TbSearch } from 'react-icons/tb';

interface Connection {
    id: string;
    name: string;
    email: string;
    portait: string;
    role: string;
}

interface UserRowProps {
    user: Connection;
    onConnectionSelected: (user: Connection) => void;
}
function UserRow({ user, onConnectionSelected }: UserRowProps) {
    return (
        <div className="px-0 pb-10">
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
                        <span className="relative cursor-pointer" onClick={() => onConnectionSelected(user)}>Choose</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface Props {
    connections: any[];
    onUserSelected: (name: string, value: string) => void;
}
export default function UserSelector({ connections, onUserSelected }: Props) {
    const [searchQuery, setSearchQuery] = useState({
        query: '',
        filteredUsers: [] as Connection[]
    });
    const [selectedUser, setSelectedUser] = useState(null as Connection | null);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        const filteredUsers = query ?
            connections.filter((connection) => connection.email.toLowerCase().includes(query.toLowerCase())) : [];

        setSearchQuery({ query, filteredUsers });
    };
    const handleUserSelected = (user: Connection) => {
        onUserSelected('receiverId', user.id);

        setSelectedUser(user);
        setSearchQuery({ query: '', filteredUsers: [] });
    };

    return (
        <section>
            <div className="mb-2 bg-slate-800 p-3">
                <div className="flex border border-slate-700 bg-slate-500/20">
                    <span className="p-3 py-4"><TbSearch size={16} /></span>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Type the email"
                        className="w-full bg-transparent p-2 focus:outline-none"
                        value={searchQuery.query}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {searchQuery.filteredUsers.length > 0 ? (
                <div className="mb-4 rounded-b-md bg-slate-800 p-3">
                    {searchQuery.filteredUsers.map((user) => (
                        <UserRow key={user.id} user={user} onConnectionSelected={handleUserSelected} />
                    ))}
                </div>
            ) : selectedUser ? (
                <UserRow key={selectedUser.id} user={selectedUser} onConnectionSelected={handleUserSelected} />
            ) : null}
        </section>
    );
}
