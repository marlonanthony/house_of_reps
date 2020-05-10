import axios from 'axios'
import { GET_ERRORS, ADD_PROMO, GET_PROMOS, DELETE_PROMO } from './types'

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

// Delete Promo
export const deletePromo = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/promos/${id}`)
    dispatch({
      type: DELETE_PROMO,
      payload: id
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}
