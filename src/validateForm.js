// import { validateObject } from './validateObject'
// import { validateNonEmptyString } from './validateNonEmptyString'
// import { validateRegex } from './validateRegex'
// import { validateTuple } from './validateTuple'
// import { validateIntBetween } from './validateIntBetween'

// export const validateForm = validateObject({
//   name: validateNonEmptyString,
//   email: validateRegex(/^.+@.+$/, 'email address'),
//   creditCard: validateObject({
//     number: validateRegex(/^\d{4} \d{4} \d{4} \d{4}$/, 'credit card number'),
//     expires: validateTuple(
//       validateIntBetween(1, 12),
//       validateIntBetween(0, 99)
//     ),
//     cvc: validateRegex(/^\d{3}$/, 'three digit cvc code')
//   })
// })
