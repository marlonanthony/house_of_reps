import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from '../../../store'
import Login from '../Login'

afterEach(cleanup)

it('ensures the login inputs work', async () => {
  const { getByPlaceholderText } = render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  )
  const password = getByPlaceholderText(/password/i),
    email = getByPlaceholderText(/email address/i)
  expect(password).toHaveAttribute('type', 'password')
  expect(email).toHaveAttribute('type', 'email')
})
