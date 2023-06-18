import { cva, VariantProps } from 'cva';

const inputStyles = cva(
    `h-[42px] min-h-[42px] rounded bg-neutral-600 px-4 py-3 leading-none outline-none
    focus:outline-1 focus:outline-neutral-400
    hover:enabled:outline-1 hover:enabled:outline-neutral-400
    disabled:cursor-not-allowed disabled:opacity-50`,
    {
        variants: {
            extend: {
                xs: 'w-32',
                s: 'w-48',
                md: 'w-64',
                full: 'w-full'
            }
        },
        defaultVariants: {
            extend: 'full'
        }
    }
);

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'>, VariantProps<typeof inputStyles>{}

export default function Input(props: Props) {
    return <input {...props} className={inputStyles(props)} />;
}
