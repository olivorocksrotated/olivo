import type { Meta, StoryObj } from '@storybook/react';

import TextLink from './text-link';

const meta: Meta<typeof TextLink> = {
    title: 'UI/TextLink',
    component: TextLink,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'UI component for URL navigation'
            }
        }
    },
    argTypes: {
        children: {
            control: false,
            description: 'The content of the link',
            table: {
                type: { summary: 'ReactNode' }
            }
        }
    }
};

export default meta;
type Story = StoryObj<typeof TextLink>;

export const Default: Story = {
    args: {
        href: 'www.google.com',
        children: <div>Link to google</div>
    }
};
