import type { Config } from 'tailwindcss'

const config: Config = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/@sw-npm-packages/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
        octarine: ['Octarine-Bold', 'sans-serif']
      },
      fontSize: {
        xs: ['0.75em', 'normal'],
        sm: ['0.875em', 'normal'],
        base: ['16px', 'normal'],
        lg: ['1.125em', 'normal'], //18px
        xl: ['1.25em', 'normal'], //20px
        xxl: ['1.375em', '1.5em'], // 22px
        '2xl': ['1.5em', '1.5em'], // 24px
        '2xxl': ['1.625em', '1.5em'], // 26px
        '2xxxl': ['1.75em', '1.5em'], // 28px
        '3xl': ['1.875em', '1.5em'],
        '3xxl': ['2.25em', '1.5em'], // 36px
        '4xl': ['2.5em', '1.5em'],
        '5xl': ['2.75em', '1.5em']
      },
      colors: {
        crayola: 'var(--crayola)',
        white: 'var(--white)',
        'off-white': 'var(--off-white)',
        black: 'var(--black)',
        'light-black': 'var(--light-black)',
        'dark-gray': 'var(--dark-gray)',
        'dark-gray-5E': 'var(--dark-gray-5E)',
        'semi-gray': 'var(--semi-gray)',
        'light-gray': 'var(--light-gray)',
        'light-gray-2': 'var(--light-gray-2)',
        pink: 'var(--pink)',
        'light-pink': 'var(--light-pink)',
        'primary-pink': 'var(--primary-pink)',
        'primary-yellow': 'var(--primary-yellow)',
        gold: 'var(--gold)',
        red: 'var(--red)',
        'red-2': 'var(--red-2)',
        azure: 'var(--azure)',
        'success-green': 'var(--success-green)',
        'wa-green': 'var(--wa-green)'
      },
      boxShadow: {
        md: '0 1px 8px 0 rgba(196, 196, 196, 0.50)',
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
      },
      backgroundImage: {
        hero: "url('assets/images/collection-background.svg')",
        card: "url('assets/images/thumbnail-background.svg')"
      },
      screens: {
        wide: '1440px',
        xs: '376px'
      },
      animation: {
        'collapse-in': 'max-h-[9999px] ease-out duration-300',
        'collapse-out': 'max-h-[0] ease-in duration-300',
        'zoom-in': 'zoom-in 1s ease-in-out',
        'zoom-out': 'zoom-out 1s ease-in-out'
      },
      keyframes: {
        'zoom-in': {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' }
        },
        'zoom-out': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' }
        }
      }
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      // }
    }
  },
  plugins: []
}
export default config
