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
        },
    },
    plugins: [],
};
