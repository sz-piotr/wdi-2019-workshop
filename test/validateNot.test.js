import { validateNot } from '../src/validateNot'

describe.skip('validateNot', () => {
  it.each([
    [1, 2],
    [true, false],
    [{}, {}],
    ['foo', Infinity]
  ])('succeds for %p and %p', (a, b) => {
    const validate = validateNot(a)
    expect(validate(b)).toEqual([])
  })

  const bar = { baz: 'foo' }
  it.each([
    1, true, bar, 'foo',
  ])('fails for %p and itself', (x) => {
    const validate = validateNot(x)
    expect(validate(x)).toEqual([
      { path: '', expected: `not ${JSON.stringify(x)}` }
    ])
  })

  it('respects the provided path', () => {
    const validate = validateNot(0)
    expect(validate(0, 'x.y')).toEqual([
      { path: 'x.y', expected: 'not 0' }
    ])
  })
})
