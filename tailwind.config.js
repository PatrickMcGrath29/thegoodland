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
    themes: ['dark', 'light'],
  },
  plugins: [require('daisyui')],
}
