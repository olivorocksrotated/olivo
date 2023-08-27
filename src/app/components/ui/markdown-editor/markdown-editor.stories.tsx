import type { Meta, StoryObj } from '@storybook/react';

import MarkdownEditor from './markdown-editor';

const meta: Meta<typeof MarkdownEditor> = {
    title: 'UI/MarkdownEditor',
    component: MarkdownEditor,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'UI component for markdown input and visualization'
            }
        }
    },
    argTypes: {
        w: {
            name: 'w',
            type: 'string',
            description: 'How much should the editor extend in width',
            control: { type: 'radio' },
            options: ['xs', 's', 'md', 'full'],
            table: {
                type: { summary: 'xs | s | md | full' },
                defaultValue: { summary: 'full' }
            }
        },
        h: {
            name: 'h',
            type: 'string',
            description: 'How much should the editor extend in height',
            control: { type: 'radio' },
            options: ['md', 'lg', 'full'],
            table: {
                type: { summary: 'md | lg | full' },
                defaultValue: { summary: 'md' }
            }
        },
        disabled: {
            description: 'Is the editor interactive?',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
        },
        onChange: {
            control: false
        }
    }
};

export default meta;
type Story = StoryObj<typeof MarkdownEditor>;

const markdown = `# The title
A paragraph with *emphasis* and **strong importance**.
> A block quote with ~strikethrough~ and a URL: https://reactjs.org.
* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |`;

export const Default: Story = {
    args: {
        value: markdown
    }
};

export const XS: Story = {
    args: {
        w: 'xs',
        value: markdown
    }
};

export const S: Story = {
    args: {
        w: 's',
        value: markdown
    }
};

export const Md: Story = {
    args: {
        w: 'md',
        value: markdown
    }
};

export const Full: Story = {
    args: {
        w: 'full',
        value: markdown
    }
};
