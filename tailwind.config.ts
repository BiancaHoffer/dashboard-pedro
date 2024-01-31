import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': '',
        'gradient-conic': '',
      },

    },
    screens: {
      'xl': { 'max': '1279px' },
      'min-lg': { 'min': '1024' },
      'lg': { 'max': '1024px' },
      'md': { 'max': '767px' },
      'sm': { 'max': '639px' },
    },
  },
  plugins: [],
}
export default config
