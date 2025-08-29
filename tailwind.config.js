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
        gray:{
          0:"#FFFFFF",
          10: "#F6F6F6",
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
      },
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", "system-ui", "sans-serif"],
        gmarket: ["GmarketSans", "Pretendard Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
};
