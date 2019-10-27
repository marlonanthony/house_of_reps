import isEmpty from '../is-empty'
import '@testing-library/jest-dom/extend-expect'

test('should output truthy', () => {
  const emptyObject = isEmpty({}),
    emptyArray = isEmpty([]),
    emptyString = isEmpty(''),
    undefinedify = isEmpty(undefined),
    nullify = isEmpty(null)

  expect(emptyObject).toBeTruthy()
  expect(emptyArray).toBeTruthy()
  expect(emptyString).toBeTruthy()
  expect(undefinedify).toBeTruthy()
  expect(nullify).toBeTruthy()
})

it('should output falsy', () => {
  const string = isEmpty('Hello World'),
    zero = isEmpty(0)

  expect(string).toBeFalsy()
  expect(zero).toBeFalsy()
})
