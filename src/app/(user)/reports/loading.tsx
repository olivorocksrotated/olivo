export default function Loading() {
    const listItem = (
        <div className="flex gap-4 py-3">
            <div>
                <div className="h-16 w-16 rounded-lg bg-gray-600"></div>
            </div>
            <div className="mr-20">
                <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-600"></div>
                <div className="h-2 w-32 rounded-full bg-gray-700"></div>
            </div>
            <div className="flex grow justify-end">
                <div className="h-2.5 w-8 rounded-full bg-gray-700"></div>
            </div>
        </div>
    );

    return (
        <div className="max-w-fit animate-pulse shadow">
            <div className="mb-16 h-10 w-60 rounded-full bg-gray-600"></div>
            <div className="w-[26rem] space-y-4 divide-gray-700 rounded border border-gray-700 p-5">
                <div className="mb-8 mt-3 h-6 w-24 rounded-full bg-gray-600"></div>
                <div role="status" className="space-y-4 divide-y divide-gray-700 border-gray-700">
                    {listItem}
                    {listItem}
                    {listItem}
                    {listItem}
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
}
