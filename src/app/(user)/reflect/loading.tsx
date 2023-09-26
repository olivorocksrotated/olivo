export default function Loading() {
    return (
        <div className="flex animate-pulse flex-col gap-10 sm:flex-row">
            <div className="h-64 w-full rounded-md bg-gray-800 sm:max-w-[510px]"></div>
            <div className="mb-5 h-64 w-full rounded-md bg-gray-800"></div>
        </div>
    );
}
