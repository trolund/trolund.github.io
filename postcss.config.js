/** @type {import('postcss').ProcessOptions} */
const config = {
  plugins: {
    'postcss-preset-env': {
      stage: 1,
      features: {
        'is-pseudo-class': false,
      },
    },
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
