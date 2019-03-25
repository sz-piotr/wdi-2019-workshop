export const validateAll = (...validators) => (value, path = '') => {
  for (const validate of validators) {
    const errors = validate(value, path)
    if (errors.length > 0) {
      return errors
    }
  }
  return []
}
