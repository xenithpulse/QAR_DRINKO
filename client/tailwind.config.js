
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'bg-bl-grad': 'linear-gradient(to bottom, #0285AD, #006482, #004053)',
      },
      screens: {
        'mdd': '880px', // Custom breakpoint
      },
    },
    
  },
  variants: {
    backgroundImage: ['responsive'],
  },
  plugins: [
    
  ],
}

