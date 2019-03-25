export const validateBetween = (min, max) => (value, path = '') =>
  value < min || value > max
    ? [{
      path,
      expected: `min: ${JSON.stringify(min)}, max: ${JSON.stringify(max)}`,
    }]
    : []
