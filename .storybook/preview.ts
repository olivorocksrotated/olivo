import type { Preview } from '@storybook/react';
import '../src/app/globals.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        backgrounds: {
            default: 'dark',
            values: [
                {
                    name: 'dark',
                    value: '#17191a'
                }
            ]
        }
    }
};

export default preview;
