import { validateObject } from '../src/validateObject'
import { validateString } from '../src/validateString'

describe('validateObject', () => {
  it.each([
    1, 'foo', false, null, undefined
  ])('fails for %s', (value) => {
    const validate = validateObject({})
    expect(validate(value)).toEqual([
      { path: '', expected: 'object' }
    ])
  })

  it('succeeds when object matches schema', () => {
    const validate = validateObject({
      x: validateString
    })
    expect(validate({ x: '' })).toEqual([])
  })

  it('fails if any of the nested validators fail', () => {
    const validate = validateObject({
      x: validateString,
      y: validateString
    })
    expect(validate({ x: '', y: 1 })).toEqual([
      { path: '.y', expected: 'string' }
    ])
  })

  it('returns all of the nested errors', () => {
    const validate = validateObject({
      x: validateString,
      y: validateString
    })
    expect(validate({ y: 1 })).toEqual([
      { path: '.x', expected: 'string' },
      { path: '.y', expected: 'string' }
    ])
  })

  it('can be nested within itself', () => {
    const validate = validateObject({
      x: validateObject({
        y: validateString
      })
    })
    expect(validate({ x: { y: 1 } })).toEqual([
      { path: '.x.y', expected: 'string' }
    ])
  })

  it('respects the provided path', () => {
    const validate = validateObject({
      x: validateString
    })
    expect(validate({}, 'foo')).toEqual([
      { path: 'foo.x', expected: 'string' }
    ])
  })
})
