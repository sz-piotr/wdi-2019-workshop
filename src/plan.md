Plan workshopu
==============

Wykład - wstęp
--------------

### Programowanie funkcyjne a imperatywne.

```javascript
// IMPERATYWNIE
const input = [1, 2, 3, 4]
const output = []
for (let i = 0; i < input.length; i++) {
  if (input[i] % 2 === 0) {
    output.push(input[i])
  }
}
// output = [2, 4]
```

```javascript
// FUNKCYJNIE
const input = [1, 2, 3, 4]
const isEven = x => x % 2 === 0
const output = input.filter(isEven)
// output = [2, 4]
```

Zalety
1. Mniej kodu
2. Bardziej czytelny - mówimy co, ale nie jak
3. Łatwiej testować - brak mutacji

### Podstawowy element - funkcje

```javascript
// isEven :: number -> boolean
const isEven = x => x % 2 === 0
```

Funkcje przyporządkowują jedne dane drugim. W programowaniu
funkcyjnym dane nigdy nie są jednak modyfikowane, a dodatkowo,
podanie tych samych danych wejściowych będzie skutkować takimi
samymi danymi wyjściowymi.

### Funkcje wyższego rzędu

#### Zwracające funkcje

```javascript
// isAbove :: number -> number -> boolean
const isAbove = target => value => value > target
// ^ currying, isAbove = (target, value) => value > target

// isAbove3 :: number -> boolean
const isAbove3 = isAbove(3)
// ^ partial application

isAbove3(7) // true
isAbove(5)(1) // false
```

#### Przyjmujące funkcje

```javascript
// not :: (T -> boolean) -> T -> boolean
const not = fn => value => !fn(value)

// isEven :: number -> boolean
const isEven = x => x % 2 === 0

// isOdd :: number -> boolean
const isOdd = not(isEven)
```

### Podstawowe manipulacje danych

#### Typy danych

```typescript
// List<T> :: [T, List<T>] | null
const numberList = [1, [2, [3, null]]]

// Optional<T> :: T | null
const optionalNumberA = 1
const optionalNumberB = null
```

#### Map

```javascript
// mapList :: (T -> U) -> List<T> -> List<U>
const mapList = fn => list => list !== null
  ? [fn(list[0]), mapList(fn)(list[1])]
  : null

mapList(x => x + 1)([1, [2, null]]) // [2, [3, null]]

// mapOptional :: (T -> U) -> Optional<T> -> Optional<U>
const mapOptional = fn => optional => optional !== null
  ? fn(optional)
  : null

mapOptional(x => x + 1)(null) // null
mapOptional(x => x + 1)(2) // 3
```

#### Filter

```javascript
// filterList :: (T -> boolean) -> List<T> -> List<T>
const filterList = fn => list => {
  if (list === null) {
    return null
  } else if (fn(list[0])) {
    return [list[0], filterList(fn)(list[1])]
  } else {
    return filterList(fn)(list[1])
  }
}

filterList(x => x !== 1)([1, [2, null]]) // [2, null]

// filterOptional :: (T -> boolean) -> Optional<T> -> Optional<T>
const filterOptional = fn => optional => {
  if (optional === null) {
    return null
  } else if (fn(optional)) {
    return optional
  } else {
    return null
  }
}

filterOptional(x => x !== 1)(1) // null
filterOptional(x => x !== 1)(2) // 2
filterOptional(x => x !== 1)(null) // null
```

### Przykład życiowy

```javascript
const employees = [
  { name: 'John', salary: 2000 },
  { name: 'Suzan', salary: 7000 },
  { name: 'Amy', salary: 1500 },
  { name: 'Peter', salary: 4200 },
]

// pipe :: ((A -> B), (B -> C)) -> A -> C
const pipe = (f, g) => value => g(f(value))

// pluck :: P -> { [P]: T } -> T
const pluck = prop => object => object[prop]

// isAbove :: number -> number -> boolean
const isAbove = target => value => value > target

const richGuys = employees
  .filter(pipe(
    pluck('salary'),
    isAbove(3000)
  ))
  .map(pluck('name'))

console.log(richGuys) // [Suzan, Peter]
```

