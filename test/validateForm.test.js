import { validateForm } from '../src/validateForm'

describe('validateForm', () => {
  it('succeeds for valid form data', () => {
    expect(validateForm({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      creditCard: {
        number: '1234 5678 9012 3456',
        expires: [1, 23],
        cvc: '123'
      }
    })).toEqual([])
  })

  it('fails for invalid form data', () => {
    expect(validateForm({
      name: null,
      email: 123,
      creditCard: {
        expires: [-1, '23'],
        cvc: '1233'
      }
    }, 'data')).toEqual([
      { path: 'data.name', expected: 'string' },
      { path: 'data.email', expected: 'email address' },
      { path: 'data.creditCard.number', expected: 'credit card number' },
      { path: 'data.creditCard.expires[0]', expected: 'min: 1, max: 12' },
      { path: 'data.creditCard.expires[1]', expected: 'integer' },
      { path: 'data.creditCard.cvc', expected: 'three digit cvc code' },
    ])
  })
})
