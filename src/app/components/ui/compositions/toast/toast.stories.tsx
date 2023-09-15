import 'react-toastify/dist/ReactToastify.min.css';

import type { Meta, StoryObj } from '@storybook/react';

import Toast from './toast';

const meta: Meta<typeof Toast> = {
    title: 'Compositions/Toast',
    component: Toast,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'UI component for in-app notifications'
            }
        }
    },
    argTypes: {}
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
    args: {}
};
