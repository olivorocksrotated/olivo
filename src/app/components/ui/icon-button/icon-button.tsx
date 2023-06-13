'use client';

import { cva, VariantProps } from 'cva';
import { IconType } from 'react-icons';

const buttonStyles = cva(
    'text-neutral-300 transition hover:enabled:bg-neutral-700 hover:enabled:text-neutral-100 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            size: {
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
    icon: IconType
}

export default function IconButton(props: Props) {
    const { label, size, icon: Icon, ...nativeProps } = props;

    const specificSize = size === 'md' ? 25 : 20;

    return (
        <button type="button" aria-label={label} {...nativeProps} className={buttonStyles(props)}>
            <Icon size={specificSize} />
        </button>
    );
}
