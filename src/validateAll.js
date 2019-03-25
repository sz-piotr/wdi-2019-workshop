export const validateAll = (...validators) => (value, path = '') => {
  const errors = []
  for (validate of validators) {
    errors.push(...validate(value, path))
  }
  return errors
}
