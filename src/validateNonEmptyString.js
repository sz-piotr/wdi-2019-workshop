export const validateNonEmptyString = validateAll(
  validateString,
  validateNot('')
)
