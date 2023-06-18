import { cva, VariantProps } from 'cva';

const textareaStyles = cva(
    `rounded bg-neutral-600 px-4 py-2 leading-relaxed outline-none
    focus:outline-1 focus:outline-neutral-400
    hover:enabled:outline-1 hover:enabled:outline-neutral-400
    disabled:cursor-not-allowed disabled:resize-none disabled:opacity-50`,
    {
        variants: {
            w: {
                xs: 'w-32',
                s: 'w-48',
                md: 'w-64',
                full: 'w-full'
            },
            h: {
                md: 'h-[42px] min-h-[42px]',
                lg: 'h-52',
                full: 'h-full min-h-full'
            },
            resize: {
                false: 'resize-none'
            }
        },
        defaultVariants: {
            w: 'full',
            h: 'md',
            resize: true
        }
    }
);

interface Props extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>, VariantProps<typeof textareaStyles>{}

export default function Textarea(props: Props) {
    return <textarea {...props} className={textareaStyles(props)} />;
}
