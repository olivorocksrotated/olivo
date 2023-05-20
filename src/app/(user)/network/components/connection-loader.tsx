export default function ConnectionLoader() {
    return (
        <div className="flex w-full min-w-[300px] animate-pulse gap-4 rounded-md border-4 border-gray-600 bg-gray-800 p-5">
            <div>
                <div className="h-20 w-20 rounded-lg bg-gray-600"></div>
            </div>
            <div>
                <div>
                    <div className="h-6 w-20 rounded bg-gray-600"></div>
                </div>
                <div className="mt-2">
                    <div className="h-4 w-16 rounded bg-gray-600"></div>
                </div>
            </div>
        </div>
    );
}
