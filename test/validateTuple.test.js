import { validateTuple } from '../src/validateTuple'
import { validateString } from '../src/validateString'

describe.skip('validateTuple', () => {
  it('succeds without arguments for empty arrays', () => {
    const validate = validateTuple()
    expect(validate([])).toEqual([])
  })

  it('fails when argument is not an array', () => {
    const validate = validateTuple(validateString)
    expect(validate(123)).toEqual([
      { path: '', expected: 'Array' }
    ])
  })

  it('fails when argument length does not match array length', () => {
    const validate = validateTuple(validateString, validateString)
    expect(validate(['x', 'y', 'z'])).toEqual([
      { path: '', expected: 'Array of length 2' }
    ])
  })

  it('succeeds when the validators pass for target elements', () => {
    const validate = validateTuple(validateString, validateString)
    expect(validate(['x', 'y'])).toEqual([])
  })

  it('fails when some validators fail', () => {
    const validate = validateTuple(validateString, validateString)
    expect(validate(['x', 1])).toEqual([
      { path: '[1]', expected: 'string' }
    ])
  })

  it('returns all errors from nested validators', () => {
    const validate = validateTuple(validateString, validateString)
    expect(validate([null, 1])).toEqual([
      { path: '[0]', expected: 'string' },
      { path: '[1]', expected: 'string' }
    ])
  })

  it('can be nested', () => {
    const validate = validateTuple(validateString, validateTuple(validateString))
    expect(validate([null, [1]])).toEqual([
      { path: '[0]', expected: 'string' },
      { path: '[1][0]', expected: 'string' }
    ])
  })

  it('respects the provided path', () => {
    const validate = validateTuple(validateString)
    expect(validate([null], 'x.y')).toEqual([
      { path: 'x.y[0]', expected: 'string' }
    ])
  })
})
