export default function Loading() {
    return (
        <div className="flex flex-col gap-8 sm:flex-row">
            <div className="h-fit w-full max-w-xl animate-pulse">
                <div className="mb-8 h-14 w-80 bg-neutral-700"></div>
                <div className="mb-4 h-20 w-full bg-neutral-700"></div>
                <div className="mb-4 h-20 w-full bg-neutral-700"></div>
                <div className="mb-4 h-20 w-full bg-neutral-700"></div>
                <div className="mb-4 h-20 w-full bg-neutral-700"></div>
            </div>
            <div className="h-72 w-full animate-pulse bg-neutral-700"></div>
        </div>
    );
}
