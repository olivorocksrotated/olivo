'use client';

import { cva, VariantProps } from 'cva';
import { IconType } from 'react-icons';

// import styles from './button.module.css';

const buttonStyles = cva(
    'flex items-center justify-between gap-2 rounded border border-solid px-4 py-1',
    {
        variants: {
            intent: {
                default: 'border-neutral-500 text-white hover:border-neutral-200 disabled:cursor-not-allowed disabled:opacity-50',
                cta: '',
                secondary: ''
            }
        },
        defaultVariants: {
            intent: 'default'
        },
        compoundVariants: [{}]
    }
);

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & VariantProps<typeof buttonStyles> & {
    label: string;
    icon?: IconType
};

export default function Button(props: Props) {
    const { label, icon: Icon, ...nativeProps } = props;

    return (
        <button type="button" {...nativeProps} className={buttonStyles(props)}>
            {Icon ? <Icon size={20} /> : null}
            <span>{label}</span>
        </button>
    );
}
