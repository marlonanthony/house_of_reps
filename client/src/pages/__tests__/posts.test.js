import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from '../../store'
import Posts from '../posts/Posts'

afterEach(cleanup)

it('renders the users input to the post form', () => {
  const { getByPlaceholderText } = render(
    <Provider store={store}>
      <Router>
        <Posts />
      </Router>
    </Provider>
  )
  const input = getByPlaceholderText(/what's the discussion/i)
  expect(input).toHaveTextContent('')
  fireEvent.change(input, { target: { value: 'Hello World!' } })
  expect(input).toHaveTextContent(/hello world!/i)
})
