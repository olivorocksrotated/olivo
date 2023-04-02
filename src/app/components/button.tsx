'use client';

import styles from './button.module.css';

type ButtonProperties = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & { glowing?: boolean };

export default function Button({ children, ...props }: ButtonProperties) {
    const { glowing, ...nativeProps } = props;
    const glowingStyle = glowing ? styles['glow-on-hover'] : '';

    return (
        <button type="button"
            {...nativeProps}
            className={`px-4 py-1 rounded border border-solid border-zinc-500 text-white disabled:opacity-50 hover:border-zinc-200 hover:text-white ${glowingStyle}`}
        >
            {children}
        </button>
    );
}
