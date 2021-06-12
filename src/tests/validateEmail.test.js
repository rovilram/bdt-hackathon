const validateEmail = require('../utils/validateEmail');

test('email is valid email', () => {
  const validEmail = validateEmail('test@test.es');
  expect(validEmail).toBe(true);
});

test('email is not valid email', () => {
  const validEmail = validateEmail('testtest.es');
  expect(validEmail).toBe(false);
});

test('empty string is not valid email', () => {
  const validEmail = validateEmail('');
  expect(validEmail).toBe(false);
});

test('undefined is not valid email', () => {
  const validEmail = validateEmail();
  expect(validEmail).toBe(false);
});

