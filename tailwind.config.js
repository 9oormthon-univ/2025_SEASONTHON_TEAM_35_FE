export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        primary: {
          1: "#00BA9B",
          2: "#00D6B3", //main
          3: "#4DE2CA",
          4: "#99EFE1",
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
      boxShadow: {
        // Primary/02(Main) 색상에 10% 투명도를 적용한 그림자
        'primary-focus-light': '0 0 0 3px rgba(var(--primary-rgb-2), 0.1)', // Primary/02의 RGB 값 필요
      },
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", "system-ui", "sans-serif"],
        gmarket: ["GmarketSans", "Pretendard Variable", "sans-serif"],
        'sans-password': ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],

      },
    },
  },
  plugins: [],
};
