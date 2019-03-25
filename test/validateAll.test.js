import { validateAll } from '../src/validateAll'
import { validateString } from '../src/validateString'

const failingValidator = expected => (value, path = '') => [{ path, expected }]
const successValidator = () => []

describe.skip('validateAll', () => {
  it('succeeds when given 0 validators', () => {
    const validate = validateAll()
    expect(validate(null)).toEqual([])
  })

  it('succeeds when given a single passing validator', () => {
    const validate = validateAll(validateString)
    expect(validate('')).toEqual([])
  })

  it('succeeds when all nested validators succeed', () => {
    const validate = validateAll(
      validateString,
      successValidator,
      successValidator,
    )
    expect(validate('')).toEqual([])
  })

  it('fails if any of the nested validators fail', () => {
    const validate = validateAll(
      successValidator,
      failingValidator('FAIL'),
    )
    expect(validate(null)).toEqual([
      { path: '', expected: 'FAIL' }
    ])
  })

  it('returns only the first the errors', () => {
    const errors = [
      { path: 'a', expected: 'x' },
      { path: 'b', expected: 'y' },
    ]
    const validate = validateAll(
      () => errors,
      failingValidator('bbb'),
    )
    expect(validate(null)).toEqual(errors)
  })

  it('can be nested within itself', () => {
    const validate = validateAll(
      validateAll(
        validateAll(
          failingValidator('AAA'),
        ),
      ),
    )
    expect(validate(null)).toEqual([
      { path: '', expected: 'AAA' }
    ])
  })

  it('respects the provided path', () => {
    const validate = validateAll(
      successValidator,
      failingValidator('x'),
    )
    expect(validate(null, 'foo')).toEqual([
      { path: 'foo', expected: 'x' },
    ])
  })
})
