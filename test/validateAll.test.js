import { validateAll } from '../src/validateAll'
import { validateString } from '../src/validateString'

const failingValidator = expected => (value, path = '') => [{ path, expected }]
const successValidator = () => []

describe('validateAll', () => {
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

  it('returns all of the nested errors', () => {
    const validate = validateAll(
      validateString,
      failingValidator('AAA'),
      failingValidator('bbb'),
    )
    expect(validate(null)).toEqual([
      { path: '', expected: 'string' },
      { path: '', expected: 'AAA' },
      { path: '', expected: 'bbb' }
    ])
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
      failingValidator('x'),
      failingValidator('y'),
    )
    expect(validate(null, 'foo')).toEqual([
      { path: 'foo', expected: 'x' },
      { path: 'foo', expected: 'y' },
    ])
  })
})
