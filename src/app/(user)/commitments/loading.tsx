export default function Loading() {
    return (
        <div className="h-fit w-full max-w-2xl animate-pulse rounded-md bg-neutral-800 p-6">
            <div className="mb-6 flex justify-between">
                <div className="h-8 w-48 bg-neutral-700"></div>
                <div className="h-8 w-8 bg-neutral-700"></div>
            </div>
            <div className="mb-6 flex gap-4">
                <div className="h-7 w-20 bg-neutral-700"></div>
                <div className="h-7 w-20 bg-neutral-700"></div>
            </div>
            <div className="mb-4 h-20 w-full bg-neutral-700"></div>
            <div className="mb-4 h-20 w-full bg-neutral-700"></div>
            <div className="mb-4 h-20 w-full bg-neutral-700"></div>
            <div className="mb-4 h-20 w-full bg-neutral-700"></div>
        </div>
    );
}
