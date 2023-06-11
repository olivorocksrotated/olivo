import Button from '@/app/components/ui/button';

import ConnectionLoader from './components/connection-loader';

export default function Loading() {
    return (
        <div>
            <Button label="Connect" />
            <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                <ConnectionLoader></ConnectionLoader>
                <ConnectionLoader></ConnectionLoader>
                <ConnectionLoader></ConnectionLoader>
                <ConnectionLoader></ConnectionLoader>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
