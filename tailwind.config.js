/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        srfv: {
          primary: '#f12421',
          'primary-hover': '#ff5a58',
          'bg-dark': '#27292a',
          'bg-darker': '#1f2122',
          'bg-darkest': '#191a1b',
          border: '#333',
          'border-light': '#444',
          text: '#fff',
          'text-secondary': '#ccc',
          'text-muted': '#aaa',
          'text-dim': '#888',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'srfv': '23px',
        'srfv-sm': '16px',
      },
    },
  },
  plugins: [],
};
