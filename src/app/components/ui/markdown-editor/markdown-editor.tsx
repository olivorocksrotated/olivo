'use client';

import clsx from 'clsx';
import { cva, VariantProps } from 'cva';
import { useState } from 'react';
import { IoMdEye } from 'react-icons/io';
import { IoCodeSlashOutline } from 'react-icons/io5';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

import IconButton from '../icon-button/icon-button';

const editorStyles = cva(
    'relative rounded leading-relaxed',
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
            }
        },
        defaultVariants: {
            w: 'full',
            h: 'full'
        }
    }
);

const textareaStyles = clsx(
    'h-full w-full resize-none rounded bg-neutral-600 py-2 pl-4 pr-8 outline-none',
    'focus:outline-1 focus:outline-neutral-400',
    'hover:enabled:outline-1 hover:enabled:outline-neutral-400',
    'disabled:cursor-not-allowed disabled:resize-none disabled:opacity-50'
);

const visualizationStyles = clsx(
    `max-h-full max-w-full overflow-y-auto bg-neutral-600 py-2 pl-4 pr-8
    [&_a]:underline [&_a]:hover:text-indigo-300
    [&_blockquote]:my-2 [&_blockquote]:border-l [&_blockquote]:border-l-neutral-200 [&_blockquote]:px-4 [&_blockquote]:py-2
    [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl
    [&_p]:mb-4`
);

interface Props extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>, VariantProps<typeof editorStyles> {
    content: string;
}

export default function MarkdownEditor({
    content,
    disabled,
    onChange = () => undefined,
    ...otherProps
}: Props) {
    const [isEditing, setIsEditing] = useState(true);

    const visualization = (
        <div className={visualizationStyles}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
    );

    return (
        <div className={editorStyles(otherProps)}>
            <div className="absolute right-1 top-1">
                {!disabled ? (
                    <IconButton icon={isEditing ? IoMdEye : IoCodeSlashOutline}
                        size="s"
                        label={isEditing ? 'Result' : 'Edit'}
                        onClick={() => setIsEditing((prev) => !prev)}
                    />
                ) : null}
            </div>
            {disabled ?
                visualization :
                isEditing ?
                    <textarea {...otherProps}
                        disabled={disabled}
                        onChange={onChange}
                        className={textareaStyles}
                        value={content}
                    /> :
                    visualization}
        </div>
    );
}
