'use client';

import { cva, VariantProps } from 'cva';
import { IconType } from 'react-icons';

import styles from '../button/button.module.css';

const buttonStyles = cva(
    'relative text-neutral-300 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            intent: {
                default: 'transition hover:enabled:bg-neutral-700 hover:enabled:text-neutral-100',
                cta: `${styles.glow} hover:enabled:after:opacity-90`,
                secondary: 'text-neutral-500 transition hover:enabled:text-neutral-200'
            },
            size: {
                xs: 'rounded p-0.5',
                s: 'rounded p-1',
                md: 'rounded-lg p-2'
            }
        },
        defaultVariants: {
            intent: 'default',
            size: 's'
        }
    }
);

const pingSizeStyles = cva(
    '',
    {
        variants: {
            size: {
                xs: 'h-1 w-1',
                s: 'h-2 w-2',
                md: 'h-3 w-3'
            }
        },
        defaultVariants: {
            size: 's'
        }
    }
);

const iconSize = {
    xs: 15,
    s: 20,
    md: 25
};

interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>, VariantProps<typeof buttonStyles> {
    label: string,
    icon: IconType,
    ping?: boolean
}

export default function IconButton(props: Props) {
    const { label, size, icon: Icon, ping, ...nativeProps } = props;

    return (
        <button type="button" aria-label={label} {...nativeProps} className={buttonStyles(props)}>
            <Icon size={iconSize[size ?? 's']} />
            {ping ? (
                <span className={`absolute right-0 top-0 flex ${pingSizeStyles(props)}`}>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                    <span className={`relative inline-flex ${pingSizeStyles(props)} rounded-full bg-red-500`}></span>
                </span>
            ) : null}
        </button>
    );
}
