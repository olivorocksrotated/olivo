'use client';

import { cva, VariantProps } from 'cva';
import { IconType } from 'react-icons';

const buttonStyles = cva(
    'relative text-neutral-300 transition hover:enabled:bg-neutral-700 hover:enabled:text-neutral-100 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            size: {
                xs: 'rounded p-0.5',
                s: 'rounded p-1',
                md: 'rounded-lg p-2'
            }
        },
        defaultVariants: {
            size: 's'
        }
    }
);

interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>, VariantProps<typeof buttonStyles> {
    label: string,
    icon: IconType,
    ping?: boolean
}

export default function IconButton(props: Props) {
    const { label, size, icon: Icon, ping, ...nativeProps } = props;

    const specificIconSize = size === 'md' ? 25 : size === 'xs' ? 15 : 20;
    const specificPingSize = size === 'md' ? 'h-3 w-3' : size === 'xs' ? 'h-1 w-1' : 'h-2 w-2';

    return (
        <button type="button" aria-label={label} {...nativeProps} className={buttonStyles(props)}>
            <Icon size={specificIconSize} />
            {ping ? (
                <span className={`absolute right-0 top-0 flex ${specificPingSize}`}>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                    <span className={`relative inline-flex ${specificPingSize} rounded-full bg-red-500`}></span>
                </span>
            ) : null}
        </button>
    );
}
