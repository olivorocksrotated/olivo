import type { Meta, StoryObj } from '@storybook/react';
import { IoAddOutline } from 'react-icons/io5';

import Button from './button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
    title: 'UI/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        intent: {
            name: 'intent',
            type: 'string',
            description: 'The purpose of this button',
            control: { type: 'select' },
            options: ['default', 'cta', 'secondary']
        },
        icon: {
            description: 'A react icon component'
        }
    }
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    args: {
        intent: 'default',
        label: 'This is a button'
    }
};

export const Cta: Story = {
    args: {
        intent: 'cta',
        label: 'This is a button'
    }
};

export const Secondary: Story = {
    args: {
        intent: 'secondary',
        label: 'This is a button'
    }
};

export const Icon: Story = {
    args: {
        intent: 'default',
        label: 'This is a button',
        icon: IoAddOutline
    }
};
