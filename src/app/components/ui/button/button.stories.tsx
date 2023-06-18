import type { Meta, StoryObj } from '@storybook/react';
import { FcGoogle } from 'react-icons/fc';

import Button from './button';

const meta: Meta<typeof Button> = {
    title: 'UI/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Primary UI component for user interaction'
            }
        }
    },
    argTypes: {
        intent: {
            name: 'intent',
            type: 'string',
            description: 'The purpose of this button',
            control: { type: 'radio' },
            options: ['default', 'cta', 'secondary'],
            table: {
                type: { summary: 'default | cta | secondary' },
                defaultValue: { summary: 'default' }
            }
        },
        size: {
            name: 'size',
            type: 'string',
            description: 'The size of this button',
            control: { type: 'radio' },
            options: ['xs', 's', 'md'],
            table: {
                type: { summary: 'xs | s | md' },
                defaultValue: { summary: 's' }
            }
        },
        label: {
            description: 'Content of the button'
        },
        icon: {
            description: 'A react icon component',
            control: false
        },
        disabled: {
            description: 'Is this button interactive?',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
        }
    }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        intent: 'default',
        label: 'This is a default button'
    }
};

export const Cta: Story = {
    args: {
        intent: 'cta',
        label: 'This is a CTA button'
    }
};

export const Secondary: Story = {
    args: {
        intent: 'secondary',
        label: 'This is a secondary button'
    }
};

export const Icon: Story = {
    args: {
        intent: 'default',
        label: 'This is a button with icon',
        icon: FcGoogle
    }
};
