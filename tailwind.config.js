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
        mytheme: {
          'primary': '#1e293c',
          'secondary': '#7D919B',
          'accent': '#EB6B47',
          'neutral': '#23282F',
          'base-100': '#0c0c0d',
          'info': '#0092D6',
          'success': '#6CB288',
          'warning': '#DAAD58',
          'error': '#AB3D30',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
