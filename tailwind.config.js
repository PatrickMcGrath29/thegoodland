module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './pages/**/*.vue',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes').dark,
          accent: '#ffbf00',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
