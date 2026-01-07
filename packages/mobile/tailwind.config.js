/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#FFC3CC",
                secondary: "#D2DB76",
            },
            fontFamily: {
                sans: ["PlusJakarta"],
                jakarta: ["PlusJakarta"],
                bold: ["PlusJakarta-Bold"],
                semibold: ["Jakarta-SemiBold"],
                noto: ["NotoSans"],
            },
        },
    },
    plugins: [],
}
