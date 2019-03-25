export const validateIntBetween = (a, b) =>
  validateAll(
    validateInteger,
    validateBetween(a, b)
  )
