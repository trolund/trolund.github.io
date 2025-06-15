module.exports = {
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
