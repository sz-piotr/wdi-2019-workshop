export const validateTuple = (...validators) => (value, path = '') => {
  if (!Array.isArray(value)) {
    return [{ path, expected: 'Array' }]
  }
  if (value.length !== validators.length) {
    return [{ path, expected: `Array of length ${validators.length}` }]
  }
  const errors = []
  for (let i = 0; i < validators.length; i++) {
    errors.push(...validators[i](value[i], `${path}[${i}]`))
  }
  return errors
}
