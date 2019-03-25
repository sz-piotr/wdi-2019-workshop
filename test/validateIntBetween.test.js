import { validateIntBetween } from '../src/validateIntBetween'

describe.skip('validateIntBetween', () => {
  it.each([
    [1, 0, 2],
    [1, 1, 1],
    [1, 1, 3],
    [3, 1, 3],
  ])('succeds for %p between %p and %p', (x, min, max) => {
    const validate = validateIntBetween(min, max)
    expect(validate(x)).toEqual([])
  })

  it.each([
    [null, 1, 0, 'integer'],
    [false, 1, 0, 'integer'],
    [0.5, 1, 0, 'integer'],
    [2, 0, 1, 'min: 0, max: 1'],
    [2, 0, 1, 'min: 0, max: 1'],
    [-1, 0, 1, 'min: 0, max: 1'],
  ])('fails for %p between %p and %p', (x, min, max, expected) => {
    const validate = validateIntBetween(min, max)
    expect(validate(x)).toEqual([
      { path: '', expected }
    ])
  })

  it('respects the provided path for non-integers', () => {
    const validate = validateIntBetween(0, 1)
    expect(validate(0.5, 'x.y')).toEqual([
      { path: 'x.y', expected: 'integer' }
    ])
  })

  it('respects the provided path for integers out of bound', () => {
    const validate = validateIntBetween(0, 1)
    expect(validate(2, 'x.y')).toEqual([
      { path: 'x.y', expected: 'min: 0, max: 1' }
    ])
  })
})
