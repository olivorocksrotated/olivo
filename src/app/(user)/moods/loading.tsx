export default function Loading() {
    return (
        <div className="flex animate-pulse flex-col-reverse gap-10 sm:flex-row">
            <div className="flex flex-row gap-8 sm:flex-col">
                <div className="h-52 w-full rounded-md bg-gray-800 sm:min-w-[250px]"></div>
                <div className="h-32 w-8 rounded-md bg-gray-800 sm:h-8 sm:w-32"></div>
            </div>
            <div className="mb-5 h-64 w-full rounded-md bg-gray-800 sm:max-w-2xl"></div>
        </div>
    );
}
