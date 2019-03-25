import { validateNonEmptyString } from '../src/validateNonEmptyString'

describe.skip('validateNonEmptyString', () => {
  it('succeds for strings', () => {
    expect(validateNonEmptyString('Hello World!')).toEqual([])
  })

  it('fails for empty strings', () => {
    expect(validateNonEmptyString('')).toEqual([
      { path: '', expected: 'not ""' }
    ])
  })

  it.each([
    1,
    true,
    { x: 1, y: 2 },
    [1, 'foo'],
  ])('fails for %s', (value) => {
    expect(validateNonEmptyString(value)).toEqual([
      { path: '', expected: 'string' }
    ])
  })

  it('respects the provided path', () => {
    expect(validateNonEmptyString(0, 'x.y')).toEqual([
      { path: 'x.y', expected: 'string' }
    ])
  })
})
