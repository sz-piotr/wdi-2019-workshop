import { validateBetween } from '../src/validateBetween'

describe.skip('validateBetween', () => {
  it.each([
    [0, -Infinity, Infinity],
    [3.14, 3, 4],
    [1, 1, 1],
    [1, 1, 3],
    [3, 1, 3],
    ['b', 'a', 'c'],
    ['abc', 'ab', 'abd'],
  ])('succeds for %p between %p and %p', (x, min, max) => {
    const validate = validateBetween(min, max)
    expect(validate(x)).toEqual([])
  })

  it.each([
    [0.5, 1, 0, 'min: 1, max: 0'],
    [2, 0, 1, 'min: 0, max: 1'],
    [-1, 0, 1, 'min: 0, max: 1'],
    ['d', 'a', 'b', 'min: "a", max: "b"'],
    ['b', 'c', 'a', 'min: "c", max: "a"'],
  ])('fails for %p between %p and %p', (x, min, max, expected) => {
    const validate = validateBetween(min, max)
    expect(validate(x)).toEqual([
      { path: '', expected}
    ])
  })

  it('respects the provided path', () => {
    const validate = validateBetween(0, 1)
    expect(validate(1.1, 'x.y')).toEqual([
      { path: 'x.y', expected: 'min: 0, max: 1' }
    ])
  })
})
