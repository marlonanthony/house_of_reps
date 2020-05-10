import axios from 'axios'
import { GET_ERRORS, ADD_PROMO, GET_PROMOS } from './types'

// Add Promo
export const addPromo = (promoData, history) => async dispatch => {
  try {
    const res = await axios.post('/api/promos', promoData)
    dispatch({
      type: ADD_PROMO,
      payload: res.data
    })
    history.push('/dashboard')
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Get Promos
export const getPromos = () => async dispatch => {
  try {
    const res = await axios.get('/api/promos')
    dispatch({
      type: GET_PROMOS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}
