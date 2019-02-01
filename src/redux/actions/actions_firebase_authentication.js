import axios from 'axios';

export const firebaseAuthenticationAddUser = (email) => async dispatch => {
  const data = { email: email }
  await axios.post('http://localhost:8000/api/authentication/users/add', data)
}
