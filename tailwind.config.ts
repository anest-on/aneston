import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /grid-cols-./,
    },
  ],
  theme: {
    fontFamily: {
      sans: 'var(--font-roboto)',
      jetBrainsMono: 'var(--font-jetBrainsMono)',
    },
    colors: {
      'green-500': '#00B37E',
      'green-600': '#00875F',

      'red-500': '#EF4444',

      white: '#FFFFFF',

      'gray-50': '#F9FAFB',
      'gray-100': '#E1E1E6',
      'gray-200': '#A9A9B2',
      'gray-300': '#9CA3AF',
      'gray-400': '#7C7C8A',
      'gray-500': '#6B7280',
      'gray-600': '#323238',
      'gray-800': '#202024',
      'gray-900': '#121214',
    },
  },
  plugins: [],
}
export default config
