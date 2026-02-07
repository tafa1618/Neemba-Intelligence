/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                caterpillar: {
                    yellow: '#FFCD11',  // Official CAT Yellow (Neemba)
                    black: '#000000',    // Pure black CAT brand
                    orange: '#FF6B00',   // Accent orange
                },
            },
        },
    },
    plugins: [],
}
