import type { Meta, StoryObj } from '@storybook/react';

import Loader from './loader';

const meta: Meta<typeof Loader> = {
    title: 'UI/Loader',
    component: Loader,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Loading indicator'
            }
        }
    },
    argTypes: {
        intent: {
            name: 'intent',
            type: 'string',
            description: 'The purpose of this loader',
            control: { type: 'radio' },
            options: ['standalone', 'inner'],
            table: {
                type: { summary: 'standalone | inner' },
                defaultValue: { summary: 'standalone' }
            }
        },
        size: {
            name: 'size',
            type: 'string',
            description: 'The size of this loader',
            control: { type: 'radio' },
            options: ['xs', 's', 'md'],
            table: {
                type: { summary: 'xs | s | md' },
                defaultValue: { summary: 'md' }
            }
        }
    }
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
    args: {}
};

export const Inner: Story = {
    args: {
        intent: 'inner'
    }
};

export const Standalone: Story = {
    args: {
        intent: 'standalone'
    }
};
