/** @type {import('tailwindcss').Config} */
module.exports = {
  // [중요] 루트 경로의 모든 html 파일과 src 폴더 내의 js 파일을 감지합니다.
  content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
        serif: ['Nanum Myeongjo', 'serif'],
      },
      colors: {
        imperial: {
          black: '#111111',
          blue: '#1c69d4', 
          darkblue: '#0653b6',
          gold: '#c5a059',
          kakao: '#FEE500'
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'bounce-slight': 'bounceSlight 2s infinite'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSlight: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: [],
}