import type { Meta, StoryObj } from '@storybook/react';

import RichTextEditor from './rich-text-editor';

const meta: Meta<typeof RichTextEditor> = {
    title: 'UI/RichTextEditor',
    component: RichTextEditor,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'UI component for rich user input'
            }
        }
    },
    argTypes: {
        width: {
            name: 'width',
            type: 'string',
            description: 'How much should the editor extend in width',
            control: { type: 'radio' },
            options: ['s', 'md', 'lg', 'full'],
            table: {
                type: { summary: 's | md | lg | full' },
                defaultValue: { summary: 'full' }
            }
        },
        height: {
            name: 'height',
            type: 'string',
            description: 'How much should the editor extend in height',
            control: { type: 'radio' },
            options: ['s', 'md', 'lg', 'full'],
            table: {
                type: { summary: 's | md | lg | full' },
                defaultValue: { summary: 'full' }
            }
        },
        onChange: {
            name: 'onChange',
            type: 'function',
            control: false,
            description: 'Handler executed when the content changes',
            table: {
                type: { summary: '(value: JSONContent) => void' },
                defaultValue: { summary: '() => undefined' }
            }
        },
        autofocus: {
            control: false,
            type: 'boolean'
        }
    }
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = {
    args: {}
};

export const S: Story = {
    args: { width: 's', height: 's' }
};

export const Md: Story = {
    args: { width: 'md', height: 'md' }
};

export const Lg: Story = {
    args: { width: 'lg', height: 'lg' }
};

export const Full: Story = {
    args: { width: 'full', height: 'full' }
};
