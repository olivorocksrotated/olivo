'use client';

import clsx from 'clsx';

import styles from './button.module.css';

type ButtonProperties = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & { glowing?: boolean };

export default function Button({ children, ...props }: ButtonProperties) {
    const { glowing, ...nativeProps } = props;
    const glowingStyle = glowing ? styles['glow-on-hover'] : '';
    const buttonStyle = clsx(
        'rounded border border-solid border-neutral-500 px-4 py-1 text-white',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'hover:enabled:border-neutral-200',
        glowingStyle
    );

    return (
        <button type="button"
            {...nativeProps}
            className={buttonStyle}
        >
            {children}
        </button>
    );
}
