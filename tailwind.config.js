/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const rotateY = plugin(function ({addUtilities}){
  addUtilities ({
    '.RotateClass' : {
      transform: 'rotateY(180deg)'
    },
    '.rotate-y-360' : {
      transform: 'rotateY(360deg)'
    }
  })
})
module.exports = {
  content: ["./index.html","./src/**/*.{html,vue,js}"],
  theme: {
    extend: {},
  },
  plugins: [rotateY],
}

