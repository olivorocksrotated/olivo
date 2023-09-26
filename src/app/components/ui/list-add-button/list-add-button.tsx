'use client';

import { cva, VariantProps } from 'cva';
import { IoAddOutline } from 'react-icons/io5';

const buttonStyles = cva(
    'w-full cursor-pointer rounded-lg border border-dashed border-neutral-500 text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-400',
    {
        variants: {
            size: {
                xs: 'h-[18px]',
                s: 'h-[28px]',
                md: 'h-[42px]'
            }
        },
        defaultVariants: {
            size: 'md'
        }
    }
);

const iconSize = {
    xs: 15,
    s: 20,
    md: 25
};

interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>, VariantProps<typeof buttonStyles> {
    label: string;
}

export default function ListAddButton(props: Props) {
    const { label, size, ...nativeProps } = props;

    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            {...nativeProps}
            className={buttonStyles(props)}
        >
            <IoAddOutline size={iconSize[size ?? 'md']} className="mx-auto my-0" />
        </button>
    );
}
