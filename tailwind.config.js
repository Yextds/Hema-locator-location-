/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./partials/**/*.hbs",
        "./templates/**/*.hbs",
        "./src/**/*.js",
        "./src/**/*.ts",
    ],
    theme: {
        container: {
            center: true,
        },
        colors: {
            'transparent': 'transparent',
            'white': '#ffffff',
            'black': '#000000',
            'red': '#da2d2a',
            'blue': '#5dc5e3',
            'orange': '#f8b840',
            'dark_orange': '#E99800',
            'green': '#9AC122',
            'light_black': '#212529',
            'light_brown': '#e5e3de',
            'dark_grey': '#495057',
            'input_border': '#ced4da'
        },

        fontFamily: {
            'lato': ['"Lato", Georgia, Arial, sans-serif']
        },
        extend: {},
    },
    plugins: [],
}