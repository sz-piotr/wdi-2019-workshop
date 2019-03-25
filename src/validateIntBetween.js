import { validateAll } from './validateAll'
import { validateInteger } from './validateInteger'
import { validateBetween } from './validateBetween'

export const validateIntBetween = (a, b) =>
  validateAll(
    validateInteger,
    validateBetween(a, b),
  )
