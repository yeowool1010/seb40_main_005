const { RecoilBridge } = require('recoil');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        SCDream1 : ["SCDream1"],
        SCDream2 : ["SCDream2"],
        SCDream3 : ["SCDream3"],
        SCDream4 : ["SCDream4"],
        SCDream5 : ["SCDream5"],
        SCDream6 : ["SCDream6"],
        SCDream7 : ["SCDream7"],
        SCDream8 : ["SCDream8"],
        SCDream9 : ["SCDream9"]
      },
      colors:{
        "topbtn": "rgb(5,5,5, 0.37)",
        "lightOrange" : "rgb(235 ,130 ,83 ,0.3)",
        "orange" : "#EB8253",
      },
      screens: {
        'md': '376px'
      }
    },
  },
  plugins: [],
}