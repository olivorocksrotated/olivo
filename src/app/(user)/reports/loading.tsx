export default function Loading() {
    const listItem = (
        <div className="pt-3 pb-3 flex gap-4">
            <div>
                <div className="h-16 rounded-lg bg-gray-600 w-16"></div>
            </div>
            <div className="mr-20">
                <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 rounded-full bg-gray-700"></div>
            </div>
            <div className="grow justify-end flex">
                <div className="h-2.5 rounded-full bg-gray-700 w-8"></div>
            </div>
        </div>
    );

    return (
        <div className="shadow animate-pulse max-w-fit">
            <div className="h-10 rounded-full bg-gray-600 w-60 mb-16"></div>
            <div className="w-[26rem] p-5 space-y-4 border rounded divide-gray-700 border-gray-700">
                <div className="h-6 rounded-full bg-gray-600 w-24 mb-8 mt-3"></div>
                <div role="status" className="space-y-4 divide-y border-gray-700 divide-gray-700">
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
