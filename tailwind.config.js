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
            }
        }
    },
    plugins: []
};
