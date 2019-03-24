import { validateString } from '../src/validateString'

describe('validateString', () => {
  it('succeds for strings', () => {
    expect(validateString('Hello World!')).toEqual([])
  })

  it.each([
    [1],
    [true],
    [{ x: 1, y: 2 }],
    [[1, 'foo']],
  ])('fails for %s', (value) => {
    expect(validateString(value)).toEqual([
      { path: '', expected: 'string' }
    ])
  })

  it('respects the provided path', () => {
    expect(validateString(0, 'x.y')).toEqual([
      { path: 'x.y', expected: 'string' }
    ])
  })
})
