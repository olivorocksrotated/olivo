'use client';

type ButtonProperties = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export default function Button({ children, ...props }: ButtonProperties) {
    return (
        <button type="button" {...props} className="px-4 py-1 rounded border border-solid border-zinc-500 text-white disabled:opacity-50 hover:border-zinc-200 hover:text-white">
            {children}
        </button>
    );
}
