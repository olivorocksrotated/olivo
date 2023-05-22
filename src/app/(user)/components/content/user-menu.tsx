export default function UserMenu({ children }: { children: React.ReactNode; }) {
    return (
        <div className="mx-1 my-4 flex items-center justify-center divide-y divide-gray-600">
            <div className="rounded-lg bg-indigo-950/90 px-5 py-1">
                {children}
            </div>
        </div>
    );
}
