import Link from 'next/link';

export default function Context() {
    return (
        <div className="flex flex-col gap-4">
            <Link href="/yesterday">Load Yesterday context</Link>
            <Link href="/dynamic">Load Dynamic context</Link>
            <Link href="/pinned">Load Dynamic context</Link>
        </div>
    );
}
