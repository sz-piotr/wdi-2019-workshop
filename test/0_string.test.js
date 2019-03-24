import { enabled, isString } from '../src/0_string'

if (enabled)
describe('isString', () => {
  it('returns true when argument is an empty string', () => {
    expect(isString('')).toEqual(true)
  })

  it('returns true when argument is a non-empty string', () => {
    expect(isString('Hello World!')).toEqual(true)
  })

  it.each([
    [1],
    [true],

  ])('returns false when argument is %s', (value) => {
    expect(isString(value)).toEqual(false)
  })
})

const validateUser = validateObject({
  name: validateString,
  papa: validateObject({
    name: validateString
  })
})

validateUser({}, 'user') -> [
  { path: 'user.name', expected: 'string' },
  { path: 'user.papa.name', expected: 'string' },
]
