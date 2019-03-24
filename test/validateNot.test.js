import { validateNot } from '../src/validateNot'

describe('validateString', () => {
  it.each([
    [1, 2],
    [true, false],
    [{}, {}],
    ['foo', Infinity]
  ])('succeds for %s and %s', (a, b) => {
    const validate = validateNot(a)
    expect(validate(b)).toEqual([])
  })

  const bar = { baz: 'foo' }
  it.each([
    [1, 1],
    [true, true],
    [bar, bar],
    ['foo', 'foo']
  ])('fails for %s and %s', (a, b) => {
    const validate = validateNot(a)
    expect(validate(b)).toEqual([
      { path: '', expected: `not ${JSON.stringify(b)}` }
    ])
  })

  it('respects the provided path', () => {
    const validate = validateNot(0)
    expect(validate(0, 'x.y')).toEqual([
      { path: 'x.y', expected: 'not 0' }
    ])
  })
})
