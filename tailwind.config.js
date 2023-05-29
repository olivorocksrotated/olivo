/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)']
            },
            dropShadow: {
                glow: [
                    '0 0px 20px rgba(255,0, 0, 0.35)',
                    '0 0px 35px rgba(255, 0,0, 0.2)'
                ]
            },
            colors: {
                neutral: {
                    50: '#f6f7f7',
                    100: '#e2e5e5',
                    200: '#c5c9ca',
                    300: '#a1a6a7',
                    400: '#7c8385',
                    500: '#62686a',
                    600: '#4d5354',
                    700: '#404345',
                    800: '#363839',
                    900: '#2f3132',
                    950: '#232526'
                }
            }
        }
    },
    plugins: []
};
