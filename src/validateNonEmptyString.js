import { validateAll } from './validateAll'
import { validateString } from './validateString'
import { validateNot } from './validateNot'

export const validateNonEmptyString = validateAll(
  validateString,
  validateNot('')
)
