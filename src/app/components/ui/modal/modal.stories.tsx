import type { Meta, StoryObj } from '@storybook/react';
import { IoOpen } from 'react-icons/io5';

import Button from '../button/button';
import Modal from './modal';
import styles from './modal.module.css';

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
        children: {
            control: false
        },
        openComponent: {
            control: false
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
                <div className={styles['modal-content']}>Although this content is pretty much free for the user of the modal to style, we recommend using the pattern in this story for structure and consistency</div>
                <div className={styles['modal-actions']}>
                    <Button intent="secondary" label="Cancel" />
                    <Button intent="cta" label="Execute action" />
                </div>
            </>
        )
    }
};
