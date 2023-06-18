'use client';

import { cva, VariantProps } from 'cva';
import { IconType } from 'react-icons';

import Loader from '../loader/loader';
import styles from './button.module.css';

const buttonStyles = cva(
    'flex items-center justify-between gap-2 rounded border border-solid border-neutral-500 text-white disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            intent: {
                default: 'transition hover:enabled:border-neutral-200',
                cta: `${styles.glow} hover:enabled:after:opacity-90`,
                secondary: 'text-white transition hover:enabled:bg-neutral-950'
            },
            size: {
                xs: 'h-[18px] min-h-[18px] px-2 text-xs',
                s: 'h-[28px] min-h-[28px] px-3 py-1 text-sm',
                md: 'h-[42px] min-h-[42px] px-4 py-1'
            }
        },
        defaultVariants: {
            intent: 'default',
            size: 'md'
        }
    }
);

const iconSize = {
    xs: 10,
    s: 15,
    md: 20
};

interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>, VariantProps<typeof buttonStyles> {
    label: string;
    loading?: boolean;
    icon?: IconType
}

export default function Button(props: Props) {
    const { label, icon: Icon, loading, size, ...nativeProps } = props;

    return (
        <button type="button" aria-label={label} {...nativeProps} className={buttonStyles(props)}>
            {Icon && !loading ? <Icon size={iconSize[size ?? 'md']} /> : null}
            {loading ? <Loader intent="inner" size={size ?? 'md'} /> : null}
            <span>{label}</span>
        </button>
    );
}
