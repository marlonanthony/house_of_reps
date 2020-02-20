import isEmpty from './is-empty'
import '@testing-library/jest-dom/extend-expect'

it('should output truthy', () => {
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
    zero = isEmpty(0),
    obj = isEmpty({ hello: 'world' }),
    arr = isEmpty([1, 2, 3, 4, 5])

  expect(string).toBeFalsy()
  expect(zero).toBeFalsy()
  expect(obj).toBeFalsy()
  expect(arr).toBeFalsy()
})
