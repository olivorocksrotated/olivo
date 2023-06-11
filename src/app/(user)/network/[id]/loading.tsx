import Button from '@/app/components/ui/button';

export default async function Loading() {
    return (
        <div className="flex h-full flex-col gap-4 md:flex-row md:justify-between">
            <div className="flex animate-pulse gap-4">
                <div>
                    <div className="h-40 w-40 rounded-lg bg-neutral-600"></div>
                </div>
                <div>
                    <div className="text-2xl font-extralight text-neutral-100">
                        <div className="h-6 w-32 rounded bg-neutral-600"></div>
                    </div>
                </div>
            </div>
            <div>
                <Button label="Disconnect" />
            </div>
        </div>
    );
}
