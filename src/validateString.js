export const validateString = (value, path = '') =>
  typeof value !== 'string'
    ? [{ path, expected: 'string' }]
    : []
