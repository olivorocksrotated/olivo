'use client';

import { styleState } from '@/lib/styling/styleState';

import styles from './button.module.css';

type ButtonProperties = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & { glowing?: boolean };

export default function Button({ children, ...props }: ButtonProperties) {
    const { glowing, ...nativeProps } = props;
    const glowingStyle = glowing ? styles['glow-on-hover'] : '';
    const hoverStyle = styleState('hover:enabled', 'border-zinc-200 text-white');
    const disabledStyle = styleState('disabled', 'opacity-50');

    return (
        <button type="button"
            {...nativeProps}
            className={`px-4 py-1 rounded border border-solid border-zinc-500 text-white ${disabledStyle} ${hoverStyle} ${glowingStyle}`}
        >
            {children}
        </button>
    );
}
