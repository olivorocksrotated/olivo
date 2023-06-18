import type { Meta, StoryObj } from '@storybook/react';

import Alignment from './alignment';

const meta: Meta<typeof Alignment> = {
    title: 'Compositions/Alignment',
    component: Alignment,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Check if the elements that could be next to each other fit well together'
            }
        }
    },
    argTypes: {}
};

export default meta;
type Story = StoryObj<typeof Alignment>;

export const Default: Story = {
    args: {}
};
