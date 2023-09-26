'use client';

import { cva, VariantProps } from 'cva';
import { useState } from 'react';
import { IoMdEye } from 'react-icons/io';
import { IoCodeSlashOutline } from 'react-icons/io5';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

import IconButton from '../icon-button/icon-button';
import { editorContentStyles } from '../rich-text-editor/rich-text-editor.styles';
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

const visualizationStyles = `h-full max-h-full w-full max-w-full overflow-y-auto rounded bg-neutral-900 py-2 pl-4 pr-8 ${editorContentStyles}`;

interface Props extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>, VariantProps<typeof editorStyles> {}

export default function MarkdownEditor({
    value,
    disabled,
    onChange = () => undefined,
    ...otherProps
}: Props) {
    const [isEditing, setIsEditing] = useState(true);

    const visualization = (
        <div className={visualizationStyles}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value?.toString() ?? ''}</ReactMarkdown>
        </div>
    );

    return (
        <div className={editorStyles(otherProps)}>
            <div className="absolute right-5 top-1">
                {!disabled ? (
                    <IconButton
                        icon={isEditing ? IoMdEye : IoCodeSlashOutline}
                        size="s"
                        label={isEditing ? 'Result' : 'Edit'}
                        onClick={() => setIsEditing((prev) => !prev)}
                    />
                ) : null}
            </div>
            {disabled ?
                visualization :
                isEditing ?
                    <Textarea
                        {...otherProps}
                        resize={false}
                        disabled={disabled}
                        onChange={onChange}
                        value={value}
                    /> :
                    visualization}
        </div>
    );
}
