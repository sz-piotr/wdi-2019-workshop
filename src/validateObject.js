export const validateObject = schema => (value, path = '') => {
  if (typeof value !== 'object' || value === null) {
    return [{ path, expected: 'object' }]
  }
  const errors = []
  for (const [key, validate] of Object.entries(schema)) {
    errors.push(...validate(value[key], `${path}.${key}`))
  }
  return errors
}
