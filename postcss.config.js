module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 1,
      features: {
        'is-pseudo-class': false, // <— disable this plugin specifically
      },
    },
    tailwindcss: {},
    autoprefixer: {},
  },
};
