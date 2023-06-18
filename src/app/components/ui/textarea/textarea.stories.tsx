import type { Meta, StoryObj } from '@storybook/react';

import Textarea from './textarea';

const meta: Meta<typeof Textarea> = {
    title: 'UI/TextArea',
    component: Textarea,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Extended UI component for user input'
            }
        }
    },
    argTypes: {
        w: {
            name: 'w',
            type: 'string',
            description: 'How much should the textarea extend in width',
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
            description: 'How much should the textarea extend in height',
            control: { type: 'radio' },
            options: ['md', 'lg', 'full'],
            table: {
                type: { summary: 'md | lg | full' },
                defaultValue: { summary: 'md' }
            }
        },
        disabled: {
            description: 'Is this textarea interactive?',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
        },
        resize: {
            description: 'Is this textarea resizable?',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true }
            }
        }
    }
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
    args: {}
};

export const XS: Story = {
    args: {
        w: 'xs'
    }
};

export const S: Story = {
    args: {
        w: 's'
    }
};

export const Md: Story = {
    args: {
        w: 'md'
    }
};

export const Full: Story = {
    args: {
        w: 'full'
    }
};
