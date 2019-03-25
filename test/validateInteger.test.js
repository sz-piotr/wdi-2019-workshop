import { validateInteger } from '../src/validateInteger'

describe('validateInteger', () => {
  it.each([
    0, -1, 1, 2, 3, -1996, 2019
  ])('succeds for %d', (x) => {
    expect(validateInteger(x)).toEqual([])
  })

  it.each([
    0.1, -0.1, Infinity, NaN, true, null, '', {}
  ])('fails for %p', (x) => {
    expect(validateInteger(x)).toEqual([
      { path: '', expected: 'integer' }
    ])
  })

  it('respects the provided path', () => {
    expect(validateInteger(0.5, 'x.y')).toEqual([
      { path: 'x.y', expected: 'integer' }
    ])
  })
})
