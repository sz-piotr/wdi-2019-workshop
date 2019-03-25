export const validateRegex = (regex, expected) => (value, path = '') =>
  !regex.test(value) || typeof value !== 'string'
    ? [{ path, expected }]
    : []

