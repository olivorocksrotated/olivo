import { Node } from '@tiptap/core';
import { mergeAttributes, nodeInputRule, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import React from 'react';
import { TbMoodCheck } from 'react-icons/tb';

import Button from '@/app/components/ui/button/button';

type ButtonExtensionComponentProps = { node: { attrs: { label: string, icon: () => JSX.Element } } };

function ButtonComponent({ node: { attrs: { label, icon } } }: ButtonExtensionComponentProps) {
    return (
        <NodeViewWrapper>
            <Button label={label} intent="cta" icon={icon}></Button>
        </NodeViewWrapper>
    );
}

export default Node.create({
    name: 'button',
    group: 'block',
    atom: true,
    parseHTML() {
        return [
            {
                tag: 'button'
            }
        ];
    },
    addAttributes() {
        return {
            label: {
                default: null
            },
            icon: {
                default: null
            }
        };
    },
    renderHTML({ HTMLAttributes }) {
        return ['button', mergeAttributes(HTMLAttributes)];
    },
    addNodeView() {
        return ReactNodeViewRenderer(ButtonComponent);
    },
    addInputRules() {
        return [nodeInputRule({
            find: new RegExp('^action-mood$'),
            type: this.type,
            getAttributes: {
                label: 'How are you feeling today?',
                icon: () => <TbMoodCheck />
            }
        })];
    }
});
