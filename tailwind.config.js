/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F7FF',   // Very light pale blue (almost white)
          100: '#E8F0F8',  // Very light pale blue
          200: '#D1E1F1',  // Light blue
          300: '#A3C3E3',  // Medium light blue
          400: '#5B7FA8',  // Muted gray-blue/slate blue (4th strip)
          500: '#4A6FA5',  // Muted gray-blue
          600: '#2E5090',  // Medium-dark vibrant blue (3rd strip)
          700: '#1E3A5F',  // Dark navy blue (2nd strip)
          800: '#1B263B',  // Dark navy blue
          900: '#0A1929',  // Very dark navy blue (almost black - 1st strip)
        },
        sky: {
          50: '#F0F7FF',   // Very light pale blue
          100: '#E8F0F8',
          200: '#D1E1F1',
          300: '#A3C3E3',
          400: '#5B7FA8',  // Muted gray-blue
          500: '#4A6FA5',
          600: '#2E5090',  // Medium-dark vibrant blue
          700: '#1E3A5F',  // Dark navy blue
          800: '#1B263B',
          900: '#0A1929',  // Very dark navy blue
        },
        accent: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#1a1a1a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elevation-1': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'elevation-2': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'elevation-3': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
      }
    },
  },
  plugins: [],
}

