export const validateNot = item => (value, path = '') =>
  value === item
    ? [{ path, expected: `not ${JSON.stringify(item)}` }]
    : []
