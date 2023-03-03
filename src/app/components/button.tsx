'use client';

type ButtonProperties = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export default function Button({ children, ...props }: ButtonProperties) {
    return <button {...props} className="px-4 py-1 rounded border border-solid border-zinc-60">
        { children }
    </button>;
}
