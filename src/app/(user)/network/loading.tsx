import ConnectionLoader from './components/connection-loader';

export default function Loading() {
    return (
        <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ConnectionLoader></ConnectionLoader>
            <ConnectionLoader></ConnectionLoader>
            <ConnectionLoader></ConnectionLoader>
            <ConnectionLoader></ConnectionLoader>
            <span className="sr-only">Loading...</span>
        </div>
    );
}
