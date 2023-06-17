import type { Meta, StoryObj } from '@storybook/react';

import PageTitle from './page-title';

const meta: Meta<typeof PageTitle> = {
    title: 'UI/PageTitle',
    component: PageTitle,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Loading indicator'
            }
        }
    }
};

export default meta;
type Story = StoryObj<typeof PageTitle>;

export const Default: Story = {
    args: {
        text: 'The title of this page'
    }
};
