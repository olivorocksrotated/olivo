'use client';

import { IoAddOutline } from 'react-icons/io5';

const iconSize = {
    xs: 15,
    s: 20,
    md: 25
};

interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    label: string;
    size?: 'xs' | 's' | 'md';
}

export default function ListAddButton(props: Props) {
    const { label, size, ...nativeProps } = props;

    return (
        <button type="button"
            aria-label={label}
            title={label}
            {...nativeProps}
            className="w-full cursor-pointer rounded-lg border border-dashed border-neutral-500 p-1 text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-400"
        >
            <IoAddOutline size={iconSize[size ?? 'md']} className="mx-auto my-0" />
        </button>
    );
}
