export default function Loading() {
    return (
        <div>
            <div className="mb-10 flex h-fit w-full animate-pulse flex-wrap gap-4">
                <div className="mb-4 h-14 w-full bg-neutral-700 sm:w-80"></div>
                <div className="h-14 w-full bg-neutral-700 sm:w-80"></div>
            </div>
            <div className="h-72 w-full animate-pulse bg-neutral-700"></div>
        </div>
    );
}
