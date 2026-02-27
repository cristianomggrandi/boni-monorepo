import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from "./src/util/styling"

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: PRIMARY_COLOR,
                secondary: SECONDARY_COLOR,
                // background: "#FCF8F8",
                background: BACKGROUND_COLOR,
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
