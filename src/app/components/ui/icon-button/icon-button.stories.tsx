import type { Meta, StoryObj } from '@storybook/react';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdNotifications } from 'react-icons/io';
import { IoAddOutline } from 'react-icons/io5';

import IconButton from './icon-button';

const meta: Meta<typeof IconButton> = {
    title: 'UI/IconButton',
    component: IconButton,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Minimal UI component for user interaction'
            }
        }
    },
    argTypes: {
        intent: {
            name: 'intent',
            type: 'string',
            description: 'The purpose of this button',
            control: { type: 'radio' },
            options: ['default', 'cta'],
            table: {
                type: { summary: 'default | cta' },
                defaultValue: { summary: 'default' }
            }
        },
        label: {
            description: 'Aria label of the button'
        },
        icon: {
            description: 'A react icon component',
            control: false
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
        ping: {
            description: 'Call attention of the user',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
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
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
    args: {
        label: 'This is a default button',
        icon: IoAddOutline
    }
};

export const CTA: Story = {
    args: {
        label: 'This is a cta button',
        icon: IoAddOutline,
        intent: 'cta'
    }
};

export const Secondary: Story = {
    args: {
        label: 'This is a secondary button',
        icon: AiOutlineDelete,
        intent: 'secondary'
    }
};

export const XS: Story = {
    args: {
        label: 'This is an xs button',
        icon: IoAddOutline,
        size: 'xs'
    }
};

export const Small: Story = {
    args: {
        label: 'This is a small button',
        icon: IoAddOutline,
        size: 's'
    }
};

export const Medium: Story = {
    args: {
        label: 'This is a medium button',
        icon: IoMdNotifications,
        size: 'md'
    }
};

export const Ping: Story = {
    args: {
        label: 'This is a ping button',
        icon: IoMdNotifications,
        size: 'md',
        ping: true
    }
};
