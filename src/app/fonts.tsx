'use client';

import { Inter } from 'next/font/google';
import { useServerInsertedHTML } from 'next/navigation';

export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    fallback: ['system-ui', 'Helvetica Neue', 'Helvetica', 'Arial'],
    display: 'swap'
});

// This is a workaround for the font flickering in the app directory
// https://makerkit.dev/snippets/next13-rsc-fonts
export default function Fonts() {
    useServerInsertedHTML(() => (
        <style
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: `
            :root {
              --font-inter: '-apple-system', 'BlinkMacSystemFont',
                ${inter.style.fontFamily}, 'system-ui', 'Segoe UI', 'Roboto',
                'Ubuntu', 'sans-serif';
            }
          `
            }}
        />
    ));

    return null;
}
