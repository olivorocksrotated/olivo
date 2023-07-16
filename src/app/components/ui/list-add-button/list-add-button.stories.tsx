import type { Meta, StoryObj } from '@storybook/react';

import ListAddButton from './list-add-button';

const meta: Meta<typeof ListAddButton> = {
    title: 'UI/ListAddButton',
    component: ListAddButton,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'UI component for adding items to a list'
            }
        }
    },
    argTypes: {
        size: {
            name: 'size',
            type: 'string',
            description: 'The size of this button',
            control: { type: 'radio' },
            options: ['xs', 's', 'md'],
            table: {
                type: { summary: 'xs | s | md' },
                defaultValue: { summary: 'md' }
            }
        },
        label: {
            description: 'Label for the button'
        }
    }
};

export default meta;
type Story = StoryObj<typeof ListAddButton>;

export const Default: Story = {
    args: {
        label: 'This is a default ListAddButton'
    }
};

export const Md: Story = {
    args: {
        label: 'This is an Md ListAddButton',
        size: 'md'
    }
};

export const S: Story = {
    args: {
        label: 'This is an S ListAddButton',
        size: 's'
    }
};

export const Xs: Story = {
    args: {
        label: 'This is an Xs ListAddButton',
        size: 'xs'
    }
};
