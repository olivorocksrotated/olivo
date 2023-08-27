'use client';

import clsx from 'clsx';
import { cva, VariantProps } from 'cva';
import { useState } from 'react';
import { IoMdEye } from 'react-icons/io';
import { IoCodeSlashOutline } from 'react-icons/io5';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

import IconButton from '../icon-button/icon-button';
import Textarea from '../textarea/textarea';

const editorStyles = cva(
    'relative min-h-[42px]',
    {
        variants: {
            w: {
                xs: 'w-32',
                s: 'w-48',
                md: 'w-64',
                full: 'w-full'
            },
            h: {
                md: 'h-[42px]',
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

const visualizationStyles = clsx(
    `h-full max-h-full w-full max-w-full overflow-y-auto rounded bg-neutral-900 py-2 pl-4 pr-8
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
                    <Textarea {...otherProps}
                        resize={false}
                        disabled={disabled}
                        onChange={onChange}
                        value={content}
                    /> :
                    visualization}
        </div>
    );
}
