import type { Meta, StoryObj } from '@storybook/react';

import Select from './select';

const meta: Meta<typeof Select> = {
    title: 'UI/Select',
    component: Select,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'UI component to displays a list of options'
            }
        }
    },
    argTypes: {
        w: {
            name: 'w',
            type: 'string',
            description: 'How much should the select extend in width',
            control: { type: 'radio' },
            options: ['xs', 's', 'md', 'full'],
            table: {
                type: { summary: 'xs | s | md | full' },
                defaultValue: { summary: 'full' }
            }
        }
    }
};

export default meta;
type Story = StoryObj<typeof Select>;

const itemGroups = [
    {
        label: 'Group 1',
        items: [{ label: 'Item 1', value: '1' }, { label: 'Item 2', value: '2' }]
    },
    {
        label: 'Group 2',
        items: [{ label: 'Item 3', value: '3' }, { label: 'Item 4', value: '4' }]
    },
    {
        label: 'Group 3',
        items: [{ label: 'Item 5', value: '5' }]
    }
];

export const Default: Story = {
    args: {
        placeholder: 'Select an item',
        label: 'Item selection',
        itemGroups
    }
};
