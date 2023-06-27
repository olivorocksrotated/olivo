import type { Meta, StoryObj } from '@storybook/react';
import { IoOpen } from 'react-icons/io5';

import Button from '../button/button';
import Modal from './modal';
import ModalContent from './modal-content';
import ModalFooter from './modal-footer';

const meta: Meta<typeof Modal> = {
    title: 'UI/Modal',
    component: Modal,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'A window overlaid on either the primary window or another dialog window, rendering the content underneath inert'
            }
        }
    },
    argTypes: {
        openComponent: {
            control: false,
            description: 'The component that will trigger the modal',
            table: {
                type: { summary: 'ReactNode' }
            }
        },
        children: {
            control: false,
            description: 'The content of the modal',
            table: {
                type: { summary: 'ReactNode' }
            }
        },
        close: {
            control: false,
            description: 'The trigger for closing the modal. Use the "useCloseUiComponent" hook for this',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
        },
        size: {
            name: 'size',
            type: 'string',
            description: 'The size of this modal',
            control: { type: 'radio' },
            options: ['s', 'md', 'lg'],
            table: {
                type: { summary: 's | md | lg' },
                defaultValue: { summary: 'md' }
            }
        }
    }
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
    args: {
        title: 'This is a title',
        description: 'In the description we can give a more detailed overview of what is going on here',
        openComponent: <Button label="Open modal" icon={IoOpen} />,
        children: (
            <>
                <ModalContent>Although this content is pretty much free for the user of the modal to style, we recommend using the pattern in this story for structure and consistency</ModalContent>
                <ModalFooter>
                    <Button intent="secondary" label="Cancel" />
                    <Button intent="cta" label="Execute action" />
                </ModalFooter>
            </>
        )
    }
};
