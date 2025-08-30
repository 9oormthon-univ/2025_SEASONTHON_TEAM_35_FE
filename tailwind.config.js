export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors:{
                primary: {
                    1: "#00D6B1",
                    2: "#00E8C0", //main
                    3: "#4EEFD3",
                    4: "#98F6E6",
                },
                sub:{
                    1:"#58A9FF",
                    2:"#FF919F",
                    3:"#FFD562",
                },
                gray:{
                    5:"#E4E7EA",
                    10: "#D7DDE1",
                    20: "#C0C7CB",
                    30: "#A7AEB3",
                    40: "#91989D",
                    50: "#798086",
                    60: "#626A70",
                    70: "#4A5158",
                    80: "#373E46",
                    90: "#283038",
                    100: "#171F27",
                },
                error: '#FF0000',
                background: '#F5F7FA',
            },
            fontFamily: {
                sans: ["Pretendard Variable", "Pretendard", "system-ui", "sans-serif"],
                gmarket: ["GmarketSans", "Pretendard Variable", "sans-serif"],
            },
        },
    },
    plugins: [],
};