### To samo w Ramdzie

```javascript
R.whatever ...
```

Wykład - walidacja danych
-------------------------

### Model danych

```javascript
const formData = {
  name: 'John Doe',
  email: 'john.doe@mail.com',
  creditCard: {
    number: '1234 5678 9012 3456',
    expires: [01, 23],
    cvc: '123'
  }
}
```

### Walidacja imperatywna

```javascript
const EMAIL_REGEX = /.+@.+/
const CREDIT_CARD_REGEX = /\d{4} \d{4} \d{4} \d{4}/
const CVC_REGEX = /\d{3}/

function validateForm (data) {
  const errors = []

  if (data.name === '' && typeof data.name !== 'string') {
    errors.push({ path: 'data.name', expected: 'non-empty string' })
  }

  if (data.email === '' && typeof data.email !== 'string') {
    errors.push({ path: 'data.email', expected: 'non-empty string' })
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.push({ path: 'data.email', expected: 'valid email address' })
  }

  if (typeof data.creditCard !== 'object') {
    errors.push({ path: 'data.creditCard', expected: 'object' })
  } else {

    if (data.creditCard.number === '' && typeof data.creditCard.number !== 'string') {
      errors.push({ path: 'data.creditCard.number', expected: 'non-empty string' })
    } else if (!CREDIT_CARD_REGEX.test(data.creditCard.number)) {
      errors.push({ path: 'data.creditCard.number', expected: 'valid credit card number' })
    }

    if (!Array.isArray(data.creditCard.expires)) {
      errors.push({ path: 'data.creditCard.expires', expected: 'array' })
    } else {

      // TODO: finish

    }

    if (data.creditCard.cvc === '' && typeof data.creditCard.cvc !== 'string') {
      errors.push({ path: 'data.creditCard.cvc', expected: 'non-empty string' })
    } else if (!CVC_REGEX.test(data.creditCard.cvc)) {
      errors.push({ path: 'data.creditCard.cvc', expected: 'three digit cvc code' })
    }

  }

  return errors
}
```

### Walidacja funkcyjna

```javascript
const validateForm = validateObject({
  name: validateNonEmptyString,
  email: validateRegex(/.+@.+/, 'valid email address'),
  creditCard: validateObject({
    number: validateRegex(/\d{4} \d{4} \d{4} \d{4}/, 'valid credit card number'),
    expires: validateTuple(
      validateIntBetween(0, 12),
      validateIntBetween(0, 99)
    ),
    cvc: validateRegex(/\d{3}/, 'three digit cvc code')
  })
})
```

Zadania
-------

1. (*) `validateString`

```javascript
const validateString = (value, path = '') =>
  typeof value !== 'string'
    ? [{ path, expected: 'string' }]
    : []
```

1. (*) `validateNot`

```javascript
const validateNot = item => (value, path = '') =>
  value === item
    ? [{ path, expected: `not ${JSON.stringify(item)}` }]
    : []
```

1. (*) `validateObject`

```javascript
const validateObject = schema => (value, path = '') => {
  if (typeof value !== object) {
    return [{ path, expected: 'object' }]
  }
  const errors = []
  for (const [key, validate] of Object.entries(schema)) {
    errors.push(...validate(value[key], `${path}.${key}`))
  }
  return errors
}
```

1. `validateAll`

```javascript
const validateAll = (...validators) => (value, path = '') => {
  const errors = []
  for (validate of validators) {
    errors.push(...validate(value, path))
  }
  return errors
}
```

1. `validateNonEmptyString`

```javascript
const validateNonEmptyString = validateAll(
  validateString,
  validateNot('')
)
```

1. `validateRegex`
1. `validateInteger`
1. `validateBetween`
1. `validateIntBetween`

```javascript
const validateIntBetween = (a, b) =>
  validateAll(
    validateInteger,
    validateBetween(a, b)
  )
```

1. `validateTuple`
1. `validateForm`
