import { validateRegex } from '../src/validateRegex'

describe('validateRegex', () => {
  it('succeeds when regex test passes', () => {
    const validate = validateRegex(/x/, 'message')
    const errors = validate('x')
    expect(errors).toEqual([])
  })

  it('fails with specified message when regex test fails', () => {
    const validate = validateRegex(/x/, 'message')
    const errors = validate('y')
    expect(errors).toEqual([
      { path: '', expected: 'message' },
    ])
  })

  it.each([
    [/1/, 1],
    [/n/, null],
    [/.*/, undefined]
  ])('fails for non-strings (%p, %p)', (regex, value) => {
    const validate = validateRegex(regex, 'message')
    const errors = validate(value)
    expect(errors).toEqual([
      { path: '', expected: 'message' },
    ])
  })

  it('respects the provided path', () => {
    const validate = validateRegex(/x/, 'message')
    const errors = validate('y', 'x.y')
    expect(errors).toEqual([
      { path: 'x.y', expected: 'message' },
    ])
  })
})
