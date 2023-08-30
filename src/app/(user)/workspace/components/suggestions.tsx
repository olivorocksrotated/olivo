import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';

import SuggestionItem from './suggestion-item';

export default (options: string[]) => ({
    items: ({ query }: any) => options
        .filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
        .slice(0, 1),
    render: () => {
        let component: any;
        let popup: any;

        return {
            onStart: (props: any) => {
                component = new ReactRenderer(SuggestionItem, {
                    props,
                    editor: props.editor
                });

                if (!props.clientRect) {
                    return;
                }

                popup = tippy('body', {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: 'manual',
                    placement: 'right-end'
                });
            },

            onUpdate(props: any) {
                component.updateProps(props);

                if (!props.clientRect) {
                    return;
                }

                popup[0].setProps({
                    getReferenceClientRect: props.clientRect
                });
            },

            onKeyDown(props: any) {
                if (props.event.key === 'Escape') {
                    popup[0].hide();

                    return true;
                }

                return component.ref?.onKeyDown(props);
            },

            onExit() {
                popup[0].destroy();
                component.destroy();
            }
        };
    }
});
