module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {

       skin:{
        bg:'var(--color-bg)',
        text:'var(--color-text)',
       }
      }
    },
  },
  plugins: [],
};
