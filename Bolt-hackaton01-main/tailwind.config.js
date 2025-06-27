/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',          // เปิดใช้ธีมมืด
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      /* ---------- ฟอนต์ ---------- */
      fontFamily: {
        pacifico: ['Pacifico', 'cursive'],
        sarabun:  ['Sarabun',  'sans-serif'],
        cookie:   ['Cookie',   'cursive'],
        prompt:   ['Prompt',   'sans-serif'],
        mali:     ['Mali',     'sans-serif'],
        anuphan:  ['Anuphan',  'sans-serif'],
      },

      /* ---------- Animation ---------- */
      keyframes: {
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)'    },
          '30%':      { transform: 'translateY(-6px)' },
          '60%':      { transform: 'translateY(3px)'  },
        },
      },
      animation: {
        'bounce-soft': 'bounceSoft 0.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};