'use client';

export default function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button {...props} className={`px-4 py-1 rounded border border-solid border-zinc-600 ${props.className}`}>
        { children }
    </button>;
}
