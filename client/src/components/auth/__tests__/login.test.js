import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from '../../../store'
import Login from '../login/Login'

const renderComponent = () =>
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  )

afterEach(cleanup)

it('renders inputs with the proper type', () => {
  const { getByPlaceholderText } = renderComponent()

  const password = getByPlaceholderText(/password/i),
    email = getByPlaceholderText(/email address/i)
  expect(password).toHaveAttribute('type', 'password')
  expect(email).toHaveAttribute('type', 'email')
})
