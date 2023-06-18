import type { Meta, StoryObj } from '@storybook/react';

import Input from './input';

const meta: Meta<typeof Input> = {
    title: 'UI/Input',
    component: Input,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Primary UI component for user input'
            }
        }
    },
    argTypes: {
        extend: {
            name: 'extend',
            type: 'string',
            description: 'How much should the input extend in width',
            control: { type: 'radio' },
            options: ['xs', 's', 'md', 'full'],
            table: {
                type: { summary: 'xs | s | md | full' },
                defaultValue: { summary: 'full' }
            }
        },
        disabled: {
            description: 'Is this input interactive?',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
        }
    }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {}
};

export const XS: Story = {
    args: {
        extend: 'xs'
    }
};

export const S: Story = {
    args: {
        extend: 's'
    }
};

export const Md: Story = {
    args: {
        extend: 'md'
    }
};

export const Full: Story = {
    args: {
        extend: 'full'
    }
};
