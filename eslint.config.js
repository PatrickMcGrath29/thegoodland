import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: true,
  rules: {
    'node/prefer-global/process': 'off',
  },
})
