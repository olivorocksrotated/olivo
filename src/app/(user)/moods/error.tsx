'use client';

import BaseError from '@/app/components/error';

export default function Error({
    error,
    reset
}: {
    error: Error;
    reset: () => void;
}) {
    return <BaseError error={error} reset={reset} />;
}
