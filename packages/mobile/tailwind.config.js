/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#FFC3CC",
                secondary: "#D2DB76",
                // background: "#FCF8F8",
                background: "#FFFFFF",
            },
            fontFamily: {
                sans: ["PlusJakarta"],
                jakarta: ["PlusJakarta"],
                bold: ["PlusJakarta-Bold"],
                "jakarta-bold": ["PlusJakarta-Bold"],
                semibold: ["Jakarta-SemiBold"],
                noto: ["NotoSans"],
            },
            borderRadius: {
                "4xl": "2rem",
                "5xl": "2.5rem",
                "6xl": "3rem",
            },
        },
    },
    plugins: [],
}
