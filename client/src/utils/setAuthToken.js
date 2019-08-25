import axios from 'axios' 

const setAuthToken = token => {
  if(token) {
    axios.defaults.headers.common['Authorization'] = token  // Apply to every request
  } else {
    delete axios.defaults.headers.common['Authorization']   // Delete auth header
  }
}

export default setAuthToken