import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    semi: ['error', 'never'],
  },
  typescript: true,
})
