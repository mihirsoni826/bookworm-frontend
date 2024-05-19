/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "cool-mist": "#93B4BC",
                "midnight-indigo": "#454664",
                "icy-whisper": "#E9EDF6",
                b1: "#679CF6",
                b2: "#4072EE",
            },
            fontFamily: {
                sans: [
                    '"Lato"',
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto",
                    '"Helvetica Neue"',
                    "Arial",
                    '"Noto Sans"',
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
