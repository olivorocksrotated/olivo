import Loader from '@/app/components/ui/loader/loader';

export default function ContextLoader() {
    return (
        <div className="flex h-full w-full items-center justify-center bg-neutral-950 py-8">
            <Loader intent="standalone" size="s"></Loader>
        </div>
    );
}
