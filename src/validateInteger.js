export const validateInteger = (value, path = '') =>
  parseInt(value) !== value
    ? [{ path, expected: 'integer' }]
    : []
