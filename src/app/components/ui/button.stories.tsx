import type { Meta, StoryObj } from '@storybook/react';
import { IoAddOutline } from 'react-icons/io5';

import Button from './button';

const meta: Meta<typeof Button> = {
    title: 'UI/Button',
    id: 'alksjdajld',
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
                defaultValue: { summary: 'Hello' }
            }
        },
        label: {
            description: 'Content of the button'
        },
        icon: {
            description: 'A react icon component',
            control: false
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
        icon: IoAddOutline
    }
};
