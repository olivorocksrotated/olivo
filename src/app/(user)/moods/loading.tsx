export default function Loading() {
    return (
        <div className="flex animate-pulse flex-col-reverse gap-10 sm:flex-row">
            <div>
                <div className="mb-5 h-52 w-full rounded-md bg-gray-800 sm:min-w-[250px]"></div>
                <div className="h-8 w-32 rounded-md bg-gray-800"></div>
            </div>
            <div className="mb-5 h-64 w-full rounded-md bg-gray-800 sm:max-w-2xl"></div>
        </div>
    );
}
