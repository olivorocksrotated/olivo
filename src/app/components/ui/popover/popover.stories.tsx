import type { Meta, StoryObj } from '@storybook/react';
import { IoOpen } from 'react-icons/io5';

import IconButton from '../icon-button/icon-button';
import Popover from './popover';

const meta: Meta<typeof Popover> = {
    title: 'UI/Popover',
    component: Popover,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Displays rich content in a portal, triggered by a button'
            }
        }
    },
    argTypes: {
        align: {
            name: 'align',
            type: 'string',
            description: 'Where the popover positions',
            control: { type: 'radio' },
            options: ['start', 'center', 'end'],
            table: {
                type: { summary: 'start | center | end' },
                defaultValue: { summary: 'start' }
            }
        },
        openComponent: {
            control: false,
            description: 'The component that will trigger the popover',
            table: {
                type: { summary: 'ReactNode' }
            }
        },
        children: {
            control: false,
            description: 'The content of the popover',
            table: {
                type: { summary: 'ReactNode' }
            }
        },
        close: {
            control: false,
            description: 'The trigger for closing the popover. Use the "useCloseUiComponent" hook for this',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
        }
    }
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
    args: {
        openComponent: <IconButton label="Open popover" icon={IoOpen} />,
        children: (
            <ul>
                <li>Hi one</li>
                <li>Hi two</li>
            </ul>
        )
    }
};
